<template>
  <div class="login-page">
    <hatech-screen v-if="showScreen" :shapeNum="300" @onClick="onClickScreen"></hatech-screen>
    <hatech-login @login="onLogin">
      <template slot="title">
        <p>Hatech Micro APP System</p>
      </template>
      <template slot="sub-title">
        <span />
      </template>
    </hatech-login>
  </div>
</template>

<script>
import { HatechScreen } from "hatech-web-component-screen";
import { HatechLogin } from "hatech-web-component-login";
import { mapActions } from "vuex";

export default {
  components: { HatechLogin, HatechScreen },
  data() {
    return {
      showScreen: true,
    };
  },
  methods: {
    ...mapActions("app", ["Login"]),
    /**
     * 登录
     */
    async onLogin(params) {
      const response = await this.Login({
        params,
      });
      if (response && response.success) {
        this.$message.success(response.msg);
        this.$router.push({
          name: "homepage",
        });
      }
    },
    onClickScreen() {
      this.showScreen = false;
    },
  },
};
</script>

<style lang="scss">
// .login-screen {
//   position: fixed;
//   z-index: 1000;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
// }
</style>