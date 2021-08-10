const version = require("../../../package.json").version;
export default {
  namespaced: true,
  state: () => ({
    locale: "zh-cn",
    version,
    inited: false,
    hotelId: "",
    restaurantId: "",
    roomId: "",
    deviceId: "",
    deviceName: "",
    theme: localStorage.getItem("vision_tv:theme") || "",
    skin: localStorage.getItem("vision_tv:skin") || "",
  }),
  mutations: {
    SET_INIT(state) {
      state.inited = true;
    },
    SET_LOCALE(state, locale) {
      state.locale = locale;
    },
    SET_HOTEL_ID(state, hotelId) {
      state.hotelId = hotelId;
    },
    SET_RESTAURANT_ID(state, restaurantId) {
      state.restaurantId = restaurantId;
    },
    SET_ROOM_ID(state, roomId) {
      state.roomId = roomId;
    },
    SET_DEVICE_ID(state, deviceId) {
      state.deviceId = deviceId;
    },
    SET_THEME(state, theme) {
      state.theme = theme;
      localStorage.setItem("vision_tv:theme", theme);
    },
    SET_SKIN(state, skin) {
      state.skin = skin;
      localStorage.setItem("vision_tv:skin", skin);
    },
  },
};
