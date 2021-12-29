<template>
  <v-app>
    <v-app-bar app flat >
      <v-container>
        <v-btn
          :to="{ name: 'dashboard', params: { page: 1 } }"
          :ripple="false"
          plain
        >
          Dashboard
        </v-btn>
        <v-btn
          :to="{ name: 'about' }"
          :ripple="false"
          plain
        >
          About
        </v-btn>
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>