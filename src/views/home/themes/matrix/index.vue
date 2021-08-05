<template>
  <div class="w-screen h-screen">
    <background></background>
    <bg-image></bg-image>
    <tvheader></tvheader>
    <tvfooter></tvfooter>
    <tvc-panel
      v-if="homePage"
      ref="list"
      :focus="true"
      class="fixed top-36 left-14 right-14 bottom-24"
      :data="homePage.blocks"
      v-model="focusIndex"
      @ok="okHandler"
    >
      <template v-slot="{ item }">
        <tvc-cell
          class="absolute box-border"
          :style="{
            width: item.width + 'px',
            height: item.height + 'px',
            top: item.y + 'px',
            left: item.x + 'px',
          }"
        >
          <home-item :block="item" :images="images"></home-item>
        </tvc-cell>
      </template>
    </tvc-panel>
    <div v-if="qrcode.show" class="qrcode fixed top-0 left-0 w-64 h-64">
      <img class="w-full" :src="qrcode.src" alt="" />
    </div>
  </div>
</template>

<script>
import tvheader from "@/components/header";
import tvfooter from "@/components/footer";
import background from "@/components/background";
import bgImage from "@/components/background/bg-matrix";
import homeItem from "./home-item.vue";
import { mapActions, mapState } from "vuex";
import { getClientRect } from "@/libs/util";
import { openApp } from "@/libs/native";
import api from "@/api";

export default {
  components: {
    tvheader,
    tvfooter,
    background,
    bgImage,
    homeItem,
  },
  data() {
    return {
      row: 0,
      col: 0,
      focusIndex: 0,
      qrcode: { show: false, src: "" },
    };
  },
  async created() {
    const homeIndex = localStorage.getItem("vision:cache:homeIndex");
    if (homeIndex) {
      this.focusIndex = homeIndex;
      localStorage.setItem("vision:cache:homeIndex", "");
    }
    await this.getImages();
    await this.getHomePage();
  },
  watch: {
    homePage(homePage) {
      this.$nextTick(() => {
        let listRect = getClientRect(this.$refs.list.$el);
        this.col = Math.max(
          ...homePage.blocks.map((block) => block.x + block.width)
        );
        this.row = Math.max(
          ...homePage.blocks.map((block) => block.y + block.height)
        );
        let width = parseInt(listRect.width) / this.col;
        let height = parseInt(listRect.height) / this.row;
        homePage.blocks.forEach((block) => {
          block.x *= width;
          block.y *= height;
          block.width *= width;
          block.height *= height;
        });
      });
    },
  },
  mounted() {
    this.$bus.on("onkey", (key) => {
      if (key === "back") {
        this.$router.back();
      }
    });
  },
  beforeDestroy() {
    this.$bus.off("onkey");
  },
  computed: {
    ...mapState({
      images: (state) => state.butler.images,
      homePage: (state) => state.butler.homePage,
    }),
  },
  methods: {
    ...mapActions({
      getHomePage: "butler/getHomePage",
      getImages: "butler/getImages",
    }),
    async okHandler({ item, index }) {
      localStorage.setItem("vision:cache:homeIndex", index);
      if (item.langAgnosticId === "multi_screen") {
        this.goDps();
      } else if (item.langAgnosticId === "vod") {
        this.goVod();
      } else if (item.langAgnosticId === "music") {
        this.goMusic();
      } else if (item.langAgnosticId === "setting") {
        this.goSetting();
      } else if (item.langAgnosticId === "qrq") {
        this.goQrcode(item.pageId);
      } else if (item.infoListIds && item.infoListIds.length > 0) {
        item.infoList = await api.page.batch(item.infoListIds);
        if (item.infoList[0].subpage_type === "TV_CHANNEL") {
          this.goTVPlayer();
        } else if (item.infoList[0].subpage_type === "WEATHER") {
          this.goWeather();
        } else if (item.infoList[0].subpage_type === "INFO") {
          this.goInfo(item.id);
        }
      }
    },
    goTVPlayer() {
      this.$router.push("tvplayer.html");
    },
    goWeather() {
      this.$router.push("weather.html");
    },
    goInfo(id) {
      this.$router.push({ path: "info-list.html", query: { id } });
    },
    goSetting() {
      this.$router.push({ path: "setting.html" });
    },
    goDps() {
      this.$router.push({ path: "airplay.html" });
    },
    goQrcode(id) {
      this.$router.push({ path: "info-page.html", query: { id } });
    },
    goMusic() {
      openApp(
        "com.tencent.qqmusictv",
        "",
        "6.7.3.55",
        "https://hexsy.oss-cn-shanghai.aliyuncs.com/vision-tv-b-06051301.apk"
      );
    },
    goVod() {
      openApp(
        "com.js.litchi",
        "",
        "11.4.0.128755",
        "https://hexsy.oss-cn-shanghai.aliyuncs.com/vision-tv-b-06051301.apk"
      );
    },
  },
};
</script>
