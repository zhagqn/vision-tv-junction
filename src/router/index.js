import Vue from "vue";
import VueRouter from "vue-router";
import Start from "@/views/start";
import Welcome from "@/views/welcome";
import Home from "@/views/home";
import TVPlayer from "@/views/tvplayer";
import Weather from "@/views/weather";
import InfoList from "@/views/info-list"
import InfoPage from "@/views/info-page"
import Setting from "@/views/setting"
import Airplay from "@/views/airplay"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Start" },
  },
  {
    path: "/index.html",
    name: "Start",
    component: Start,
  },
  {
    path: "/welcome.html",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/home.html",
    name: "Home",
    component: Home,
  },
  {
    path: "/tvplayer.html",
    name: "TVPlayer",
    component: TVPlayer,
  },
  {
    path: "/weather.html",
    name: "Weather",
    component: Weather,
  },
  {
    path: "/info-list.html",
    name: "InfoList",
    component: InfoList,
  },
  {
    path: "/info-page.html",
    name: "InfoPage",
    component: InfoPage,
  },
  {
    path: "/setting.html",
    name: "Setting",
    component: Setting
  },
  {
    path: "/airplay.html",
    name: "Airplay",
    component: Airplay
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
