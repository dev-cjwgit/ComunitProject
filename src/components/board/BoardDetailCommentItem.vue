<template>
  <v-container>
    <v-col>
      <v-text-field @keyup.enter="_updateComment" v-model="o_body" :readonly="edit">
      </v-text-field>

      <v-row>
        {{ nickname }} - {{ udate | timestampToDate }}
      </v-row>
    </v-col>
    <span v-if="getUserUidObserver === user_uid">
      <v-btn icon @click="_editComment">
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
  data() {
    return {
      o_body: '',
      edit: true,
    }
  },
  computed: {
    ...mapGetters("userStore", ["getUserUidObserver"]),
  },
  watch: {
    body() {
      this.o_body = this.body;
    }
  },

  created() {
    this.o_body = this.body;
  },
  methods: {
    ...mapActions("boardStore", ["deleteComment", "getCommentList", "updateComment", "getBoardCommentCount"]),
    _updateComment() {
      let like = confirm("정말로 수정하시겠습니까?");
      if (like !== true)
        return;

      this.updateComment({
        uid: this.comment_uid,
        body: this.o_body,
      }).then((data) => {
        if (data === true) {
          this.edit = true;
          alert("수정에 성공하였습니다.");
          this.getCommentList({
            board_uid: this.board_uid,
            page: 1,
            range: 10,
          });
        } else {
          alert("수정에 실패하였습니다.");
        }
      });
    },

    _editComment() {
      this.edit = !this.edit;
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