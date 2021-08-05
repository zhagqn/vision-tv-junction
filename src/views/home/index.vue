<template>
  <component :is="theme"></component>
</template>

<script>
import { mapState } from "vuex";
import matrix from "./themes/matrix/index.vue";
export default {
  name: "Home",
  components: {
    matrix,
  },
  computed: {
    ...mapState({
      theme: (state) => state.app.theme,
    }),
  },
};
</script>
