import axios from "axios";
import store from "@/store";

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

const device_type = process.env.VUE_APP_DEVICE_TYPE;
const device_name = process.env.VUE_APP_DEVICE_NAME;

http.getDefaultParams = () => {
  const hotel_id = store.state.app.hotelId;
  const restaurant_id = store.state.app.restaurantId;
  const room_id = store.state.app.roomId;
  const device_id = store.state.app.deviceId;
  return {
    hotel_id,
    restaurant_id,
    room_id,
    device_id,
    device_type,
    device_name,
  };
};

http.interceptors.request.use(
  (config) => {
    const hotel_id = store.state.app.hotelId;
    const restaurant_id = store.state.app.restaurantId;
    const device_id = store.state.app.deviceId;

    config.params = config.params || {};

    Object.assign(config.params, {
      hotel_id,
      restaurant_id,
      device_id,
      device_type,
      device_name,
    });

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    if (res.data.ret === 200) {
      return res.data.data;
    } else if (res.data.type === 'image/png' && res.status === 200) {
      return res.data;
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    const res = error?.response?.data || {
      ret: error.status,
      msg: error.statusText,
    };

    return Promise.reject(res);
  }
);

export default http;
