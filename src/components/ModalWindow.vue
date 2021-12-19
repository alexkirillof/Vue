<template>
<div :class="$style.wrapper">
  <div :class="$style.content">
    <close-button :class="$style.button" @close="close()" />
    <component :is="settings.name" :id="settings.id"/>
  </div>
</div>
</template>

<script >
import CloseButton from './CloseButton.vue';
export default {
  name: 'ModalWindow',
  components: {
    CloseButton,
    PartAddPaymentForm: () => import(/* webpackChunkName: "PartAddPaymentForm" */ './PartAddPaymentForm.vue'),
    EditPaymentForm: () => import(
      /* webpackChunkName: "EditPaymentForm" */ './EditPaymentForm.vue'
    ),
  },
  props: {
    settings: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    close() {
      const { $route: { params: { page } } } = this;
      this.$modal.hide();
      this.$router.push({ name: 'dashboardPage', params: { page } })
        .catch(() => {});
    },
  },
};
</script>

<style module lang="scss">
@use "sass:math";
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}
.content {
  position: relative;
  min-width: math.div(100%, 5);
  padding: 56px;
  font-size: 1.25rem;
  color: #2c3e50;
  border-radius: 0.5em;
  background-color: #fff;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
}
.button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

