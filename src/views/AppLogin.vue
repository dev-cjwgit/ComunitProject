<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            Login
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
              v-model="user.id"
              label="ID"
              outlined
          ></v-text-field>
          <v-text-field
              v-model="user.pw"
              label="Password"
              outlined
          ></v-text-field>
          <div class="text-right">
            <v-btn
                @click="_userLogin"
                color="primary">
              Login
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "AppLogin",
  data() {
    return {
      user: {
        id: 'cjw.git',
        pw: 'ss1235789',
      },
    };
  },
  methods: {
    ...mapActions("userStore", ["userLogin"]),

    _userLogin() {
      if (this.userLogin(this.user)) {
        this.$router.push({name: "home"});
      }
    },
  },
  computed: {},
  created() {
  },
};
</script>
