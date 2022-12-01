<template>
  <div>
    댓글 레이아웃 입니다.
    <div v-for="item in getBoardCommentListObserver">
      <board-detail-comment-item
          :body="item.body"
          :nickname="item.nickname"
          :sdate="item.sdate"
          :udate="item.udate"
          :user_uid="item.user_uid"/>
    </div>
    <vs-pagination :current-page="page" :total-pages="getCommentMaxPageObserver" @change="_changePage"></vs-pagination>

  </div>
</template>

<script>
import BoardDetailCommentItem from "@/components/board/BoardDetailCommentItem";
import VsPagination from '@vuesimple/vs-pagination';
import {mapActions, mapGetters} from "vuex";

export default {
  props: ["board_uid"],
  name: "BoardDetailComment",
  components: {
    BoardDetailCommentItem,
    VsPagination,
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    ...mapActions("boardStore", ["getCommentList", "getCommentPages"]),
    _changePage(value) {
      this.page = value;
      // TODO: 댓글 range
      this.getCommentPages({
        board_uid: this.board_uid,
        range: 10,
      });

      // TODO: 댓글 range
      this.getCommentList({
        board_uid: this.board_uid,
        page: this.page,
        range: 10,
      });
    },
  },

  computed: {
    ...mapGetters("boardStore", ["getBoardCommentListObserver", "getCommentMaxPageObserver"]),
  },

  created() {
    // TODO: 댓글 range
    this.getCommentPages({
      board_uid: this.board_uid,
      range: 10,
    });

    // TODO: 댓글 range
    this.getCommentList({
      board_uid: this.board_uid,
      page: this.page,
      range: 10,
    });
  },
}
</script>

<style scoped>

</style>