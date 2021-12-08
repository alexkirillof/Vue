import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const pages = {
    "page1": [
        { "id": 1, "date": "01.01.2021", "category": "Pubs", "value": 2500 },
        { "id": 2, "date": "03.01.2021", "category": "Food", "value": 1245 },
        { "id": 3, "date": "04.01.2021", "category": "Taxi", "value": 450 }
    ],
    "page2": [
        { "id": 4, "date": "12.02.2021", "category": "Sport", "value": 1322 },
        { "id": 5, "date": "15.02.2021", "category": "Travaler", "value": 50450 },
        { "id": 6, "date": "17.02.2021", "category": "Education", "value": 44200 }
    ],
}

export default new Vuex.Store({
    state: {
        paymentsList: {},
        categoryList: [],
        pageCount: 1
    },
    mutations: {
        SET_PAYMENT_LIST(state, paymentsList) {
            Vue.set(state.paymentsList, paymentsList["key"], paymentsList["list"]);
        },
        ADD_PAYMENT_DATA(state, payment) {
            if (pages['page' + state.pageCount].length < 3) {
                pages['page' + state.pageCount].push(payment);
            } else {
                pages['page' + (state.pageCount + 1)] = [payment];
            }
        },
        SET_CATEGORY_LIST(state, categoryList) {
            state.categoryList = categoryList
        },
        SET_PAGES_COUNT(state, count) {
            state.pageCount = count;
        }
    },
    getters: {
        paymentsList: ({ paymentsList }) => paymentsList,
        categoryList: ({ categoryList }) => categoryList,
        paymentPages: ({ pageCount }) => pageCount
    },
    actions: {
        fetchData(state, page) {
            const key = 'page' + page;
            if (!(key in state.getters.paymentsList)) {
                setTimeout(() => {
                    const initialPaymentsList = pages[key];
                    state.commit('SET_PAYMENTS_LIST', { "key": key, "list": initialPaymentsList });
                });
            }
        },
        fetchCategoryListData({ commit }) {
            setTimeout(() => {
                const categoryList = ['Food', 'Taxi', 'Education', 'Sport', 'Pubs', 'Travaler']
                commit('SET_CATEGORY_LIST', categoryList)
            })
        },
        fetchPages({ commit }) {
            setTimeout(() => {
                const pageCount = Object.keys(pages).length;
                commit('SET_PAGES_COUNT', pageCount);
            });
        }
    },
})