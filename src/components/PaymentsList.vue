<template>
  <div>
    <v-data-table :headers="headers" :items="items" hide-default-footer>
      <template v-slot:[`item.actions`]="{ item }">
        <modal-menu :id="item.id" />
      </template>
    </v-data-table>
    <v-pagination
      color="teal"
      v-if="showPagination"
      v-model="page"
      :length="pageCount"
      :total-visible="7"
      @input="setPage"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import ModalMenu from './ModalMenu.vue';
export default {
  name: 'PaymentsList',
  components: {
    ModalMenu,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      validator(items) {
        return items.every((item) => {
          if ('id' in item && 'date' in item && 'category' in item && 'amount' in item) {
            const idValid = typeof item.id === 'number';
            const dateValid = typeof item.date === 'string';
            const categoryValid = typeof item.category === 'string';
            const amountValid = typeof item.amount === 'number';
            return idValid && dateValid && categoryValid && amountValid;
          }
          return false;
        });
      },
    },
  },
  data() {
    return {
      headers: [
        {
          text: '#',
          value: 'id',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Category',
          value: 'category',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Date',
          value: 'date',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Amount',
          value: 'amount',
          align: 'center',
          sortable: false,
        },
        {
          text: ' ',
          value: 'actions',
          sortable: false,
          width: '50px',
        },
      ],
    };
  },
  computed: {
    ...mapState(['currentPageNumber', 'pageCount']),
    page: {
      get() {
        return this.currentPageNumber;
      },
      set(newPageNumber) {
        this.setCurrentPageNumber(newPageNumber);
      },
    },
    showPagination() {
      return this.pageCount > 1;
    },
  },
  methods: {
    ...mapActions(['deletePageData']),
    ...mapMutations(['setCurrentPageNumber']),
    setPage(number) {
      this.$router.push({ name: 'dashboard', params: { page: number } })
        .catch(() => {});
    },
    deleteItem(id) {
      this.deletePageData(id);
    },
  },
};
</script>