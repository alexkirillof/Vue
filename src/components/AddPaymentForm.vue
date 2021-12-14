<template>
  <div :class="$style.wrap">
   <div :class="$style.addpayform">
      <input type="date" placeholder="Date" v-model="date" :class="$style.input">
        <select name="" id=""
        v-model="category"
        :class="$style.input"
        >
        <option :value="categoryPlaceholder"
        disabled selected>
        {{categoryPlaceholder}}</option>
          <option
          v-for="category of categoryList"
          :key="category"
          :value="category"
          >{{category}}</option>
        </select>
      <input type="number" :placeholder="valuePlaceholder" v-model.number="amount" :class="$style.input">
      <button @click="addPayment" :class="$style.showbtn">Add  +</button>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex';
export default {
  name: 'AddPaymentForm',
  data() {
    return {
      category: '',
      amount: '',
      date: '',
    };
  },
  computed: {
    ...mapState(['categoryList']),
    ...mapGetters(['pageCount', 'getPageByNumber']),
    currentDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
  methods: {
    ...mapMutations(['addPageData', 'addPage', 'setCurrentPageNumber']),
    ...mapActions(['fetchData', 'fetchPageCount']),
    addPayment() {
      const {
        getPageByNumber,
        addPage,
        addPageData,
        fetchData,
        fetchPageCount,
      } = this;
      fetchPageCount()
        .then((lastPageNumber) => fetchData(lastPageNumber))
        .then(() => {
          const {
            pageCount,
            category,
            amount,
            date,
            currentDate,
          } = this;
          const lastPage = getPageByNumber(pageCount);
          const dataLength = lastPage.data.length;
          const lastItemId = lastPage.data[dataLength - 1].id;
          const data = {
            id: lastItemId + 1,
            category,
            amount: Number(amount),
            date: date || currentDate,
          };
          if (dataLength < 5) {
            addPageData({ number: pageCount, data });
          } else {
            addPage({ number: pageCount + 1, data: [data] });
          }
          return this.$router.push(
            {
              name: 'addPayment',
              params: { page: this.pageCount, category },
              query: { value: amount },
            },
          ).catch(() => {});
        });
    },
  },
  mounted() {
    const { $route: { name, params: { category }, query: { value } } } = this;
    if (name === 'addPayment') {
      if (category) {
        this.category = category;
      }
      if (value) {
        this.amount = value;
      }
      this.date = this.currentDate;
      if (category && value) {
        this.addPayment();
      }
    }
  },
};
</script>

<style module lang="scss">
.addpayform {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.input {
  padding: 0.5em 1em;
  font-size: 1.25rem;
  color: #2c3e50;
  border: 1px solid #c2c2c2;
  border-radius: 0.5em;
  background-color: #fff;
  &:focus {
    border: 1px solid #2aa694;
    outline: 1px solid #2aa694;
  }
}
.button {
  align-self: flex-end;
  max-width: 150px;
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