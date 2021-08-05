<template>
  <div
    id="app"
    :data-skin="skin"
    class="h-screen w-screen overflow-hidden font-sans"
  >
    <init v-if="!inited"></init>
    <router-view v-else />
  </div>
</template>

<script>
import init from "@/components/init";
import { mapState } from "vuex";
export default {
  components: {
    init,
  },
  computed: {
    ...mapState({
      inited: (state) => state.app.inited,
      skin: (state) => state.app.skin,
      theme: (state) => state.app.theme,
    }),
  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_2668886_m76bm00pm58.css);
</style>
