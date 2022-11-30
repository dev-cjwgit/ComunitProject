<template>
  <div>
    댓글 레이아웃 입니다.
    <div v-for="item in getBoardCommentListObserver">
      <board-detail-comment-item
          :body="item.body"
          :nickname="item.nickname"
          :sdate="item.sdate"
          :udate="item.udate"
          :user_uid="item.user_uid"
      />
    </div>
  </div>
</template>

<script>
import BoardDetailCommentItem from "@/components/board/BoardDetailCommentItem";
import {mapActions, mapGetters} from "vuex";

export default {
  props: ["board_uid"],
  name: "BoardDetailComment",
  components: {
    BoardDetailCommentItem,
  },

  methods: {
    ...mapActions("boardStore", ["getCommentList"])
  },

  computed: {
    ...mapGetters("boardStore", ["getBoardCommentListObserver"]),
  },

  created() {
    // TODO: 댓글 range
    this.getCommentList({
      board_uid: this.board_uid,
      page: 1,
      range: 10,
    });
  },
}
</script>

<style scoped>

</style>