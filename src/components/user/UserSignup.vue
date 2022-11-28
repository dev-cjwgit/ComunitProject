<template>

  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            Signup
          </div>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
                v-model="signup.id"
                :rules="idRules"
                :counter="20"
                label="아이디"
                required/>

            <v-text-field
                v-model="signup.pw"
                :rules="pwRules"
                :counter="30"
                label="비밀번호"
                type="password"
                required/>

            <v-text-field
                v-model="signup.checkpw"
                :rules="pwCheckRules"
                :counter="30"
                label="비밀번호 확인"
                type="password"
                required/>

            <v-text-field
                v-model="signup.email"
                :rules="emailRules"
                :counter="30"
                label="이메일"
                type="email"
                required/>

            <v-text-field
                v-model="signup.name"
                :rules="nameRules"
                :counter="30"
                label="이름"
                required/>

            <v-text-field
                v-model="signup.nickname"
                :rules="nameRules"
                :counter="30"
                label="닉네임"
                required/>
            <v-col class="text-right">
              <v-btn
                  @click="_signup"
                  color="primary">
                회원가입
              </v-btn>

            </v-col>
          </v-form>
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "UserSignup",

  data() {
    return {
      signup: {
        id: '',
        pw: '',
        checkpw: '',
        email: '',
        name: '',
        nickname: '',
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

      pwCheckRules: [
        v => v === this.signup.pw || '비밀번호가 다릅니다.',
      ],

      emailRules: [
        v => !!v || '이메일을 입력해주세요.',
        v => /.+@.+\..+/.test(v) || '이메일 형식이 아닙니다.',
      ],

      nameRules: [
        v => !!v || '빈칸을 입력해주세요',
        v => v.length <= 20 || '빈칸은 20글자 이하만 가능합니다.',
        v => v.length >= 2 || '빈칸은 2글자 이상만 가능합니다.',
      ],
    };
  },
  methods: {
    ...mapActions("userStore", ["userSignup"]),

    async _signup() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        if (await this.userSignup(this.signup) === true) {
          await this.$router.push({name: "login"});
        }
      } else {
        alert("빈칸을 채워주세요!!");
      }
    },
  },
  computed: {},
  created() {
  },

}
</script>

<style scoped>

</style>