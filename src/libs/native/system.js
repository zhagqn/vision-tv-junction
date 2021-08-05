const ua = navigator.userAgent.toLowerCase();
const uaTest = (regexp) => regexp.test(ua);
const verTest = (regexp) =>
  ua
    .match(regexp)
    .toString()
    .replace(/[^0-9|_.]/g, "")
    .replace(/_/g, ".");
// 系统
let system = "unknown";
if (uaTest(/windows|win32|win64|wow32|wow64/g)) {
  system = "windows"; // windows系统
} else if (uaTest(/macintosh|macintel/g)) {
  system = "macos"; // macos系统
} else if (uaTest(/x11/g)) {
  system = "linux"; // linux系统
} else if (uaTest(/android|adr/g)) {
  system = "android"; // android系统
} else if (uaTest(/ios|iphone|ipad|ipod|iwatch/g)) {
  system = "ios"; // ios系统
}
// 系统版本
let systemVer = "unknown";
if (system === "windows") {
  if (uaTest(/windows nt 5.0|windows 2000/g)) {
    systemVer = "2000";
  } else if (uaTest(/windows nt 5.1|windows xp/g)) {
    systemVer = "xp";
  } else if (uaTest(/windows nt 5.2|windows 2003/g)) {
    systemVer = "2003";
  } else if (uaTest(/windows nt 6.0|windows vista/g)) {
    systemVer = "vista";
  } else if (uaTest(/windows nt 6.1|windows 7/g)) {
    systemVer = "7";
  } else if (uaTest(/windows nt 6.2|windows 8/g)) {
    systemVer = "8";
  } else if (uaTest(/windows nt 6.3|windows 8.1/g)) {
    systemVer = "8.1";
  } else if (uaTest(/windows nt 10.0|windows 10/g)) {
    systemVer = "10";
  }
} else if (system === "macos") {
  systemVer = verTest(/os x [\d._]+/g);
} else if (system === "android") {
  systemVer = verTest(/android [\d._]+/g);
} else if (system === "ios") {
  systemVer = verTest(/os [\d._]+/g);
}
// 平台
let platform = "unknown";
if (system === "windows" || system === "macos" || system === "linux") {
  platform = "desktop"; // 桌面端
} else if (system === "android" || system === "ios" || uaTest(/mobile/g)) {
  platform = "mobile"; // 移动端
}
// 内核和载体
let engine = "unknown";
let supporter = "unknown";
if (uaTest(/applewebkit/g)) {
  engine = "webkit"; // webkit内核
  if (uaTest(/edge/g)) {
    supporter = "edge"; // edge浏览器
  } else if (uaTest(/opr/g)) {
    supporter = "opera"; // opera浏览器
  } else if (uaTest(/chrome/g)) {
    supporter = "chrome"; // chrome浏览器
  } else if (uaTest(/safari/g)) {
    supporter = "safari"; // safari浏览器
  }
} else if (uaTest(/gecko/g) && uaTest(/firefox/g)) {
  engine = "gecko"; // gecko内核
  supporter = "firefox"; // firefox浏览器
} else if (uaTest(/presto/g)) {
  engine = "presto"; // presto内核
  supporter = "opera"; // opera浏览器
} else if (uaTest(/trident|compatible|msie/g)) {
  engine = "trident"; // trident内核
  supporter = "iexplore"; // iexplore浏览器
}
// 内核版本
let engineVer = "unknown";
if (engine === "webkit") {
  engineVer = verTest(/applewebkit\/[\d._]+/g);
} else if (engine === "gecko") {
  engineVer = verTest(/gecko\/[\d._]+/g);
} else if (engine === "presto") {
  engineVer = verTest(/presto\/[\d._]+/g);
} else if (engine === "trident") {
  engineVer = verTest(/trident\/[\d._]+/g);
}
// 载体版本
let supporterVer = "unknown";
if (supporter === "chrome") {
  supporterVer = verTest(/chrome\/[\d._]+/g);
}
// else if (supporter === "safari") {
//   supporterVer = verTest(/version\/[\d._]+/g);
// } 
else if (supporter === "firefox") {
  supporterVer = verTest(/firefox\/[\d._]+/g);
}
// else if (supporter === "opera") {
//   supporterVer = verTest(/opr\/[\d._]+/g);
// } 
else if (supporter === "iexplore") {
  supporterVer = verTest(/(msie [\d._]+)|(rv:[\d._]+)/g);
}
else if (supporter === "edge") {
  supporterVer = verTest(/edge\/[\d._]+/g);
}
// 外壳和外壳版本
let shell = "none";
let shellVer = "unknown";
if (uaTest(/micromessenger/g)) {
  shell = "wechat"; // 微信浏览器
  shellVer = verTest(/micromessenger\/[\d._]+/g);
} else if (uaTest(/qqbrowser/g)) {
  shell = "qq"; // QQ浏览器
  shellVer = verTest(/qqbrowser\/[\d._]+/g);
} else if (uaTest(/ucbrowser/g)) {
  shell = "uc"; // UC浏览器
  shellVer = verTest(/ucbrowser\/[\d._]+/g);
} else if (uaTest(/qihu 360se/g)) {
  shell = "360"; // 360浏览器(无版本)
} else if (uaTest(/2345explorer/g)) {
  shell = "2345"; // 2345浏览器
  shellVer = verTest(/2345explorer\/[\d._]+/g);
} else if (uaTest(/metasr/g)) {
  shell = "sougou"; // 搜狗浏览器(无版本)
} else if (uaTest(/lbbrowser/g)) {
  shell = "liebao"; // 猎豹浏览器(无版本)
} else if (uaTest(/maxthon/g)) {
  shell = "maxthon"; // 遨游浏览器
  shellVer = verTest(/maxthon\/[\d._]+/g);
}
export default {
  engine, // webkit gecko presto trident
  engineVer,
  platform, // desktop mobile
  supporter, // chrome safari firefox opera iexplore edge
  supporterVer,
  system, // windows macos linux android ios
  systemVer,
  shell, // wechat qq uc 360 2345 sougou liebao maxthon
  shellVer,
};
