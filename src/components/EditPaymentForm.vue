<template>
<div>
  <form :class="$style.form">
    <select :class="$style.input" v-model="category">
      <option v-for="category in categoryList" :value="category" :key="category">
        {{ category }}
      </option>
    </select>
    <input :class="$style.input" type="text" placeholder="Payment amount" v-model.number="amount" />
    <input :class="$style.input" type="text" placeholder="Payment date" v-model="date" />
    <button :class="$style.buttonOk" @click="editPayment">Ok</button>
    <button :class="$style.buttonCancel" @click="close">Cancel</button>
  </form>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'EditPaymentForm',
  components: {
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      category: '',
      amount: null,
      date: '',
    };
  },
  computed: {
    ...mapState(['categoryList', 'currentPageNumber']),
    ...mapGetters(['currentPageData']),
    editablePayment() {
      const { currentPageData, id } = this;
      return currentPageData.find((item) => item.id === id);
    },
    currentDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
  methods: {
    ...mapMutations(['editPageData']),
    initField() {
      const { editablePayment: { category, amount, date } } = this;
      this.category = category;
      this.amount = amount;
      this.date = date;
    },
    close() {
      this.$modal.hide();
    },
    editPayment() {
      const {
        currentPageNumber,
        id,
        category,
        amount,
        date,
        currentDate,
        editPageData,
        close,
      } = this;
      const payload = {
        page: currentPageNumber,
        data: {
          id,
          category,
          amount: Number(amount),
          date: date || currentDate,
        },
      };
      editPageData(payload);
      close();
    },
  },
  created() {
    this.initField();
  },
};
</script>

<style module lang="scss">
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}
.input {
  grid-column: 1/3;
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
.buttonOk {
  grid-column: 1/2;
}
.buttonCancel {
  grid-column: 2/3;
}
</style>
