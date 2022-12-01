<template>
  <div>
    <v-row justify="center">
      <v-col cols="5">
        <v-text-field label="댓글을 입력해주세요." v-model="body" type="text" @keyup.enter="_createComment" flat dense solo outlined/>
      </v-col>
      <v-col cols="1">
        <v-btn class="ma-0" color="accent" @click="_createComment" depressed large>등록하기</v-btn>
      </v-col>
    </v-row>

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
      body: '',
    };
  },
  methods: {
    ...mapActions("boardStore", ["getCommentList", "getCommentPages", "createComment"]),
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

    async _createComment() {
      await this.createComment({
        board_uid: this.board_uid,
        body: this.body,
      }).then((data) => {
        console.log(data);
        if (data === true) {
          alert("댓글 등록을 성공하였습니다.");
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
          this.body = '';
        }
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