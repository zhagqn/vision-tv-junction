import http from "@/libs/http";

export default {
  get(id) {
    if (id) {
      return http.get(`/image/${id}/`);
    } else {
      return http.get(`/image/`);
    }
  },
  batch(ids = []) {
    return http.get(`/image/batch/?image_id=${ids.join(",")}`);
  },
};
