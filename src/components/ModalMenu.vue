<template>
  <div :class="$style.wrapper">
    <button :class="$style.button" @click="togglePopUpMenuDisplay">
      <svg :class="$style.icon"
           xmlns="http://www.w3.org/2000/svg"
           width="1.2em"
           viewBox="0 0 16 16"
           fill="currentColor"
      >
        <path fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.444 13.832a1 1 0 1 0 1.111-1.663 1 1 0 0 0-1.11 1.662zM8
              9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </svg>
    </button>
    <transition name="fade">
      <ul :class="$style.menu" v-if="show">
        <li :class="$style.item" @click="showForm">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="1em"
               viewBox="0 0 512.019 512.019"
               fill="currentColor"
          >
            <path d="M350.316 80.852L0 431.166v80.843h80.841l350.316-350.316zm26.965-26.945
              L431.174.013l80.841 80.841-53.894 53.894z"
            />
          </svg>
          Редактировать
        </li>
        <li :class="$style.item" @click="deleteItem">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="1em"
               viewBox="0 0 512 512"
               fill="currentColor"
          >
            <path d="M345.397 81.27V0H166.603v81.27H28.444v48.762h48.762V512h357.587V130.032
              h48.762V81.27H345.397zM215.365 446.984h-48.762V154.413h48.762v292.571zm0-398.222
              h81.27V81.27h-81.27V48.762zm130.032 398.222h-48.762V154.413h48.762v292.571z"
            />
          </svg>
          Удалить
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ModalMenu',
  props: {
    id: {
      type: Number,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    deleteItem() {
      this.togglePopUpMenuDisplay();
      this.$emit('delete-item', this.id);
    },
    togglePopUpMenuDisplay() {
      this.$emit('toggle-display', this.id);
    },
    showForm() {
      const settings = {
        name: 'EditPaymentForm',
        id: this.id,
      };
      this.togglePopUpMenuDisplay();
      this.$modal.show(settings);
    },
  },
};
</script>

<style module lang="scss">
.wrapper {
  position: relative;
  display: inline-block;
  width: min-content;
}
.button {
  display: block;
  padding: 0;
  font-size: 1.25rem;
  color: #2c3e50;
  border: none;
  background-color: transparent;
  transition: color 0.2s;
  &:hover {
    color: #2aa694;
    cursor: pointer;
  }
  &:active {
    color: #2c3e50;
  }
}
.icon {
  display: block;
}
.menu {
  position: absolute;
  top: calc(100% + 0.7em);
  right: -0.8em;
  z-index: 1;
  margin: 0;
  padding: 0.5em 0;
  font-size: 1.25rem;
  line-height: 1.2;
  list-style: none;
  border: 1px solid #c2c2c2;
  border-radius: 0.5em;
  background-color: #fff;
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.2);
  &::before {
    content: "";
    position: absolute;
    top: -0.6em;
    right: 1em;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.4em 0.6em 0.4em;
    border-color: transparent transparent #c2c2c2 transparent;
  }
  &::after {
    content: "";
    position: absolute;
    top: -0.5em;
    right: 1em;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.4em 0.6em 0.4em;
    border-color: transparent transparent #fff transparent;
  }
}
.item {
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 0.5em 1em;
  transition: color 0.2s;
  &:hover {
    color: #2aa694;
    cursor: pointer;
  }
  &:active {
    color: #2c3e50;
  }
}
</style>
