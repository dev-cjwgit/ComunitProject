<template>
  <v-container>
    <board-navigator @clearPage="clearPage"/>
    <board-search/>
    <board-list/>
    <board-pagination ref="pagination"/>
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
    return {}
  },
  components: {
    BoardSearch,
    BoardNavigator,
    BoardList,
    BoardPagination,
  },
  methods: {
    ...mapActions("boardStore", ["getBoardList"]),
    clearPage() {
      // 자식의 메소드를 호출하여
      // 게시판이 바뀌면 페이지를 1로 바꿔줌.
      this.$refs.pagination._clear();
    },
  },

  created() {
    // TODO: range 범위
    this.getBoardList({
      board_kind_uid: 1,
      page: 1,
      range: 10,
    });
  },
}
</script>

<style scoped>

</style>