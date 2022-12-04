<template>
  <v-container>
    <v-row>
      <v-col class="text-right mb-4" cols="12">
        <v-btn
            class="text-capitalize"
            exact
            target="_black"
            exact-active-class="accent--text"
            color="primary"
            @click="_createBoard"
            text>
          글쓰기
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
import {mapActions, mapGetters} from "vuex";

export default {

  name: "BoardWrite",
  components: {
    VueEditor,
  },
  data() {
    return {
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
    ...mapActions("boardStore", ["createBoard", "getBoardList"]),
    ...mapGetters("boardStore", ["getBoardKindUidObserver", "getPrevPageObserver"]),

    async _createBoard() {
      let params = {
        board_kind_uid: this.getBoardKindUidObserver(),
        title: this.title,
        body: this.body,
      };
      console.log(params);
      await this.createBoard(params).then((data) => {
        console.log(data);
        if (data === true) {
          alert("글 등록을 성공하였습니다.");
          this.getBoardList({
            board_kind_uid: this.getBoardKindUidObserver(),
            page: this.getPrevPageObserver(),
            range: 10,
          });
          this.$router.go(-1);
        }
      });
    },

  }
}
</script>

<style scoped>

</style>