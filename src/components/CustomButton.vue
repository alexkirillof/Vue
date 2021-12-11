<template>
  <button :class="$style.main" type="button" @click="$emit('click')">
    <div :class="$style.text">
      <slot></slot>
    </div>
    <svg
      :class="$style.icon"
      width="0.75em"
      hight="0.75em"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      v-if="add"
    >
      <polygon points="15 7 9 7 9 1 7 1 7 7 1 7 1 9 7 9 7 15 9 15 9 9 15 9" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    add: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module lang="scss">
.main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5em;
  font-size: 1.25rem;
  line-height: 1.2;
  color: white;
  border: 0.125em solid #2aa694;
  border-radius: 0.5em;
  background-color: #2aa694;
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    cursor: pointer;
    color: #2aa694;
    background-color: #fff;
    & .icon {
      fill: #2aa694;
    }
  }
  &:active {
    box-shadow: 0 0.075em 0.125em rgba(0, 0, 0, 0.2);
    transform: translateY(2px);
  }
}
.icon {
  margin-left: 0.5em;
  fill: #fff;
  transition: fill 0.2s;
}
.text {
  flex: 1 1 auto;
  text-align: center;
  text-transform: uppercase;
}
</style>