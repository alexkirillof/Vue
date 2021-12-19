<template>
  <div>
    <div>
      <table :class="$style.list">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Date</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.amount }}</td>
            <td :class="$style.menu">
              <modal-menu :id="item.id "
                          :show="isCurrentModalMenu(item.id)"
                          @toggle-display="setCurrentModalMenuId"
                          @delete-item="deleteItem"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <custom-pagination :class="$style.pagination" :buttonsDisplayedCount="5" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CustomPagination from './CustomPagination.vue';
import ModalMenu from './ModalMenu.vue';
export default {
  name: 'PaymentsList',
  components: {
    CustomPagination,
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
      currentModalMenuId: 0,
    };
  },
  methods: {
    ...mapActions(['deletePageData']),
    setCurrentModalMenuId(id) {
      const { isCurrentModalMenu } = this;
      if (isCurrentModalMenu(id)) {
        this.currentModalMenuId = 0;
      } else {
        this.currentModalMenuId = id;
      }
    },
    isCurrentModalMenu(id) {
      return this.currentModalMenuId === id;
    },
    deleteItem(id) {
      this.currentModalMenuId = 0;
      this.deletePageData(id);
    },
  },
};
</script>

<style module lang="scss">
.list {
  width: 100%;
  font-size: 1.25rem;
  border-collapse: collapse;
  & thead {
    color: #fff;
    background-color: #2aa694;
  }
  & tbody {
    color: #2c3e50;
    & tr {
      &:not(:last-child) {
        border-bottom: 1px solid #c2c2c2;
      }
      &:hover {
        background-color: lighten(#2aa694, 55%);
      }
    }
  }
  & th,
  td {
    padding: 0.5em;
    text-align: center;
  }
}
.menu {
  width: min-content;
}
</style>