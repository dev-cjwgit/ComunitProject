<template>
  <v-container>
    <board-navigator/>
    <board-search/>
    <board-list/>
    <board-pagination/>
  </v-container>
</template>

<script>
import BoardSearch from "@/components/board/BoardSearch";
import BoardNavigator from "@/components/board/BoardNavigator";
import BoardList from "@/components/board/BoardList";
import BoardPagination from "@/components/board/BoardPagination";

export default {
  name: "AppBoard",
  components: {
    BoardSearch,
    BoardNavigator,
    BoardList,
    BoardPagination,
  },
}
</script>

<style scoped>

</style>