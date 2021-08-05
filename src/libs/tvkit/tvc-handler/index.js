import native from "@/libs/native";
import androidKeys from "./key-enums/android";
import desktopKeys from "./key-enums/desktop";

const platform = native.getPlatform();
let keyCodeEnum = {};

if (platform === "PC") {
  keyCodeEnum = desktopKeys;
} else if (platform === "android") {
  keyCodeEnum = androidKeys;
}

export default function (Vue) {
  document.onkeydown = (e) => {
    const key = keyCodeEnum[e.keyCode];
    Vue.bus.emit("onkey", key, e.keyCode);
  };
}
