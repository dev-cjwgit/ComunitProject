<template>
  <div class="text-center">
    <v-pagination
        v-model="prev_page"
        :length="getMaxPageObserver"
        :total-visible="10"
        @input="onChagned"
    ></v-pagination>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'BoardPagination',

  data() {
    return {
      prev_page: 1,
    }
  },
  methods: {
    ...mapActions("boardStore", ["getBoardPages", "getBoardList"]),
    _clear() {
      this.prev_page = 1;
    },

    // TODO: range 개수 template 에서도 있음.
    onChagned() {
      let params = {
        board_kind_uid: this.getBoardKindUidObserver,
        page: this.prev_page,
        range: 10,
      };
      console.log(params);
      this.getBoardList(params);
    }
  },
  computed: {
    ...mapGetters("boardStore", ["getMaxPageObserver", "getBoardKindUidObserver"]),
  },

  created() {

  },
};
</script>

<style lang="scss" scoped>

</style>