<template>
  <div id="app" class="wrap">
    <AddButton class="showbtn" @click="show=!show"> Add new costs  + </AddButton>
    <AddPaymentForm
    @add-payment="addNewPayment"
    v-if="show"
    :categoryList="categoryList"
    />
    <PaymentsDisplay :items="paymentsList"/>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import AddPaymentForm from './components/AddPaymentForm.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPaymentForm
  },
  data () {
    return {
      show: false
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
      if (data) {
        this.ADD_PAYMENT_DATA(payment)
      }
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
</script>

<style lang="scss">
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
