import system from "./system";
import "./scrollIntoViewIfNeeded";

export const startVideo = function (url) {
  // eslint-disable-next-line
  console.log("startVideo", url)
  if (system.system === 'android') {
    window.JS && window.JS.startVideo(url);
  }
}

export const stopVideo = function () {
  // eslint-disable-next-line
  console.log("stopVideo")
  if (system.system === 'android') {
    window.JS && window.JS.stopVideo();
  }
}

export const goDps = function () {
  // eslint-disable-next-line
  console.log("goDps")
  if (system.system === 'android') {
    window.JS && window.JS.goDps(30);
  }
}

export const openApp = function (packageName, activityName, version, src) {
  // eslint-disable-next-line
  console.log("openApp", `${packageName}/${activityName} version: ${version} url: ${src}`);
  const json = JSON.stringify({ packageName, activityName, version, src })
  if (system.system === 'android') {
    window.JS && window.JS.openApp(json)
  }
}

export default {
  getPlatform() {
    let platform = "PC";
    switch (system.system) {
      case "android":
        platform = "android";
        break;
      default:
        platform = "PC";
        break;
    }
    return platform;
  },
  getMac() {
    let mac = "A8:77:E5:0B:96:21";
    const platform = this.getPlatform();
    if (platform === "android" && window.JS) {
      mac = window.JS.getMac();
    }
    return mac;
  },

};
