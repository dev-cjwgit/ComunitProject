<template>
  <v-container>
    {{ body }} - {{ nickname }} - {{ sdate | timestampToDate }}
  </v-container>
</template>

<script>
export default {
  props: ["user_uid", "nickname", "sdate", "udate", "body"],
  name: "BoardDetailCommentItem"
}
</script>

<style scoped>

</style>