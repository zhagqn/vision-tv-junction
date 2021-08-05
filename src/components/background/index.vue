<template>
  <div class="z-0 background" v-if="welcomePage">
    <div v-if="welcomePage.bgUrl">
      <img class="img absolute inset-0" v-lazy="welcomePage.bgUrl" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      welcomePage: (state) => state.butler.welcomePage,
    }),
  },
  async created() {
    await this.getWelcomePage();
  },
  methods: {
    ...mapActions({
      getWelcomePage: "butler/getWelcomePage",
    }),
  },
};
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: 100%;
}
</style>
