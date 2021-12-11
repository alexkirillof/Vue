<template>
  <div :class="$style.content">
    <custom-button :class="$style.button" @click="changeFormVisibility" add>
      Add new costs
    </custom-button>
    <div :class="$style.formWrapper" v-if="isFormVisible">
     <add-payment-form v-if="isAddPaymentVisible" />
      <custom-button v-if="isAddPaymentVisible" @click="switchForm">
        Add category
      </custom-button>
      <add-category-form v-if="isAddCategoryVisible" @close="switchForm" />
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
import AddPaymentForm from '../components/AddPaymentForm.vue';
import AddCategoryForm from '../components/AddCategoryForm.vue';
export default {
  name: 'App',
  data() {
    return {
      isFormVisible: false,
      isAddPaymentVisible: true,
      isAddCategoryVisible: false,
    };
  },
  computed: {
    ...mapState(['currentPageNumber']),
    ...mapGetters(['pageCount', 'currentPageData']),
  },
  components: {
    AddPaymentForm,
    PaymentsList,
    AddCategoryForm,
  },
  methods: {
    ...mapMutations(['setCurrentPageNumber', 'addPage', 'initPages']),
    ...mapActions(['fetchPageCount', 'fetchData', 'fetchCategory']),
    changeFormVisibility() {
      this.isFormVisible = !this.isFormVisible;
    },
    switchForm() {
      this.isAddPaymentVisible = !this.isAddPaymentVisible;
      this.isAddCategoryVisible = !this.isAddCategoryVisible;
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
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: auto;
  gap: 40px;
}
.formWrapper {
  grid-column: 1;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}
.list {
  grid-column: 1;
}
.button {
  min-width: 230px;
  justify-self: flex-start;
  grid-column: 1;
}
</style>
