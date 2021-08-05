<template>
  <div class="fixed inset-0" :class="skin"></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      skin: (state) => state.app.skin,
    }),
  },
};
</script>

<style lang="scss" scoped>
.default {
  background: 100%/100% url("./images/matrix_default.jpg");
}
.blue {
  background: 100%/100% url("./images/matrix_blue.jpg");
}
.purple {
  background: 100%/100% url("./images/matrix_purple.jpg");
}
</style>
