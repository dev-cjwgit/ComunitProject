<template>
  <v-app>
    <AppBar></AppBar>

    <v-container class="mt-16">
      <router-view></router-view>
    </v-container>

    <Footer></Footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    AppBar: () => import("./components/layout/AppNavigator.vue"),
    Footer: () => import("./components/layout/AppFooter.vue"),
  },
  data: () => ({}),
};
</script>
