<template>
  <div :class="$style.content">
    <button :class="$style.showbtn" @click="show=!show"  type="button">
      Add new costs  + 
    </button>
    <div :class="$style.formWrapper" v-if="show">
     <part-add-payment-form v-if="showpay" />
      <button v-if="showpay" @click="toggleForm" type="button" :class="[$style.showbtn, $style.top]">
        Add category
      </button>
      <add-category-form v-if="showcat" @close="toggleForm" />
    </div>
    <payments-list :class="$style.list" :items="currentPageData" />
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex';
import PaymentsList from '../components/PaymentsList.vue';
import PartAddPaymentForm from '../components/PartAddPaymentForm.vue';
import AddCategoryForm from '../components/AddCategoryForm.vue';
export default {
  name: 'App',
  data() {
    return {
      showpay: true,
      showcat: false,
      show: false
    };
  },
  computed: {
    ...mapState(['currentPageNumber']),
    ...mapGetters(['pageCount', 'currentPageData']),
  },
  components: {
    PartAddPaymentForm,
    PaymentsList,
    AddCategoryForm,
  },
  methods: {
    ...mapMutations(['setCurrentPageNumber', 'addPage', 'initPages']),
    ...mapActions(['fetchPageCount', 'fetchData', 'fetchCategory']),
     toggleForm() {
       this.showpay = !this.showpay;
       this.showcat = !this.showcat;
     },
  },
  created() {
    this.fetchPageCount()
      .then((result) => {
        const { pageCount, initPages } = this;
        if (pageCount === 0) {
          initPages(result);
        }
      })
      .then(() => {
        const { pageCount, currentPageNumber, fetchData } = this;
        if (currentPageNumber > 0 && pageCount >= currentPageNumber) {
          fetchData(currentPageNumber);
        } else {
          this.$router.push({ name: 'dashboardPage', params: { page: 1 } });
        }
      });
    this.fetchCategory();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const { setCurrentPageNumber, changeFormVisibility } = vm;
      const { params: { page }, name } = to;
      if (!Number.isNaN(page) && Number(page) > 0) {
        setCurrentPageNumber(Number(page));
      }
      if (name === 'addPayment') {
        changeFormVisibility();
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const { fetchData, setCurrentPageNumber } = this;
    const { params: { page } } = to;
    fetchData(Number(page));
    setCurrentPageNumber(Number(page));
    next();
  },
};
</script>

<style module lang="scss">
.content {
  display: flex;
  flex-direction: column;
}
.formWrapper {
  display: flex;
  max-width: 500px;

}

.showbtn{
  color: #fff;
  float: left;
  max-width: 314px;
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
.top{
  margin-left: 30px;
  margin-top: 64px;
  width: 300px;
  height: 41px;
}

</style>
