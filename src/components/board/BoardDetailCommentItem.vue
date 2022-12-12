<template>
  <v-container>
    {{ body }} - {{ nickname }} - {{ sdate | timestampToDate }}
    <span v-if="getUserUidObserver === user_uid">
      <v-btn icon @click="_updateComment">
        <font-awesome-icon icon="fa-edit"/>
      </v-btn>
      <v-btn icon @click="_deleteComment">
        <font-awesome-icon icon="fa-trash"/>
      </v-btn>
    </span>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: ["board_uid", "comment_uid", "user_uid", "nickname", "sdate", "udate", "body"],
  name: "BoardDetailCommentItem",

  computed: {
    ...mapGetters("userStore", ["getUserUidObserver"]),
  },
  methods: {
    ...mapActions("boardStore", ["deleteComment", "getCommentList"]),
    _updateComment() {

    },
    _deleteComment() {
      let like = confirm("정말로 삭제하시겠습니까?");
      if (like !== true)
        return;

      this.deleteComment(this.comment_uid).then((data) => {
        if (data === true) {
          alert("삭제에 성공하였습니다.");
          this.getCommentList({
            board_uid: this.board_uid,
            page: 1,
            range: 10,
          });
          this.getBoardCommentCount(this.board_uid);
        } else {
          alert("삭제에 실패하였습니다.");
        }
      });
    }
  }
}
</script>

<style scoped>

</style>