<template>
  <div id="app" class="wrap">
    <AddButton class="showbtn" @click="show=!show"> Add new costs  + </AddButton>
    <AddPaymentForm @add-payment="addNewPayment" v-if="show"/>
    <PaymentsDisplay :items="paymentsList"/>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import AddPaymentForm from './components/AddPaymentForm.vue'

export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPaymentForm
  },
  data () {
    return {
      show: false,
      paymentsList: []
    }
  },
  methods: {
    fetchData () {
      return [
        {
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
    },
    addNewPayment (data) {
      const payment = { id: this.paymentsList.length + 1, ...data }
      if (data) {
        this.paymentsList.push(payment)
      }
    }
  },
  created () {
    this.paymentsList = this.fetchData()
    console.log(this.fetchData())
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
