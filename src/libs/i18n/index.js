import Vue from "vue";
// import VueI18n from "vue-i18n";
import I18nLite from "./i18n-lite"
// import Store from "@/store";
import languages from "@/assets/languages";

// Vue.use(VueI18n);
// Vue.use(I18nLite)

Vue.use(I18nLite, {
  packs: languages
});

// const i18n = new VueI18n({
//   locale: Store.state.app.locale,
//   silentFallbackWarn: true,
//   messages: languages,
// });

// export default i18n;
