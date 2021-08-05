<template>
  <div class="w-screen h-screen">
    <bg-image></bg-image>
    <tvheader></tvheader>
    <tvfooter></tvfooter>
    <div
      class="fixed text-white top-36 left-14 right-14 bottom-24 flex justify-between"
    >
      <tvc-panel
        :focus="focusPanel === 'menus'"
        v-model="menuIndex"
        class="info-menus overflow-hidden w-56 mr-2 text-xl"
        @blur="menuBlurHandler"
        @ok="enterMenuHandler"
        :data="infoLists"
      >
        <template v-slot="{ item, i }">
          <tvc-cell class="pl-8 py-4" :class="{ current: menuIndex === i }">
            {{ $t("title", item.translates) }}
          </tvc-cell>
        </template>
      </tvc-panel>
      <tvc-panel
        class="info-pages overflow-hidden flex-1 flex flex-wrap content-start p-4"
        :focus="focusPanel === 'pages'"
        :data="infoPages"
        @blur="pageBlurHandler"
        @ok="enterPageHandler"
      >
        <template v-slot="{ item }">
          <tvc-cell class="w-1/3 h-2/5 relative">
            <div class="info-page absolute">
              <img
                class="w-full h-full"
                v-if="images && item.logo && item.logo.internalImageId"
                v-lazy="images[item.logo.internalImageId].internal_image_url"
                alt=""
              />
              <div
                class="title-wrap absolute box-border w-full bottom-0 px-4 py-2 text-xl"
              >
                {{ $t("title", item.translates) }}
              </div>
            </div>
          </tvc-cell>
        </template>
      </tvc-panel>
    </div>
  </div>
</template>

<script>
import tvheader from "@/components/header";
import tvfooter from "@/components/footer";
import bgImage from "@/components/background/bg-matrix";
import api from "@/api";
import { mapActions, mapState } from "vuex";
export default {
  name: "InfoList",
  components: {
    tvheader,
    tvfooter,
    bgImage,
  },
  data() {
    return {
      infoLists: [],
      menuIndex: 0,
      focusPanel: "menus",
    };
  },
  computed: {
    ...mapState({
      images: (state) => state.butler.images,
    }),
    infoPages() {
      const { infoLists, menuIndex } = this;
      let infoPages = [];
      let infoList = infoLists[menuIndex] || {};
      infoPages = infoList.infoPages || [];
      return infoPages;
    },
  },
  async created() {
    const id = this.$route.query.id;
    const block = await api.page.get(id);
    this.infoLists = await api.page.batch(block.infoListIds);
    this.infoLists.forEach(async (infoList) => {
      let infoPages = await api.page.batch(infoList.infoPageIds);
      this.$set(infoList, "infoPages", infoPages);
    });
    await this.getImages();
  },
  mounted() {
    this.$bus.on("onkey", (key) => {
      if (key === "back") {
        if (this.focusPanel === "menus") {
          this.$router.back();
        } else {
          this.focusPanel = "menus";
        }
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
    enterMenuHandler() {
      this.focusPanel = "pages";
    },
    menuBlurHandler(d) {
      if (d == "right") {
        this.focusPanel = "pages";
      }
    },
    pageBlurHandler(d) {
      if (d == "left") {
        this.focusPanel = "menus";
      }
    },
    enterPageHandler({ item }) {
      this.$router.push({ path: "info-page.html", query: { id: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/skins/_index";
.info-menus {
  @include background_color("page-contain-background");
  .__tvc-cell.__focus {
    @include background_color("info-menus-focus-background");
    @include box_shadow("info-menus-focus-shadow");
  }
  .current {
    @include background_color("info-menus-blur-background");
  }
}
.info-pages {
  @include background_color("page-contain-background");
  .info-page {
    width: 16.1rem;
    height: 9.2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title-wrap {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    }
  }
  .__tvc-cell.__focus {
    .info-page {
      width: 16.8rem;
      height: 9.6rem;
      @include border("info-pages-focus-border");
      @include box_shadow("info-pages-focus-shadow");
    }
  }
}
</style>
