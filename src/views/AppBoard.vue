<template>
  <v-container>
    <board-navigator/>
    <router-view/>
  </v-container>
</template>

<script>
import BoardSearch from "@/components/board/BoardSearch";
import BoardNavigator from "@/components/board/BoardNavigator";
import BoardList from "@/components/board/BoardList";
import BoardPagination from "@/components/board/BoardPagination";
import {mapActions} from "vuex";

export default {
  name: "AppBoard",
  data() {
    return {
      board_kind_uid: 0,
    }
  },
  components: {
    BoardSearch,
    BoardNavigator,
    BoardList,
    BoardPagination,
  },
  methods: {
    ...mapActions("boardStore", ["getBoardList"]),
  },

  created() {
    this.board_kind_uid = this.$route.params.board_kind_uid;
    if (this.board_kind_uid === undefined)
      this.board_kind_uid = 1;

    // TODO: range 범위
    this.getBoardList({
      board_kind_uid: this.board_kind_uid,
      page: 1,
      range: 10,
    });
  },
}
</script>

<style scoped>

</style>