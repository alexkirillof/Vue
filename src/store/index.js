import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: []
  },
  mutations: {
    SET_PAYMENT_LIST (state, paymentsList) {
      state.paymentsList = paymentsList
    },
    ADD_PAYMENT_DATA (state, payment) {
      state.paymentsList.push(payment)
    },
    SET_CATEGORY_LIST (state, categoryList) {
      state.categoryList = categoryList
    }
  },
  getters: {
    paymentsList: ({ paymentsList }) => paymentsList,
    categoryList: ({ categoryList }) => categoryList
  },
  actions: {
    fetchData ({ commit }) {
      setTimeout(() => {
        const initialPaymentList = [{
          id: 1,
          date: '2019-08-03',
          category: 'Food',
          value: 185
        },
        {
          id: 2,
          date: '2020-11-15',
          category: 'Transport',
          value: 15
        },
        {
          id: 3,
          date: '2021-08-02',
          category: 'Food',
          value: 211
        }
        ]
        commit('SET_PAYMENT_LIST', initialPaymentList)
      })
    },
    fetchCategoryListData ({ commit }) {
      setTimeout(() => {
        const categoryList = ['Food', 'Taxi', 'Education', 'Sport']
        commit('SET_CATEGORY_LIST', categoryList)
      })
    }
  }
})
