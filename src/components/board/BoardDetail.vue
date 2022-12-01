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
        댓글 ({{getBoardDetailObserver.comment_count}})
      </div>
      <board-detail-comment :board_uid="board_uid"/>
    </v-card-text>
  </v-container>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
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
    ...mapActions("boardStore", ["getBoardDetail"]),
    _back() {
      this.$router.go(-1);
    },
  },

  computed: {
    ...mapGetters("boardStore", ["getBoardDetailObserver"]),
  },

  created() {
    this.board_uid = this.$route.params.board_uid;
    this.getBoardDetail(this.board_uid);

  }
}
</script>

<style scoped>

</style>