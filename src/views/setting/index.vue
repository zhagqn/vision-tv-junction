<template>
  <div class="w-screen h-screen">
    <bg-image></bg-image>
    <tvheader></tvheader>
    <tvfooter></tvfooter>
    <tvc-panel
      class="locale-items fixed top-40 left-1/4 right-1/4 bottom-24 flex flex-col"
      :data="locales"
      :focus="true"
      @ok="okHandler"
      v-model="btnIndex"
      @change="changeHandler"
    >
      <template v-slot="{ item }">
        <tvc-cell>
          <div class="locale-item text-3xl px-12 py-4 mb-6 text-white">
            {{ item.title }}
          </div>
        </tvc-cell>
      </template>
    </tvc-panel>
    <div class="version fixed right-2 bottom-2">{{ version }}</div>
  </div>
</template>

<script>
import tvheader from "@/components/header";
import tvfooter from "@/components/footer";
import bgImage from "@/components/background/bg-matrix";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Setting",
  components: {
    tvheader,
    tvfooter,
    bgImage,
  },
  data() {
    return {
      btnIndex: 0,
      locales: [
        { locale: "zh-cn", title: "中文" },
        { locale: "en", title: "English" },
      ],
    };
  },
  computed: {
    ...mapState({
      version: (state) => state.app.version,
      locale: (state) => state.app.locale,
    }),
  },
  mounted() {
    this.locales.forEach((locale, i) => {
      if (locale.locale === this.locale) {
        this.btnIndex = i;
      }
    });
    this.$bus.on("onkey", (key) => {
      if (key === "back") {
        this.$router.back();
      }
    });
  },
  methods: {
    ...mapMutations({
      setLocale: "app/SET_LOCALE",
    }),
    okHandler({ item }) {
      this.setLocale(item.locale);
      this.$router.back();
    },
    changeHandler({ item }) {
      this.setLocale(item.locale);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/skins/_index.scss";
.locale-items {
  .locale-item {
    background: rgba(255, 255, 255, 0.1);
  }
  .__tvc-cell.__focus {
    .locale-item {
      @include background_color("setting-focus-button-background");
    }
  }
}
.version {
  @include color("setting-version-color");
}
</style>
