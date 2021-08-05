<template>
  <span v-if="guestProfiles && guestProfiles.length > 0">
    <template v-if="locale === 'zh-cn'">
      {{ guestProfiles[0].last_name }}{{ guestProfiles[0].first_name }}
    </template>
    <template v-else>
      {{ guestProfiles[0].first_name }}
      {{ guestProfiles[0].last_name }}
    </template>
  </span>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["guestProfiles", "locale"]),
  },
  async created() {
    await this.getGuestProfiles();
  },
  methods: {
    ...mapActions({
      getGuestProfiles: "butler/getGuestProfiles",
    }),
  },
};
</script>
