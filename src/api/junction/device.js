import http from "@/libs/http";

export default {
  get() {
    return http.get(`/device/get/?saveip=1`);
  },
  register(room, validation_code) {
    const {
      hotel_id,
      restaurant_id,
      room_id,
      device_id,
      device_type,
      device_name,
    } = http.getDefaultParams();
    return http.post("/device/register/", {
      room,
      validation_code,
      hotel_id,
      restaurant_id,
      room_id,
      device_id,
      device_type,
      device_name,
    });
  },
};
