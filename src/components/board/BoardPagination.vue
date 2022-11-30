<template>
  <div class="text-center">
    <v-pagination
        v-model="prev_page"
        :length="getMaxPageObserver"
        :total-visible="10"
        @input="_onChagned"
    ></v-pagination>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: 'BoardPagination',

  data() {
    return {}
  },
  methods: {
    ...mapActions("boardStore", ["getBoardPages", "getBoardList"]),
    ...mapMutations("boardStore", ["SET_PREV_PAGE"]),

    // TODO: range 개수 template 에서도 있음.
    _onChagned() {
      console.log("호출 리스트");
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
    ...mapGetters("boardStore", ["getMaxPageObserver", "getBoardKindUidObserver", "getBoardKindUidObserver"]),

    prev_page: {
      set(value) {
        this.SET_PREV_PAGE(value);
      },
      get() {
        return this.$store.state.boardStore.prev_page;
      },
    }
  },

  created() {

  },
};
</script>

<style lang="scss" scoped>

</style>