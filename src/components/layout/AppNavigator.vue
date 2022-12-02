<template>
  <div>
    <v-navigation-drawer
        v-if="!$vuetify.breakpoint.smAndUp"
        v-model="drawer"
        :clipped="$vuetify.breakpoint.smAndUp"
        app
        color="primary"
        dark
    >
      <v-list color="primary" nav>
        <v-list-item v-if="!getisLoginObserver" :to="{name: 'login'}">
          Login
        </v-list-item>
        <div v-else>
          <v-list-item :to="{name:'mypage'}">mypage</v-list-item>

          <v-list-item @click="_logout">
            Logout
          </v-list-item>
        </div>
        <v-list-item
            v-for="(item, i) in barItems"
            :key="i"
            :target="item.target"
            :to="item.to"
            link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        :clipped-left="$vuetify.breakpoint.smAndUp"
        app
        color="white"
        elevate-on-scroll
        flat
    >
      <v-container :class="{ 'px-0': !$vuetify.breakpoint.smAndUp }">
        <v-row
            :no-gutters="!$vuetify.breakpoint.smAndUp"
            align="center"
            justify="space-between"
        >
          <v-col class="d-flex align-center">
            <v-app-bar-nav-icon
                v-if="!$vuetify.breakpoint.smAndUp"
                @click.stop="drawer = !drawer"
            />
            <v-toolbar-title
                class="font-weight-bold text-h5 primary--text"
                style="cursor: pointer"
                @click="$router.push('/')"
            >
              <v-icon color="primary">mdi-feather</v-icon>
              <span class="accent--text">C</span>
              omunit
            </v-toolbar-title>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.smAndUp" class="text-center" cols="6">
            <v-btn
                v-for="(item, i) in barItems"
                :key="i"
                :to="item.to"
                class="text-capitalize"
                exact
                exact-active-class="accent--text"
                text
            >{{ item.title }}
            </v-btn>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.smAndUp" class="text-right">
            <v-btn v-if="!getisLoginObserver"
                   color="primary" target="_black" :to="{name: 'login'}" class="ml-3 text-capitalize">
              Login
            </v-btn>
            <div v-else>
              <router-link :to="{name:'mypage'}">{{ getUserNameObserver }}</router-link>
              님
              <v-btn
                  color="primary" target="_black" @click="_logout" class="ml-3 text-capitalize">
                Logout
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data: () => ({
    drawer: null,

    barItems: [
      {
        title: "Home",
        to: "/",
      },
      {
        title: "Board",
        to: "/board",
      },

    ],
  }),
  methods: {
    ...mapActions("userStore", ["userLogout"]),
    _logout() {
      this.userLogout();
      this.$router.push({name: "home"});
    }
  },
  computed: {
    ...mapGetters("userStore", ["getisLoginObserver", "getUserNameObserver"]),
  },
  created() {
  },

};
</script>
