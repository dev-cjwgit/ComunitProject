<template>
  <v-container>
    <v-row>
      <v-col class="text-center" cols="12">
        <v-btn
            v-for="(item, i) in getBoardKindObserver"
            :key="i"
            class="text-capitalize"
            exact
            exact-active-class="accent--text"
            @click="_getBoardList(item.uid)"
            text
        >{{ item.title }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "BoardNavigator",
  data() {
    return {};
  },

  methods: {
    ...mapActions("boardStore", ["getBoardKindList", "getBoardList"]),
    ...mapMutations("boardStore", ["SET_BOARD_KIND_UID"]),

    // TODO: range 개수
    _getBoardList(board_kind_uid) {
      this.getBoardList({
        board_kind_uid: board_kind_uid,
        page: 1,
        range: 10,
      });
      this.SET_BOARD_KIND_UID(board_kind_uid);
      // 게시판이 바뀌면 페이지를 1페이지로 돌려놔야 함.
      this.$emit("clearPage");
    }
  },

  computed: {
    ...mapGetters("boardStore", ["getBoardKindObserver"]),
  },

  created() {
    this.getBoardKindList();
  }
}
</script>

<style scoped>

</style>