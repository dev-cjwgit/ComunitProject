<template>
  <v-container>

    <v-col cols="12">
      <v-simple-table>
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
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in getBoardListObserver"
              :key="item.uid"
              @click="_goDetail(item.uid)"
          >
            <td class="text-center">{{ item.uid }}</td>
            <td class="text-center">{{ item.title }} &nbsp; &nbsp; <b>({{ item.comment_count }})</b></td>
            <td class="text-center">{{ item.nickname }}</td>
            <td class="text-center">{{ item.sdate | timestampToDate }}</td>

          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-container>
</template>

<script>


import {mapGetters} from "vuex";

export default {
  name: "BoardList",
  data() {
    return {
      headers: [
        {
          text: '번호',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        {text: 'Calories', value: 'calories'},
        {text: 'Fat (g)', value: 'fat'},
        {text: 'Carbs (g)', value: 'carbs'},
        {text: 'Protein (g)', value: 'protein'},
        {text: 'Iron (%)', value: 'iron'},
      ],
    };
  },
  methods: {
    _goDetail(board_uid) {
      console.log(board_uid);
    },
  },
  computed: {
    ...mapGetters("boardStore", ["getBoardListObserver"]),
  }
}
</script>

<style scoped>

</style>