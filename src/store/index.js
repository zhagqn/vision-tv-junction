import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import butler from "./modules/butler";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app, // application 基本信息，包含初始化参数等
    butler,
  },
  mutations: {},
  getters: {},
  actions: {},
});
