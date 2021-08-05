<template>
  <tvc-panel
    @ok="onHandler"
    :data="locales"
    v-model="btnIndex"
    @change="changeHandler"
    :focus="true"
    class="btn-language flex items-center"
  >
    <template v-slot="{ item }">
      <tvc-cell>
        <button class="text-lg px-8 py-1 leading-6 text-white">
          {{ item.title }}
        </button>
      </tvc-cell>
    </template>
  </tvc-panel>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "BtnLanguage",
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
      locale: (state) => state.app.locale,
    }),
  },
  mounted() {
    this.locales.forEach((locale, i) => {
      if (locale.locale === this.locale) {
        this.btnIndex = i;
      }
    });
  },
  methods: {
    ...mapMutations({
      setLocale: "app/SET_LOCALE",
    }),
    onHandler({ item }) {
      this.setLocale(item.locale);
      this.$emit("ok");
    },
    changeHandler({ item }) {
      this.setLocale(item.locale);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/skins/_index.scss";

.btn-language {
  button {
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.3);
  }
  .__tvc-cell.__focus button {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    width: 8rem;
    @include background_color("welcome-focus-button-background");
  }
}
</style>
