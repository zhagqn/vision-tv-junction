import http from "@/libs/http";
const qs = require("querystring");

export default {
  butler_startpage() {
    return http.get(`/page/butler_startpage/`);
  },
  butler_welcomepage() {
    return http.get(`/page/butler_welcomepage/`);
  },
  butler_homepage() {
    return http.get(`/page/butler_homepage/`);
  },
  butler_tv_channels() {
    return http.get(`/page/butler_tv_channels/`);
  },
  search(lang_agnostic_id, page_type) {
    let params = {
      page_type,
      lang_agnostic_id
    };
    return http.get(`/page/search/?${qs.stringify(params)}`);
  },
  get(id) {
    return http.get(`/page/${id}/`);
  },
  batch(ids) {
    return http.get(`page/batch/?page_id=${ids.join(",")}`);
  },
};
