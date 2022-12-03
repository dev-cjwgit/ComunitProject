<template>
  <v-container>
    <v-row>
      <v-col class="text-left mb-4" cols="12">
        <v-btn
            class="text-capitalize"
            exact
            target="_black"
            exact-active-class="accent--text"
            color="primary"
            @click="_back"
            text>
          뒤로가기
        </v-btn>
      </v-col>
    </v-row>
    <v-card elevation="10" outlined width="100%" class="mx-auto">
      <v-card-title>
        <v-card-text>
          <v-row v-if="getBoardDetailObserver.user_uid === getUserUidObserver" justify="center">
            <v-btn
                class="text-capitalize"
                exact
                target="_black"
                exact-active-class="accent--text"
                color="primary"
                @click="_updateBoard"
                text>
              수정하기
            </v-btn>
            <v-btn
                class="text-capitalize"
                exact
                target="_black"
                exact-active-class="accent--text"
                color="primary"
                @click="_deleteBoard"
                text>
              삭제하기
            </v-btn>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="제목" :value="getBoardDetailObserver.title" readonly/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="작성자" readonly dense :value="getBoardDetailObserver.nickname"/>
            </v-col>
            <v-col>
              <v-text-field
                  label="게시일"
                  readonly
                  :value="getBoardDetailObserver.sdate | timestampToDate"
                  dense>
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  label="수정일"
                  readonly
                  :value="getBoardDetailObserver.udate | timestampToDate"
                  dense/>
            </v-col>
            <v-col>
              <v-text-field label="조회수" :value="getBoardDetailObserver.view_count | makeComma" readonly dense/>
            </v-col>
          </v-row>
          내용<br/>

          <div class="pt-4" v-html="getBoardDetailObserver.body">

          </div>
        </v-card-text>
      </v-card-title>
    </v-card>
    <v-card-text elevation="10" outlined width="100%" class="mt-4">
      <div>
        댓글 ({{ getBoardDetailObserver.comment_count }})
      </div>
      <board-detail-comment :board_uid="board_uid"/>
    </v-card-text>
  </v-container>

</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import BoardDetailComment from "@/components/board/BoardDetailComment";

export default {
  name: "BoardDetail",
  components: {BoardDetailComment,},
  data() {
    return {
      board_uid: 0,

    };
  },
  methods: {
    ...mapActions("boardStore", ["getBoardDetail", "deleteComment", "getBoardKindList", "getBoardList"]),
    ...mapMutations("boardStore", ["SET_BOARD_KIND_UID", "SET_PREV_PAGE"]),
    _back() {
      this.$router.go(-1);
    },
    _updateBoard() {

    },
    async _deleteBoard() {
      await this.deleteComment(this.getBoardDetailObserver.uid).then((data) => {
        if (data === true) {
          alert('삭제를 완료하였습니다.');
          this.$router.push({name: 'board'})
          this.getBoardList({
            board_kind_uid: this.getBoardKindUidObserver,
            page: 1,
            range: 10,
          });
          this.SET_BOARD_KIND_UID(this.getBoardKindUidObserver);
          this.SET_PREV_PAGE(1);
        }
      })
    },

  },

  computed: {
    ...mapGetters("boardStore", ["getBoardDetailObserver", "getBoardKindObserver", "getBoardKindUidObserver"]),
    ...mapGetters("userStore", ["getUserUidObserver"]),
  },

  created() {
    this.board_uid = this.$route.params.board_uid;
    this.getBoardDetail(this.board_uid);

  }
}
</script>

<style scoped>

</style>