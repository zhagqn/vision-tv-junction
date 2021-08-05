<template>
  <div class="welcome w-full h-full relative">
    <background />
    <div class="mask absolute left-0 right-1/3 inset-y-0 opacity-50"></div>
    <logo v-if="welcomePage" :url="welcomePage.logoUrl" />
    <div class="absolute text-white top-14 right-16 text-3xl">
      {{ $t("welcome.room") }}: {{ roomId }}
    </div>
    <div class="text-white absolute top-52 left-20 right-16" v-if="welcomePage">
      <div class="text-4xl mt-6 font-bold">
        {{ $t("welcomeTitle", welcomePage.translates) }}
      </div>
      <div
        class="message mt-6 w-7/12 leading-7"
        v-html="$t('welcomeMessage', welcomePage.translates)"
      ></div>
    </div>
    <btn-locale class="absolute bottom-8 left-20" @ok="okHandler"></btn-locale>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import background from "@/components/background";
import logo from "./components/logo.vue";
import btnLocale from "./components/btn-locale.vue";

export default {
  name: "Welcome",
  components: { background, logo, btnLocale },
  computed: {
    ...mapState({
      roomId: (state) => state.app.roomId,
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
    okHandler() {
      this.$router.push("/home.html");
    },
  },
};
</script>

<style lang="scss">
.welcome {
  .mask {
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0)
    );
  }
  .message {
    font-size: 1.35rem;
    * {
      margin-top: 0.6rem;
      margin-bottom: 0.6rem;
    }
  }
}
</style>
