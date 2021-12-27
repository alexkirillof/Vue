import Vue from 'vue';
import Vuex from 'vuex';
import {
    PAGE,
    PAGE_COUNT,
    CATEGORY,
    PAYMENT,
    STAT,
} from '../constants/index.js';

Vue.use(Vuex);

const state = () => ({
    paymentsList: [],
    currentPageNumber: 1,
    pageCount: 1,
    itemsPerPage: 10,
    categoryList: [],
    statistics: {},
});

const getters = {
    currentPageData: (state) => {
        const page = state.paymentsList.find((page) => state.currentPageNumber === page.number);
        if (page === undefined) {
            return [];
        }
        return page.data;
    },
    isPageLoaded: (state) => (number) => {
        const index = state.paymentsList.findIndex((page) => number === page.number);
        return index >= 0;
    },
    isCurrentPage: (state) => (number) => state.currentPageNumber === number,
};

const mutations = {
    addPage(state, payload) {
        state.paymentsList.push(payload);
    },
    updatePage(state, payload) {
        const index = state.paymentsList.findIndex((item) => item.number === payload.number);
        if (index >= 0) {
            Vue.set(state.paymentsList, index, payload);
        }
    },
    deletePage(state, payload) {
        const index = state.paymentsList.findIndex((item) => item.number === payload);
        if (index >= 0) {
            state.paymentsList.splice(index, 1);
        }
    },
    setPageCount(state, payload) {
        state.pageCount = payload;
    },
    setCurrentPageNumber(state, payload) {
        const number = Number(payload);
        if (number > 0 && number <= state.pageCount) {
            state.currentPageNumber = payload;
        }
    },
    setCategoryList(state, payload) {
        state.categoryList = [...payload];
    },
    setStatistics(state, payload) {
        const labels = Object.keys(payload);
        const data = labels.map((category) => payload[category]);
        state.statistics = { labels, data };
    },
};

const actions = {
    fetchPage({ state: { itemsPerPage }, getters, commit }, pageNumber) {
        const params = {
            itemsPerPage,
            pageNumber,
        };
        const url = `${PAGE}/?${new URLSearchParams(params)}`;

        return fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((page) => {
                if (getters.isPageLoaded(page.number)) {
                    return commit('updatePage', page);
                }
                return commit('addPage', page);
            })
            .catch((err) => console.log(err));
    },
    fetchPageCount({ state: { itemsPerPage }, commit }) {
        const params = {
            itemsPerPage,
        };
        const url = `${PAGE_COUNT}/?${new URLSearchParams(params)}`;

        return fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => commit('setPageCount', data.pageCount > 0 ? data.pageCount : 1))
            .catch((err) => console.log(err));
    },
    fetchCategory({ commit }) {
        return fetch(CATEGORY, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((categoryList) => commit('setCategoryList', categoryList))
            .catch((err) => console.log(err));
    },
    fetchStatistics({ commit }) {
        return fetch(STAT, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((statistics) => commit('setStatistics', statistics))
            .catch((err) => console.log(err));
    },
    addCategory(context, data) {
        return fetch(CATEGORY, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .catch((err) => console.log(err));
    },
    addPayment({ state, commit, dispatch }, data) {
        return fetch(PAYMENT, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(({ ok }) => {
                if (!ok) {
                    return new Error('Payment was not added.');
                }
                dispatch('fetchStatistics');
                return dispatch('fetchPageCount');
            })
            .then(() => {
                commit('setCurrentPageNumber', state.pageCount);
                dispatch('fetchPage', state.pageCount);
            })
            .catch((err) => console.log(err));
    },
    editPayment({ state, dispatch }, data) {
        return fetch(PAYMENT, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(({ ok }) => {
                if (!ok) {
                    return new Error('Payment was not edit.');
                }
                dispatch('fetchStatistics');
                return dispatch('fetchPage', state.currentPageNumber);
            })
            .catch((err) => console.log(err));
    },
    deletePayment({ state, commit, dispatch }, id) {
        return fetch(PAYMENT, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })
            .then(({ ok }) => {
                if (!ok) {
                    return new Error('Payment was not delete.');
                }
                if (state.currentPageNumber < state.pageCount) {
                    commit('deletePage', state.pageCount);
                }
                dispatch('fetchStatistics');
                return dispatch('fetchPageCount');
            })
            .then(() => {
                if (state.currentPageNumber > state.pageCount) {
                    commit('deletePage', state.currentPageNumber);
                    commit('setCurrentPageNumber', state.pageCount);
                }
                dispatch('fetchPage', state.currentPageNumber);
            })
            .catch((err) => console.log(err));
    },
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});