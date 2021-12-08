<template>
  <div :class="$style.wrap">
   <div :class="$style.addpayform" v-show="!showAddForm">
      <input type="date" placeholder="Date" v-model="date" :class="$style.input">
       <div :class="$style.categoryControl">
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
        <a :class="$style.addCategoryLink"
          @click="showAddForm = !showAddForm"
          >Add Category +
          </a>
          </div>
      <input type="number" :placeholder="valuePlaceholder" v-model="value" :class="$style.input">
      <div :class="$style.btn" @click="addPayment">Add</div>
      <router-link :class="$style.btn" to="/"> Close Form </router-link>
      <div :class="$style.addCategory" v-show="showAddForm">
      <input
        :class="$style.input"
        type="text"
        v-model="newCategory"
        placeholder="New Category Name"
      />
      <div :class="$style.btn" @click="addNewCategory">Add or Close</div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: 'AddPaymentForm',
  data () {
    return {
      value: '',
      category: '',
      date: '',
      categoryPlaceholder: 'please select',
      valuePlaceholder: 'Value',
      showAddForm: false,
      newCategory: ""
    }
  },
  methods: {
    addPayment () {
      const { date, category, value } = this
      const data = { date: date || this.currentDate, category, value: +value }
      if (data.category !== '' && data.value !== 0) {
        this.$emit('add-payment', data)
      }
      this.categoryPlaceholder = 'Enter category !!!'
      this.valuePlaceholder = 'Enter value !!!'
    }
  },
  computed: {
    currentDate () {
      const d = new Date()
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      let day = d.getDate()
      if (day < 10) {
        day = '0' + day
      }
      const date = year + '-' + month + '-' + day
      return date
    }
  }
}
</script>

<style lang="scss" module>
.wrap {
  max-width: 900px;
  margin: 0 auto;
}
.addpayform {
  display: flex;
  flex-direction: column;
  gap: 20px;
  clear: both;
}
.input {
  padding: 5px 10px;
  font-size: 20px;
  color: #a2b1a3;
  border-top:0;
  border-left: 0;
  border-right: 0;
  border-bottom: 2px solid #c4cfc4;
;
}
.addpaybtn{
  align-self: flex-end;
  color: #fff;
  max-width: 300px;
  font-size: 30px;
  background-color:#2aa694;
  padding: 5px 15px;
  margin-bottom: 30px;
  border: 0;
  cursor: pointer;
  &:hover {
     background-color:#a0e9c8;
  }
  .categoryControl {
  display: flex;
}
}
</style>
