<template>
  <img
    class="logo absolute top-14 left-20"
    :class="'_ps_' + hotelId"
    v-lazy="url"
  />
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WelcomeLogo",
  props: ["url"],
  computed: {
    ...mapState({
      hotelId: (state) => state.app.hotelId,
    }),
  },
};
</script>

<style lang="scss" scoped>
.logo {
  &._ps_0086000069 {
    width: 52rem;
  }
  &._ps_0086000055 {
    height: 8rem;
  }
}
</style>
