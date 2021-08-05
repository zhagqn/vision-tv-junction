<template>
  <div
    class="register text-white box-border h-screen w-screen pt-32 flex flex-col items-center"
  >
    <div class="text-2xl w-1/4 flex justify-between">
      <span>{{ $t("component.register.tip") }}</span>
      <span class="text-2xl">{{ deviceId }}</span>
    </div>
    <div class="w-1/4">
      <input
        class="input text-xl box-border text-center mt-14 w-full h-4 p-5"
        tabindex="0"
        :placeholder="$t('component.register.roomNum')"
        ref="roomNum"
        type="text"
        v-model="roomNum"
      />
      <input
        class="input text-xl box-border text-center mt-10 w-full h-4 p-5"
        tabindex="1"
        :placeholder="$t('component.register.verifyCode')"
        ref="verifyCode"
        type="text"
        v-model="verifyCode"
      />

      <button
        tabindex="2"
        class="mt-10 button font-bold text-xl w-full h-10"
        @click="confirm"
      >
        {{ $t("component.register.confirm") }}
      </button>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      roomNum: "",
      verifyCode: "",
    };
  },
  computed: {
    ...mapState({
      deviceId: (state) => state.app.deviceId,
    }),
  },
  mounted() {
    this.$refs.roomNum.focus();
  },
  methods: {
    async confirm() {
      try {
        let { roomNum, verifyCode } = this;
        await api.device.register(roomNum, verifyCode);
        this.$emit("confirm");
      } catch (error) {
        alert(this.$t("component.register.error"));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  background: rgb(17, 24, 39);
  @apply;
  .input {
    @apply placeholder-gray-50 rounded focus:shadow-lg focus:ring-4 focus:ring-offset-4 focus:ring-offset-gray-900 focus:ring-green-500 outline-none bg-gray-500;
  }
  .button {
    @apply text-gray-900 rounded focus:shadow-lg focus:ring-4 focus:outline-none focus:bg-gray-200 focus:ring-offset-4 focus:ring-offset-gray-900 focus:ring-green-500 outline-none  bg-gray-300;
  }
}
</style>
