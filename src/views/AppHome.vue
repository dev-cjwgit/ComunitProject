<template>
  <div>
    <button @click="_onClick">Btn</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    ...mapActions("userStore", ["testFunc"]),
    _onClick() {
      this.testFunc();
    },

  },
  computed: {},
  created() {
  },
};
</script>
