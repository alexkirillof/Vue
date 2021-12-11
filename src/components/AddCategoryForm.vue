<template>
  <form :class="$style.form">
    <input :class="$style.input" type="text" placeholder="Payment category" v-model="category" />
    <custom-button :class="$style.closeButton" @click="add" add> Add </custom-button>
    <custom-button :class="$style.addButton" @click="$emit('close')">Close </custom-button>
  </form>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import CustomButton from './CustomButton.vue';
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
    CustomButton,
  },
};
</script>

<style module lang="scss">
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  width: 100%;
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
.closeButton {
  grid-column: 1/2;
  grid-row: 2;
}
.addButton {
  grid-column: 2/3;
  grid-row: 2;
}
</style>