import TvcPanel from "./src/index.vue";

TvcPanel.install = function (Vue) {
  Vue.component(TvcPanel.name, TvcPanel);
};

export default TvcPanel;
