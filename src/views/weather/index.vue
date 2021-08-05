<template>
  <div class="w-full h-full">
    <bg-image></bg-image>
    <tvheader></tvheader>
    <tvfooter></tvfooter>
    <div
      class="weather-wrap flex justify-between items-center text-white fixed top-36 left-14 right-14 bottom-24"
    >
      <div
        class="weather-item flex-1 text-center mt-16"
        :key="i"
        :class="{ today: i === 0 }"
        v-for="(it, i) in future"
      >
        <div>
          <div class="text-2xl">{{ it.formattedDay }}</div>
          <div class="text-xl my-4">{{ it.formattedDate }}</div>
        </div>
        <div class="my-8">
          <i class="iconfont" :class="'icon-' + it.weatid"></i>
        </div>
        <div>
          <div class="my-4">{{ it.weather }}</div>
          <div class="my-6 text-2xl">{{ it.temp_low }}~{{ it.temp_high }}℃</div>
        </div>
      </div>
      <div class="text-2xl absolute top-10 left-10">
        <i class="iconfont text-2xl icon-location"></i>
        {{ city }}
      </div>
    </div>
  </div>
</template>

<script>
import tvheader from "@/components/header";
import tvfooter from "@/components/footer";
import bgImage from "@/components/background/bg-matrix";
import citys from "@/assets/json/city.json";
import days from "@/assets/json/day.json";
import { mapActions, mapState } from "vuex";
export default {
  name: "Weather",
  components: {
    tvheader,
    tvfooter,
    bgImage,
  },
  computed: {
    ...mapState({
      weather: (state) => state.butler.weather,
      locale: (state) => state.app.locale,
    }),
    city() {
      let { weather, locale } = this;
      if (weather && locale) {
        return citys[weather.city.countryCode][weather.city.cityId][locale];
      }
      return "";
    },
    today() {
      const { locale, weather } = this;
      let today = {};
      if (weather) {
        today = weather.today;
        let date = new Date(today.days);
        today.formattedDate = date.getMonth() + 1 + "/" + date.getDate();
        today.formattedDay = days[locale][date.getDay()];
      }
      return today;
    },
    future() {
      let future = [];
      const { weather, locale } = this;
      if (weather) {
        future = weather.future;
        future.forEach((it) => {
          let date = new Date(it.days);
          it.formattedDay = days[locale][date.getDay()];
          it.formattedDate = date.getMonth() + 1 + "/" + date.getDate();
        });
      }
      return future;
    },
  },
  async created() {
    await this.getWeather();
  },
  mounted() {
    // 按键事件
    this.$bus.on("onkey", (key) => {
      if (key === "back") this.$router.back();
    });
  },
  beforeDestroy() {
    this.$bus.off("onkey");
  },
  methods: {
    ...mapActions({
      getWeather: "butler/getWeather",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/skins/_index";
.weather-wrap {
  @include background_color("page-contain-background");
}
.iconfont {
  @include color("weather-iconfont-color");
}
.weather-item {
  &:not(.today) {
    border-left: 1px solid rgba(255, 255, 255, 0.5);
  }
  .iconfont {
    font-size: 4.5rem;
  }
}
</style>
