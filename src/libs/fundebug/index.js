import Vue from "vue";
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.init({
  apikey: "e63ad7af088051f68cc179df472f24fd441dc3cf7999b0393c0f32dd5d6d1bb5"
})
fundebugVue(fundebug, Vue);