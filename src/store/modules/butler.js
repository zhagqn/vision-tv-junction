import api from "@/api";

export default {
  namespaced: true,
  state: () => ({
    startPage: null,
    welcomePage: null,
    homePage: null,
    weather: null,
    images: [],
    guestProfiles: [],
    channels: []
  }),
  mutations: {
    SET_STARTPAGE(state, startPage) {
      state.startPage = startPage;
    },
    SET_WELCOMEPAGE(state, welcomePage) {
      state.welcomePage = welcomePage;
    },
    SET_HOMEPAGE(state, homePage) {
      state.homePage = homePage;
    },
    SET_WEATHER(state, weather) {
      state.weather = weather;
    },
    SET_IMAGES(state, images) {
      state.images = images;
    },
    SET_GUESTPROFILES(state, guestProfiles) {
      state.guestProfiles = guestProfiles;
    },
    SET_CHANNELS(state, channels) {
      state.channels = channels;
    }
  },
  actions: {
    async getStartPage({ state, commit }) {
      if (!state.startPage) {
        const res = await api.page.butler_startpage();
        const logoId = res?.startup?.logo?.internalImageId;
        if (logoId) {
          const imageObj = await api.image.get(logoId);
          res.logoUrl = imageObj.internal_image_url;
        }
        commit("SET_STARTPAGE", res);
      }
    },
    async getWelcomePage({ state, commit }) {
      if (!state.welcomePage) {
        const res = await api.page.butler_welcomepage();
        const logoId = res?.welcome?.logo?.internalImageId;
        const bgId = res?.welcome?.backgroundImage?.internalImageId;
        const imageIds = [];
        if (logoId) imageIds.push(logoId);
        if (bgId) imageIds.push(bgId);
        if (imageIds.length > 0) {
          const imagesObj = await api.image.batch(imageIds);
          if (logoId) res.logoUrl = imagesObj[logoId]?.internal_image_url;
          if (bgId) res.bgUrl = imagesObj[bgId]?.internal_image_url;
        }
        commit("SET_WELCOMEPAGE", res);
      }
    },
    async getHomePage({ state, commit }) {
      if (!state.homePage) {
        const res = await api.page.butler_homepage();
        let homePage = res.homepage;
        const pagesRes = await api.page.batch(homePage.blocks.map(it => it.pageId))
        for (let i = 0; i < homePage.blocks.length; i++) {
          let block = homePage.blocks[i];
          Object.assign(block, pagesRes[i])
          block.x = block.x | 0;
          block.y = block.y | 0;
        }
        commit("SET_HOMEPAGE", homePage)
      }
    },
    async getWeather({ state, commit }) {
      if (!state.weather) {
        const res = await api.page.search("local_weather", "info_page");
        let weather = res.weather_data;
        weather.translates = res.translates;
        weather.city = res.weather;
        commit('SET_WEATHER', weather);
      }
    },
    async getImages({ state, commit }) {
      if (state.images.length === 0) {
        const res = await api.image.get();
        commit("SET_IMAGES", res);
      }
    },
    async getGuestProfiles({ commit }) {
      const res = await api.hotel.guest_profile()
      commit("SET_GUESTPROFILES", res)
    },
    async getChannels({ commit }) {
      const res = await api.page.butler_tv_channels()
      commit("SET_CHANNELS", res)
    }
  },
};
