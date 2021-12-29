<template>
<v-card class="text-left pa-6">
  <v-card-title>
    <span class="text-h5">Add category</span>
  </v-card-title>
  <v-card-text>
    <v-text-field color="teal" v-model="category" label="Category" />
  </v-card-text>
  <v-card-actions>
    <v-btn color="teal" text @click="add">Add</v-btn>
    <v-spacer />
    <v-btn color="teal" text @click="close">Close</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
    ...mapActions(['addCategory', 'fetchCategory']),
    add() {
      const {
        category,
        categoryList,
        addCategory,
        fetchCategory,
      } = this;
      const contains = categoryList.some((item) => item === category);
      if (category && !contains) {
        addCategory({ category })
          .then(({ ok }) => {
            if (!ok) {
              return new Error('Category was not added.');
            }
            return fetchCategory();
          })
          .then(() => this.close());
      }
    },
    close() {
      this.category = '';
      this.$emit('close');
    },
  },
};
</script>