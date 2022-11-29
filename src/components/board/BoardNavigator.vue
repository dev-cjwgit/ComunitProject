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
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BoardNavigator",
  data() {
    return {};
  },

  methods: {
    ...mapActions("boardStore", ["getBoardKindList", "getBoardList"]),

    _getBoardList(board_uid) {
      this.getBoardList(board_uid);
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