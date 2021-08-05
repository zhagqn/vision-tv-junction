import http from "@/libs/http";
export default {
  qr_code(code) {
    return http.get(`/util/qr_code/?code=${code}`, {
      responseType: 'blob'
    });
  },
}
