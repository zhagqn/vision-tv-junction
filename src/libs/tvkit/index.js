import TvcHandler from "./tvc-handler";
import TvcPanel from "./tvc-panel";
import TvcCell from "./tvc-cell";

const handlers = [TvcHandler];

const components = [TvcPanel, TvcCell];

const install = function (Vue) {
  if (install.installed) {
    return;
  }
  components.map((component) => {
    Vue.component(component.name, component);
  });

  handlers.map((handler) => {
    Vue.use(handler);
  });
  install.installed = true;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};
