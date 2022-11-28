<template>
  <div>
    <v-card absolute app color="primary" dark flat>
      <v-container>

        <div class="text-center">
          Copyright &copy;
          <a
              class="white--text"
              href="https://github.com/hyeonslove"
              rel="noopener noreferrer"
              target="_blank">
            CJW
          </a>
          {{ new Date().getFullYear() }}. All rights reserved.
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
