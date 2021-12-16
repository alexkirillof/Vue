<template>
  <form :class="$style.form">
    <input :class="$style.input" type="text" placeholder="Payment category" v-model="category" />
    <button :class="$style.addpaybtn" @click="add" type="button"> Add +</button>
    <button :class="$style.addpaybtn" @click="$emit('close')" type="button">Close </button>
  </form>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'AddCategoryForm',
  data() {
    return {
      category: '',
    };
  },
  computed: {
    ...mapState(['categoryList']),
  },
  methods: {
    ...mapMutations(['addCategory']),
    add() {
      const { category, categoryList, addCategory } = this;
      const contains = categoryList.some((item) => item === category);
      if (category && !contains) {
        addCategory(category);
      }
    },
  },
  components: {
  },
};
</script>

<style module lang="scss">
.form {
  display: flex;
  gap: 350px;
  width: 100%;
}
.input {
  grid-column: 1/3;
  padding: 5px 10px;
  font-size: 24px;
  color: #2c3e50;
  border: 1px solid #c2c2c2;
  background-color: #fff;
  &:focus {
    border: 1px solid #2aa694;
    outline: 1px solid #2aa694;
  }
}
.addpaybtn{
  align-self: flex-end;
  color: #fff;
  max-width: 400px;
  font-size: 20px;
  background-color:#2aa694;
  padding: 5px 3px;
  margin-bottom: 30px;
  border: 0;
  cursor: pointer;
  &:hover {
     background-color:#a0e9c8;
  }
}
</style>