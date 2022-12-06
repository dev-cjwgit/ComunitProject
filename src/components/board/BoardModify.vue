<template>
  <v-container>
    <h1>수정하기</h1>
    <v-row>
      <v-col class="text-right mb-4" cols="12">
        <v-btn
            class="text-capitalize"
            exact
            target="_black"
            exact-active-class="accent--text"
            color="primary"
            @click="_updateBoard"
            text>
          수정완료
        </v-btn>
      </v-col>
      <v-col class="text-center sm6" cols="12">
        <v-row>
          <v-text-field
              v-model="title"
              solo
              label="제목을 입력하세요"
              clearable/>
        </v-row>
        <v-row>
          <vue-editor class="mb-16"

                      v-model="body"/>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Basic Use - Covers most scenarios
// https://github.com/davidroyer/vue2-editor
import {VueEditor} from "vue2-editor";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {

  name: "BoardWrite",
  components: {
    VueEditor,
  },
  data() {
    return {
      board_uid: -1,
      title: '',
      body: '',
      customToolbar: [
        [{'font': []}],
        [{'header': [false, 1, 2, 3, 4, 5, 6,]}],
        [{'size': ['small', false, 'large', 'huge']}],
        ['bold', 'italic', 'underline', 'strike'],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
        [{'header': 1}, {'header': 2}],
        ['blockquote', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'color': []}, {'background': []}],
        ['link', 'image', 'video', 'formula'],
        [{'direction': 'rtl'}],
        ['clean'],
      ]
    };
  },
  methods: {
    ...mapActions("boardStore", ["getBoardList", "getBoardDetailAsync", "updateBoard"]),
    ...mapGetters("boardStore", ["getBoardKindUidObserver", "getPrevPageObserver"]),
    ...mapMutations("boardStore", ["SET_BOARD_DETAIL"]),
    async _updateBoard() {
      this.updateBoard({
        uid: this.board_uid,
        title: this.title,
        body: this.body,
      }).then((data) => {
        if (data === true) {
          this.$router.push({
            name: 'boarddetail', params: {
              board_uid: this.board_uid,
            }
          });
        }
      })
    },

  },
  computed: {},
  created() {
    this.board_uid = this.$route.params.board_uid;
    this.getBoardDetailAsync(this.board_uid).then((data) => {
      this.title = data.title;
      this.body = data.body;
    });
  },
}
</script>

<style scoped>

</style>