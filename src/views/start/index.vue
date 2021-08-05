<template>
  <div class="start">
    <img class="bg" v-if="startPage" v-lazy="startPage.logoUrl" />
    <div class="loading">
      <img class="loading-ring" src="./images/loading.svg" alt="" />
      <div class="loading-tip">LOADING</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Start",
  computed: {
    ...mapState({
      startPage: (state) => state.butler.startPage,
    }),
  },
  async created() {
    await this.getStartPage();
  },
  watch: {
    startPage(nv) {
      if (nv) {
        const { stayTimeSec } = this.startPage.startup;
        setTimeout(() => {
          this.$router.replace("/welcome.html");
        }, stayTimeSec * 1000);
      }
    },
  },
  methods: {
    ...mapActions({
      getStartPage: "butler/getStartPage",
    }),
  },
};
</script>

<style lang="scss">
.start {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bg {
    min-width: 100%;
    min-height: 100%;
  }
  .loading {
    text-align: center;
    display: block;
    position: absolute;
    left: 50%;
    bottom: 5rem;
    transform: translate(-50%);
    .loading-ring {
      width: 4rem;
      margin: auto;
    }
    .loading-tip {
      margin-top: 1rem;
      color: #ffffff;
      font-size: 1rem /* 24px */;
      line-height: 2rem;
      font-weight: 700;
      text-align: center;
    }
  }
}
</style>
