<template>
  <div class="bg w-screen h-screen">
    <div
      class="airplay-wrap w-full h-1/3 absolute bottom-0 left-0 right-0 flex box-border p-6 items-center"
    >
      <img class="w-52" src="./images/demo.png" alt="" />
      <div class="tips mt-4 ml-6 flex-1">
        <div class="tip">
          <div
            class="number mr-2 my-2 w-6 h-6 leading-6 text-center inline-block"
          >
            1
          </div>
          {{ $t("airplay.tip1") }}
        </div>
        <div class="tip">
          <div
            class="number mr-2 my-2 w-6 h-6 leading-6 text-center inline-block"
          >
            2
          </div>
          {{ $t("airplay.tip2") }}
        </div>
        <div class="tip">
          <div
            class="number mr-2 my-2 w-6 h-6 leading-6 text-center inline-block"
          >
            3
          </div>
          {{ $t("airplay.tip3") }}
          <br />
          <div class="ml-8 mt-2">{{ $t("airplay.tip4") }}</div>
        </div>
      </div>

      <div class="qrcode w-52">
        <div class="w-full" ref="qrcode" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { goDps } from "@/libs/native";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      qrcode: { src: "" },
      hotelWifi: "Titan",
    };
  },
  beforeDestroy() {
    this.$bus.off("onkey");
  },
  mounted() {
    goDps();
    const { qrcode } = this;
    window.goAirplay = (code) => {
      qrcode.show = true;
      new QRCode(this.$refs.qrcode, {
        width: (window.innerWidth / 100) * 15,
        height: (window.innerWidth / 100) * 15,
        text: code,
      });
    };
    this.$bus.on("onkey", (key) => {
      if (key === "back") {
        this.$router.back();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background: 100%/100% url("./images/bg-airplay.jpg");
}
.airplay-wrap {
  background: #e2e2e2;
}
.number {
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 50%;
  background: #fff;
}
</style>
