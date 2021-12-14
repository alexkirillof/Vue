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
  </div>
</template>

<script>
export default {
  name: 'Layouts',
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
  margin-bottom: 4rem;
  background-color: #377D73 ;
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
  padding: 0.8em;
  font-size: 1.25rem;
  line-height: 1.2;
  color: #fff;
  text-decoration: none;
  &:hover {
    background-color: #0e6c5f;
  }
}
</style>

