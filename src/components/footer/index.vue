<template>
  <div
    class="footer text-white fixed z-50 left-1/4 right-1/4 bottom-7 flex h-10 items-center justify-between px-24"
  >
    <span class="flex items-center">
      <i class="iconfont icon-triangle-up"></i>
      <i class="iconfont icon-triangle-down"></i>
      <i class="iconfont icon-triangle-left"></i>
      <i class="iconfont icon-triangle-right"></i>
      <span class="ml-4" v-t="'component.footer.select'"></span>
    </span>
    <span class="flex items-center">
      <div class="icon-wrap flex items-center justify-center w-9 h-9">
        <i class="iconfont icon-back"></i>
      </div>
      <span class="ml-4" v-t="'component.footer.back'"></span>
    </span>
    <span class="flex items-center">
      <div class="icon-wrap flex justify-center items-center w-9 h-9">
        <i class="iconfont icon-ok"></i>
      </div>
      <span class="ml-4" v-t="'component.footer.ok'"></span>
    </span>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/styles/skins/_index.scss";
.footer {
  @include color("component-header-color");
  font-size: 1.25rem;
  i.iconfont {
    font-size: 1.6rem;
  }
  .icon-wrap {
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    .iconfont {
      color: #fff;
    }
  }
}
</style>
