<template>
  <v-menu bottom left v-model="isMenuOpen" >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        :ripple="false"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-dialog v-model="editDialog" max-width="500" persistent>
        <template v-slot:activator="{ on }">
          <v-list-item class="px-6" v-on="on" link>
            <v-list-item-icon class="mr-2" >
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Edit
            </v-list-item-title>
          </v-list-item>
        </template>
        <edit-payment-form :id="id" @close="closeForm"/>
      </v-dialog>
      <v-dialog v-model="confirmDialog" max-width="400" persistent>
        <template v-slot:activator="{ on }">
          <v-list-item class="px-6" v-on="on" link>
            <v-list-item-icon class="mr-2" >
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Delete
            </v-list-item-title>
          </v-list-item>
        </template>
        <confirmation-form @yes="deleteItem" @no="closeForm"/>
      </v-dialog>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EditPaymentForm from './EditPaymentForm.vue';
import ConfirmationForm from './ConfirmationForm.vue';
export default {
  name: 'ModalMenu',
  components: {
    EditPaymentForm,
    ConfirmationForm,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editDialog: false,
      confirmDialog: false,
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapState(['currentPageNumber']),
  },
  methods: {
    ...mapActions(['deletePayment']),
    deleteItem() {
      const { id, deletePayment, closeForm } = this;
      return deletePayment(id)
        .then(() => {
          closeForm();
          this.$router.push({ name: 'dashboard', params: { page: this.currentPageNumber } })
            .catch(() => {});
        });
    },
    closeForm() {
      this.confirmDialog = false;
      this.editDialog = false;
      this.isMenuOpen = false;
    },
  },
};
</script>