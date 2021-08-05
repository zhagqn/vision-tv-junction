<template>
  <div class="w-screen h-screen">
    <bg-image></bg-image>
    <tvheader></tvheader>
    <tvfooter></tvfooter>
    <div
      v-if="page"
      class="page-wrap fixed flex justify-between top-36 left-14 right-14 bottom-24 box-border p-4"
    >
      <div class="slide w-1/2">
        <vueper-slides
          :autoplay="page.info.images > 1"
          v-if="page.info && images"
          class="w-full no-shadow"
          :arrows="false"
          :bullets="false"
          fixed-height="20.3rem"
        >
          <template v-for="(image, i) in page.info.images">
            <vueper-slide
              v-if="images[image.internalImageId]"
              :key="i"
              :image="images[image.internalImageId].internal_image_url"
            >
            </vueper-slide>
          </template>
        </vueper-slides>
      </div>
      <div class="info w-1/2 h-full text-white box-border px-6">
        <div class="text-3xl mb-4">
          {{ $t("title", page.translates) }}
        </div>
        <div
          ref="content"
          class="text-base h-5/6 leading-8 overflow-hidden"
          v-html="$t('description', page.translates)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import tvheader from "@/components/header";
import tvfooter from "@/components/footer";
import bgImage from "@/components/background/bg-matrix";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import api from "@/api";
import { mapActions, mapState } from "vuex";
export default {
  name: "InfoPage",
  components: {
    tvheader,
    tvfooter,
    bgImage,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      page: null,
    };
  },
  computed: {
    ...mapState({
      images: (state) => state.butler.images,
    }),
  },
  async created() {
    const id = this.$route.query.id;
    const page = await api.page.get(id);
    this.page = page;
    await this.getImages();
  },
  mounted() {
    this.$bus.on("onkey", (key) => {
      if (key === "back") {
        this.$router.back();
      }
      if (["up", "down"].indexOf(key) !== -1) {
        this.scrollText(key);
      }
    });
  },
  beforeDestroy() {
    this.$bus.off("onkey");
  },
  methods: {
    ...mapActions({
      getImages: "butler/getImages",
    }),
    // 文字滚动效果
    scrollText(direct) {
      let contentEl = this.$refs.content;

      if (direct === "up") {
        contentEl.scrollTop -= 60;
      } else if (direct === "down") {
        contentEl.scrollTop += 60;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/skins/_index";
.page-wrap {
  @include background_color("page-contain-background");
}
</style>
