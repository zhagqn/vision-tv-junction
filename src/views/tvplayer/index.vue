<template>
  <div class="tvplayer relative w-full h-full">
    <video
      v-if="platform === 'PC'"
      muted="muted"
      ref="player"
      class="player z-10 absolute w-full h-full"
    ></video>
    <div
      class="absolute z-20 right-0 top-0 channels-wrap h-full w-1/4"
      :class="{ show: listVisible }"
    >
      <tvc-panel
        class="channels"
        @change="changeHandler"
        :data="channels"
        :focus="true"
      >
        <template v-slot="{ item }">
          <tvc-cell>
            <div class="channel my-3 py-3 pl-10">
              <div class="w-8 inline-block">
                {{ item.tvChannel.number }}
              </div>
              {{ $t("title", item.translates) }}
            </div>
          </tvc-cell>
        </template>
      </tvc-panel>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { startVideo, stopVideo } from "@/libs/native";
import Hls from "hls.js";
import native from "@/libs/native";

export default {
  name: "TVPlayer",
  data() {
    return {
      hls: null,
      player: null,
      listVisible: true,
      timeoutVisible: -1,
      platform: "PC",
    };
  },
  computed: {
    ...mapState({
      channels: (state) => state.butler.channels,
    }),
  },
  async created() {
    await this.getChannels();
    this.play();
  },
  mounted() {
    this.platform = native.getPlatform();
    this.initPlayer();
    this.switchVisible();
    // 按键事件
    this.$bus.on("onkey", (key) => {
      if (key === "back") this.$router.back();
      else {
        this.switchVisible();
      }
    });
  },
  beforeDestroy() {
    stopVideo();
    this.$bus.off("onkey");
    this.player.pause();
    this.hls.stopLoad();
  },
  methods: {
    ...mapActions({
      getChannels: "butler/getChannels",
    }),
    initPlayer() {
      if (this.platform !== "android") {
        this.player = this.$refs["player"];
        if (Hls.isSupported()) {
          this.hls = new Hls();
        }
      }
    },
    loadPlayer(src) {
      this.hls.loadSource(
        src.replace(
          /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?\//,
          "http://localhost/"
        )
      );
      this.hls.attachMedia(this.player);
      this.player.play();
    },
    changeHandler({ index }) {
      this.play(index);
    },
    play(index = 0) {
      const { channels } = this;
      if (channels && channels[index]) {
        const channel = channels[index];
        stopVideo();
        if (channel.tvChannel.url) startVideo(channel.tvChannel.url);
        if (native.getPlatform() === "PC") {
          this.loadPlayer(channel.tvChannel.url);
        }
      }
    },
    switchVisible() {
      this.listVisible = true;
      clearTimeout(this.timeoutVisible);
      this.timeoutVisible = setTimeout(() => {
        this.listVisible = false;
      }, 5000);
    },
  },
};
</script>

<style lang="scss" scoped>
.channels-wrap {
  padding: 4rem 0;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.5s;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
  &.show {
    opacity: 1;
  }
}
.channels {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.channel {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.4);
  .__tvc-cell.__focus & {
    color: #fff;
    font-size: 2.25rem;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.1)
    );
  }
}
</style>
