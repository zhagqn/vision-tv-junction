<template>
  <register @confirm="confirmHandler" v-if="!hasRegister"></register>
</template>

<script>
import { mapMutations } from "vuex";
import { getQueryString } from "@/libs/util";
import api from "@/api";
import native from "@/libs/native";
import register from "@/components/register";
export default {
  name: "Init",
  components: { register },
  data() {
    return {
      hasRegister: true,
    };
  },
  async created() {
    try {
      await this.getHotelInfo();
      await this.getMac();
      await this.getRoomId();
      this.setInit();
    } catch (error) {
      if (error.msg === "Device not found.") {
        this.hasRegister = false;
      }
    }
  },
  methods: {
    ...mapMutations({
      setHotelId: "app/SET_HOTEL_ID",
      setRestaurantId: "app/SET_RESTAURANT_ID",
      setTheme: "app/SET_THEME",
      setSkin: "app/SET_SKIN",
      setInit: "app/SET_INIT",
      setDeviceId: "app/SET_DEVICE_ID",
      setRoomId: "app/SET_ROOM_ID",
    }),
    // 设置酒店相关信息
    async getHotelInfo() {
      const path = location.pathname;
      const theme = getQueryString("theme") || process.env.VUE_APP_THEME;
      const skin = getQueryString("skin") || process.env.VUE_APP_SKIN;

      this.setTheme(theme);
      this.setSkin(skin);

      const res = /\/static\/(\d+)\/([\da-zA-Z]+)/.exec(path);
      const hotelId = (res && res[1]) || process.env.VUE_APP_HOTEL_ID;
      const restaurantId = (res && res[2]) || process.env.VUE_APP_RESTAURANT_ID;
      this.setHotelId(hotelId);
      this.setRestaurantId(restaurantId);
    },
    // 获取设备ID，即mac地址
    getMac() {
      this.setDeviceId(native.getMac());
    },
    // 获取房间号
    async getRoomId() {
      const res = await api.device.get();
      this.setRoomId(res.device.room);
    },
    // 注册成功处理
    async confirmHandler() {
      await this.getRoomId();
      this.setInit();
    },
  },
};
</script>
