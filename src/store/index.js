import Vue from 'vue';
import Vuex from 'vuex';
import data from '../static/data.json';

Vue.use(Vuex);

const state = () => ({
    paymentsList: [],
    currentPageNumber: 0,
    categoryList: [],
});

const getters = {
    pageCount: (state) => state.paymentsList.length,
    currentPageData: (state, getters) => {
        const page = getters.getPageByNumber(state.currentPageNumber);
        if (page === undefined) {
            return [];
        }
        return page.data;
    },
    getPageByNumber: (state) => (number) => {
        const isPageNumber = (page) => number === page.number;
        return state.paymentsList.find(isPageNumber);
    },
    isDataEmpty: (state, getters) => (number) => {
        const page = getters.getPageByNumber(number);
        return page.data.length === 0;
    },
    isCategoryListEmpty: (state) => state.categoryList.length === 0,
    isCurrentPage: (state) => (number) => state.currentPageNumber === number,
};

const mutations = {
    addPage(state, payload) {
        state.paymentsList.push(payload);
    },
    addPageData(state, payload) {
        const page = state.paymentsList.find((page) => payload.number === page.number);
        page.data.push(payload.data);
    },
    addCategory(state, payload) {
        state.categoryList.push(payload);
    },
    setPageData(state, payload) {
        const page = state.paymentsList.find((page) => payload.number === page.number);
        page.data = [...payload.data];
    },
    setCurrentPageNumber(state, payload) {
        state.currentPageNumber = payload;
    },
    setCategoryList(state, payload) {
        state.categoryList = [...payload];
    },
    initPages(state, payload) {
        state.paymentsList = [...Array(payload).keys()].map((i) => ({ number: i + 1, data: [] }));
    },
};

const actions = {
    fetchData({ commit, getters }, number) {
        return new Promise((resolve) => {
            if (getters.isDataEmpty(number)) {
                setTimeout(() => {
                    resolve({ number, data: [...data[`page${number}`]] });
                }, 1000);
            } else {
                resolve();
            }
        }).then((data) => {
            if (getters.isDataEmpty(number)) {
                commit('setPageData', data);
            }
        });
    },
    fetchPageCount({ getters }) {
        return new Promise((resolve) => {
            if (getters.pageCount === 0) {
                setTimeout(() => resolve(Object.keys(data).length), 1000);
            } else {
                resolve(getters.pageCount);
            }
        });
    },
    fetchCategory({ commit, getters }) {
        return new Promise((resolve) => {
            if (getters.isCategoryListEmpty) {
                setTimeout(() => resolve(['Food', 'Transport', 'Education', 'Entertainment']), 1000);
            }
        }).then((categoryList) => commit('setCategoryList', categoryList));
    },
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});