<template>
  <div
    class="tvheader text-white fixed z-50 left-0 top-0 w-screen box-border py-10 px-14"
  >
    <div class="content flex items-center justify-between box-border">
      <div class="left h-16 flex items-center">
        <div class="logo flex items-center h-full justify-center">
          <img class="max-h-full" :src="logoSrc" />
        </div>
        <div class="line h-full mx-5"></div>
        <div class="message">
          <div>
            <span v-t="'component.header.welcome'"></span>
            &nbsp;
            <guest-name></guest-name>
          </div>
          <div>
            <span v-t="'component.header.room'"></span>
            &nbsp;
            <span>{{ roomId }}</span>
          </div>
        </div>
      </div>
      <div class="right leading-5 text-xl h-16 flex items-start">
        <div>{{ formattedDate }}</div>
        <div class="message" v-if="weather && weather.today">
          <i
            class="iconfont weather"
            :class="'icon-' + weather.today.weatid"
          ></i>
          <div>{{ weather.today.temperature_curr }}</div>
        </div>
        <div class="message">
          <i class="iconfont icon-time"></i>
          <div class="font">{{ formattedTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import guestName from "@/components/guest-name";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    guestName,
  },
  data() {
    return {
      formattedDate: "",
      formattedTime: "",
      formatInterval: -1,
    };
  },
  computed: {
    ...mapState({
      locale: (state) => state.app.locale,
      roomId: (state) => state.app.roomId,
      images: (state) => state.butler.images,
      homePage: (state) => state.butler.homePage,
      weather: (state) => state.butler.weather,
    }),
    logoSrc() {
      let { images, homePage } = this;
      if (images && homePage && homePage.logo) {
        return images[homePage.logo.internalImageId].internal_image_url;
      } else {
        return "";
      }
    },
  },
  async created() {
    await this.getImages();
    await this.getHomePage();
    await this.getWeather();
  },
  mounted() {
    this.formatDate();
    this.formatTime();
    this.formatInterval = setInterval(() => {
      this.formatDate();
      this.formatTime();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.formatInterval);
  },
  methods: {
    ...mapActions({
      getHomePage: "butler/getHomePage",
      getImages: "butler/getImages",
      getWeather: "butler/getWeather",
    }),
    formatDate() {
      let date = "";
      let { locale } = this;
      let datetime = new Date();
      if (datetime) {
        if (locale === "zh-cn") {
          date += `${datetime.getMonth() + 1}月${datetime.getDate()}日 `;
          date += ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
            datetime.getDay()
          ];
        } else {
          date += `${datetime.getMonth() + 1}/${datetime.getDate()} `;
          date += ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
            datetime.getDay()
          ];
        }
      }
      this.formattedDate = date;
    },
    formatTime() {
      let time = "";
      let datetime = new Date();
      if (datetime) {
        let hour = datetime.getHours();
        hour = hour > 9 ? hour : "0" + hour;
        let minute = datetime.getMinutes();
        minute = minute > 9 ? minute : "0" + minute;
        time = hour + ":" + minute;
      }
      this.formattedTime = time;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/skins/_index.scss";
.tvheader {
  @include color("component-header-color");
  .content {
    .left {
      .line {
        border-style: solid;
        border-width: 1px;
        @include color("component-header-color");
      }
      .message {
        font-size: 1.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    .right {
      align-items: flex-start;
      .message:nth-child(2) {
        margin: 0 1.75rem;
      }
      .message {
        display: flex;
        i.iconfont {
          @include color("component-header-color");
          font-size: 1.5rem;
          margin-right: 10px;
          &.weather {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
}
</style>
