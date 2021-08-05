import http from "@/libs/http"

export default {
  guest_profile() {
    return http.get(`/hotel/guest_profile/`);
  },
}