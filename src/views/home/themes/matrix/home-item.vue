<template>
  <div class="home-item-wrap w-full h-full box-border">
    <div
      :style="{ backgroundImage: `url('${bgImg}')` }"
      class="home-item bg-cover box-border text-center w-full h-full relative"
    >
      <div
        :style="titlePos"
        class="title absolute w-full text-center text-white"
        v-if="block && block.translates"
      >
        {{ $t(`title`, block.translates) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["block", "images"],
  computed: {
    bgImg() {
      let { images, block } = this;
      let img = "";
      if (images && block && block.backgroundImages) {
        img =
          images[block.backgroundImages[0].internalImageId].internal_image_url;
      }
      return img;
    },
    titlePos() {
      let { block } = this;
      let style = {
        fontSize: 1 + (block.width + block.height - 200) / 1080 + "rem",
      };
      if (block && block.titleAlignment) {
        if (block.titleAlignment === "MIDDLE") {
          Object.assign(style, {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          });
        } else if (block.titleAlignment === "BOTTOM") {
          Object.assign(style, {
            bottom: "6%",
            left: "50%",
            transform: "translate(-50%, 0)",
          });
        }
      }
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/skins/_index.scss";

.home-item-wrap {
  padding: 0.5rem;
  .home-item {
    .title {
      text-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.7);
    }
  }
  .__tvc-cell.__focus & {
    padding: 0.1rem;
    .home-item {
      @include border("home-items-focus-border");
      @include box_shadow("home-items-focus-shadow");
    }
  }
}
</style>
