<template>
  <div>
    <v-container>
      <v-col>
        <div>
          <h2 class="text-h4 font-weight-bold">Apartment</h2>
        </div>
      </v-col>

      <v-col>
        <apt-search/>
      </v-col>

      <v-row>
        <v-col>
          MapComponent
        </v-col>
        <v-col>
          <!--                    <apt-list/>-->
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AptSearch from "@/components/apartment/AptSearch.vue"
import AptList from "@/components/apartment/ApartmentList.vue";

export default {
  name: "Home",
  components: {
    AptSearch,
    AptList,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {
  },
};
</script>
