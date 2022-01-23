<template>
  <div id="app" :class="$style.wrapper">
    <header :class="$style.header">
      <div :class="$style.container">
        <nav>
          <ul :class="$style.menu">
            <li>
              <router-link :class="$style.menuButton"
                           :to="{ name: 'dashboardPage', params: { page: 1 } }"
              >
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link :class="$style.menuButton" :to="{ name: 'about' }">About</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <div :class="$style.content">
      <div :class="$style.container">
         <router-view />
      </div>
    </div>
    <footer :class="$style.footer">
      <div :class="$style.container">
      </div>
    </footer>
    <transition name="fade">
      <modal-window v-if="showModal" :settings="settings"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Layouts',
    components: {
    ModalWindow: () => import(
      /* webpackChunkName: "ModalWindow" */ '../components/ModalWindow.vue'
    ),
  },
  data() {
    return {
      showModal: false,
      settings: {},
    };
  },
  beforeMount() {
    this.$modal.EventBus.$on('show', this.modalOpen);
    this.$modal.EventBus.$on('hide', this.modalClose);
  },
  methods: {
    modalOpen(settings) {
      this.settings = settings;
      this.showModal = true;
    },
    modalClose() {
      this.settings = {};
      this.showModal = false;
    },
  },
};
</script>

<style module lang="scss">
.wrapper {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
}
.header {
  flex: 0 0 auto;
  background-color: #377D73 ;
  margin-bottom: 50px;
}
.content {
  flex: 1 1 auto;
}
.footer {
  flex: 0 0 auto;
  min-height: 56px;
  background-color: #377D73 ;
}
.container {
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}
.menu {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.menuButton {
  display: block;
  padding: 5px 15px;
  font-size: 24px;
  line-height: 1.2;
  color: #fff;
  text-decoration: none;
  &:hover {
    background-color: #0e6c5f;
  }
}
</style>

