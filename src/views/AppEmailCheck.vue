<template>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "AppEmailCheck",
  data() {
    return {
      token: '',
    };
  },
  methods: {
    ...mapActions("userStore", ["checkEmail"]),


  },
  computed: {},
  async created() {
    this.token = this.$route.query.token;
    await this.checkEmail(this.token)

    await this.$router.push({name: "login"});
  },
}
</script>
