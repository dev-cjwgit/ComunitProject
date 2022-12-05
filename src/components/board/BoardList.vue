<template>
  <v-container>
    <board-search/>

    <v-col cols="12">
      <v-row>
        <v-col class="text-right mb-4" cols="12">
          <v-btn
              class="text-capitalize"
              exact
              target="_black"
              exact-active-class="accent--text"
              color="primary"
              @click="_goWrite"
              text>
            글쓰기
          </v-btn>
        </v-col>
      </v-row>
      <v-simple-table height="550px">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-center" style="width: 10%;">
              글번호
            </th>
            <th class="text-center" style="width: 30%;">
              제목
            </th>
            <th class="text-center" style="width: 20%;">
              작성자
            </th>
            <th class="text-center" style="width: 10%;">
              게시일
            </th>
            <th class="text-center" style="width: 10%;">
              조회수
            </th>


          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in getBoardListObserver"
              :key="item.uid"
              @dblclick="_goDetail(item.uid)"
          >
            <td class="text-center">{{ item.uid }}</td>
            <td class="text-center">{{ item.title }} &nbsp; <b>[{{ item.comment_count === null ? 0 : item.comment_count | makeComma }}]</b></td>
            <td class="text-center">{{ item.nickname }}</td>
            <td class="text-center">{{ item.sdate | timestampToDate }} </td>
            <td class="text-center">{{ item.view_count === null ? 0 : item.view_count | makeComma }}</td>

          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>

    <board-pagination ref="pagination"/>
  </v-container>
</template>

<script>


import {mapGetters} from "vuex";
import BoardSearch from "@/components/board/BoardSearch";
import BoardPagination from "@/components/board/BoardPagination";

export default {
  name: "BoardList",
  components: {
    BoardSearch,
    BoardPagination
  },
  data() {
    return {};
  },
  methods: {
    _goDetail(board_uid) {
      this.$router.push({
        name: 'boarddetail', params: {board_uid: board_uid}
      });
    },
    _goWrite() {
      this.$router.push({name: 'boardwrite'});
    },
  },
  computed: {
    ...mapGetters("boardStore", ["getBoardListObserver"]),
  }
}
</script>

<style scoped>

</style>