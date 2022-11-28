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
              :rules="idRules"
              required
          ></v-text-field>
          <v-text-field
              v-model="user.pw"
              label="Password"
              :rules="pwRules"
              type="password"
              required
          ></v-text-field>
          <v-row justify="space-between" class="pa-4">
            <v-btn
                @click="_signup"
                color="primary">
              Signup
            </v-btn>

            <v-btn
                @click="_userLogin"
                color="primary">
              Login
            </v-btn>
          </v-row>
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
        // TODO: 나중에 삭제
        id: 'cjwgit',
        pw: 'ss1235789',
      },

      idRules: [
        v => !!v || '아이디를 입력해주세요.',
        v => v.length <= 20 || '아이디는 20글자 이하만 가능합니다.',
        v => v.length >= 6 || '아이디는 6글자 이상이여야합니다.',
      ],

      pwRules: [
        v => v.length <= 20 || '비밀번호는 30글자 이하만 가능합니다.',
        v => v.length >= 8 || '비밀번호는 8글자 이상만 가능합니다.',
      ],
    };
  },
  methods: {
    ...mapActions("userStore", ["userLogin"]),

    async _userLogin() {
      if (await this.userLogin(this.user) === true) {
        await this.$router.push({name: "home"});
      }
    },

    _signup() {
      this.$router.push({name: "signup"});
    }
  },
  computed: {},
  created() {
  },
};
</script>
