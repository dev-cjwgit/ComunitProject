<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            마이페이지
          </div>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
                :error-messages="idErrMsg"
                v-model="user.id"
                :counter="20"
                label="아이디"
                disabled/>

            <v-text-field
                v-model="user.pw"
                :rules="pwRules"
                :counter="30"
                label="현재 비밀번호"
                type="password"
                required/>

            <v-text-field
                v-model="user.npw"
                :rules="pwRules"
                :counter="30"
                label="새 비밀번호"
                type="password"
                required/>

            <v-text-field
                v-model="user.ncheckpw"
                :rules="pwCheckRules"
                :counter="30"
                label="새 비밀번호 확인"
                type="password"
                required/>

            <v-text-field
                :error-messages="emailErrMsg"
                v-model="user.email"
                :counter="30"
                label="이메일"
                type="email"
                disabled/>

            <v-text-field
                v-model="user.name"
                :counter="30"
                label="이름"
                disabled/>

            <v-text-field
                v-model="user.nickname"
                :rules="nameRules"
                :counter="30"
                :error-messages="nicknameErrMsg"
                label="닉네임"
                @keyup="_checkNickname"
                required/>
            <v-col class="text-right">
              <v-btn
                  @click="_mypage"
                  color="primary">
                변경하기
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
  name: "MyPage",
  data() {
    return {
      user: {
        email: '',
        id: '',
        pw: '',
        npw: '',
        ncheckpw: '',
        name: '',
        nickname: '',
      },

      idErrMsg: '',
      emailErrMsg: '',
      nicknameErrMsg: '',


      pwRules: [
        v => !!v && v.length <= 20 || '비밀번호는 30글자 이하만 가능합니다.',
        v => !!v && v.length >= 8 || '비밀번호는 8글자 이상만 가능합니다.',
      ],

      pwCheckRules: [
        v => v === this.user.npw || '비밀번호가 다릅니다.',
      ],

      nameRules: [
        v => !!v || '빈칸을 입력해주세요',
        v => v.length <= 20 || '빈칸은 20글자 이하만 가능합니다.',
        v => v.length >= 2 || '빈칸은 2글자 이상만 가능합니다.',
        v => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || '특수문자를 사용할 수 없습니다.'
      ],
    };
  },
  methods: {
    ...mapActions("userStore", ["getMypage", "setMypage"]),
    _checkNickname() {
      if (this.signup.nickname === '')
        return false;
      this.signupRules({
        keyword: "nickname",
        word: this.signup.nickname,
      }).then(result => {
        if (result) {
          this.nicknameErrMsg = "이미 존재하는 닉네임입니다.";
        } else {
          this.nicknameErrMsg = "";
        }
      });
    },
    _mypage() {
      const valid = this.$refs.form.validate();
      if (valid && this.nicknameErrMsg === '') {
      this.setMypage({
        pw: this.user.pw,
        npw: this.user.npw,
        nickname: this.user.nickname,
      }).then((data) => {
        if (data === true) {
          alert("수정이 완료되었습니다!");
          this.$router.push({name: 'home'})
        }
      });
      } else {
        alert("입력 값을 확인하세요.");
      }
    },
  },

  created() {
    this.getMypage().then((data) => {
      this.user = data.data;
    })
  }
}
</script>

<style scoped>

</style>