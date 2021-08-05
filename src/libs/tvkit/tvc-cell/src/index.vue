<template>
  <div
    class="__tvc-cell"
    :focus="pFocus && focus"
    :class="pFocus && focus ? '__focus' : ''"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TvcCell",
  data() {
    return {
      x: 0,
      y: 0,
      focus: false,
    };
  },
  inject: ["parent"],
  computed: {
    pFocus() {
      return this.parent.focus;
    },
  },
};
</script>
