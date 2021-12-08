<template>
  <div id="app" :class="$style.wrap">
    <header></header>
    <main>
      <div :class="$style.wrap">
        <router-link :class="$style.showbtn" :to="{ name: 'addpayment' }" @click="show=!show">
          Add New Cost  +
        </router-link>
        <router-view @add-payment="addNewPayment" />
        <PaymentsDisplay :items="paymentsList" />
      </div>
    </main>
    <footer></footer>
    <!-- <AddPaymentForm @add-payment="addNewPayment" v-if="show" :categoryList="categoryList"/> -->
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsDisplay
  },
  data () {
    return {
      show: false,
      addMessage: "Add New Cost",
      currentPage: 1
    }
  },
  methods: {
    ...mapActions([
      'fetchData',
      'fetchCategoryListData'
    ]),
    ...mapMutations([
      'ADD_PAYMENT_DATA',
      'SET_CATEGORY_LIST'
    ]),
    addNewPayment (data) {
      const payment = { id: this.paymentsList.length + 1, ...data }
       if (payment.category != "" && payment.value != "") {
        this.addPayment(payment);
    }
  },
  computed: {
    ...mapGetters([
      'paymentsList',
      'categoryList'
    ])
  },
  created () {
    // this.paymentsList = this.fetchData()
    // console.log(this.fetchData())
    this.fetchData()
    this.fetchCategoryListData()
  }
}
}
</script>

<style lang="scss" module>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrap{
  max-width: 900px;
   margin: 0 auto;
   padding: 0;
}
.showbtn{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #fff;
  float: left;
  max-width: 300px;
  font-size: 20px;
  background-color:#2aa694;
  padding: 5px 15px;
  border: 0;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
     background-color:#a0e9c8;
  }
}

</style>
