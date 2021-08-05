import TvcCell from "./src/index.vue";

TvcCell.install = function (Vue) {
  Vue.component(TvcCell.name, TvcCell);
};

export default TvcCell;
