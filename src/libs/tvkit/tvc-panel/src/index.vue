<template>
  <div class="__tvc-panel" :class="focus ? '__focus' : ''">
    <template v-for="(item, i) in data">
      <slot v-bind:i="i" v-bind:item="item"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: "TvcPanel",
  props: {
    focus: {
      default: false,
    },
    value: {
      default: 0,
    },
    data: {
      type: Array,
    },
  },
  provide() {
    return {
      parent: this,
    };
  },
  data() {
    return {
      children: [], // 子元素
      focusIndex: this.value, // 焦点index
    };
  },
  mounted() {
    // 根据方向按键
    this.$bus.on("onkey", (key) => {
      const { focusIndex, data } = this;
      if (this.focus) {
        if (["up", "down", "left", "right"].indexOf(key) !== -1) {
          this.move(key);
        } else if (key === "enter") {
          this.$emit("ok", { item: data[focusIndex], index: focusIndex });
        } else if (key === "back") {
          this.$emit("back", { item: data[focusIndex], index: focusIndex });
        }
      }
    });
  },
  beforeDestroy() {
    this.$bus.off("onkey");
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler() {
        // 定位子元素
        this.indexChildren();
      },
    },
    value: {
      handler(nv) {
        this.focusIndex = nv;
        this.indexChildren();
      },
    },
    focus: {
      handler(nv) {
        if (nv) this.indexChildren();
      },
    },
  },
  methods: {
    // 定位子元素
    indexChildren() {
      const { focusIndex } = this;
      this.$nextTick(() => {
        // 筛选出 tvc-cell
        const children = this.$children.filter(
          (it) => it.$options.name === "TvcCell"
        );
        this.children = children;
        // 获取父节点位置
        const parentRect = this.$el.getBoundingClientRect();
        // 遍历子元素位置，保存子元素相对父节点位置
        children.forEach((child) => {
          const childRect = child.$el.getBoundingClientRect();
          child.x = childRect.x - parentRect.x;
          child.y = childRect.y - parentRect.y;
          child.focus = false;
        });
        if (this.focus) {
          if (children[focusIndex]) {
            children[focusIndex].focus = true;
          } else if (children[0]) {
            this.focusIndex = 0;
            children[0].focus = true;
          }
        }
      });
    },
    // 根据方向移动焦点
    move(direct) {
      const { children, focusIndex } = this;
      const currentChild = children[focusIndex];
      let minDis = -1;
      let minDisX = 1000000;
      let minDisY = 1000000;
      let minIndex = -1;
      // 遍历元素，判断方向上最近距离元素
      children.forEach((child, i) => {
        if (child === currentChild) return;
        const disX = child.x - currentChild.x; // x轴距离
        const disY = child.y - currentChild.y; // y轴距离
        const dis = Math.sqrt(disX * disX + disY * disY); // 直线距离
        if (dis < minDis || minDis === -1) {
          const absY = Math.abs(disY);
          const absX = Math.abs(disX);
          if (
            (direct == "left" && disX < 0 && absY <= minDisY) || // 靠左
            (direct == "right" && disX > 0 && absY <= minDisY) || // 靠右
            (direct == "up" && disY < 0 && absX <= minDisX) || // 靠上
            (direct == "down" && disY > 0 && absX <= minDisX) // 靠下
          ) {
            minDisY = absY;
            minDisX = absX;
            minDis = dis;
            minIndex = i;
          }
        }
      });
      this.$nextTick(() => {
        if (minIndex >= 0) {
          // 方向上有可移动元素，则继续移动焦点
          this.focusIndex = minIndex;
          children[minIndex].focus = true;
          currentChild.focus = false;
          children[minIndex].$el.scrollIntoViewIfNeeded();
          this.$emit("change", {
            index: this.focusIndex,
            item: this.data[this.focusIndex],
          });
          this.$emit("input", this.focusIndex);
        } else {
          // 方向上无可移动元素，则进行边缘判断
          this.$emit("blur", direct);
        }
      });
    },
  },
};
</script>
