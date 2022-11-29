<template>
  <v-container>
    <board-navigator/>
    <board-search/>
    <board-list/>
  </v-container>
</template>

<script>
import BoardSearch from "@/components/board/BoardSearch";
import BoardNavigator from "@/components/board/BoardNavigator";
import BoardList from "@/components/board/BoardList";

export default {
  name: "AppBoard",
  components: {
    BoardSearch,
    BoardNavigator,
    BoardList,
  },
}
</script>

<style scoped>

</style>