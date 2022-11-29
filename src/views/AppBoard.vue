<template>
  <v-container>
    <board-navigator @clearPage="clearPage"/>
    <board-search/>
    <board-list/>
    <board-pagination ref="apiRequest"/>
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
      this.$refs.apiRequest._clear();
    },
  }
}
</script>

<style scoped>

</style>