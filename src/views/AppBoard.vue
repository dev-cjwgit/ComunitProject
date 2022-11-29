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
    clearPage() {
      // 자식의 메소드를 호출하여
      // 게시판이 바뀌면 페이지를 1로 바꿔줌.
      this.$refs.pagination._clear();
    },
  }
}
</script>

<style scoped>

</style>