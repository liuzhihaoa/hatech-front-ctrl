<template>
  <hatech-layout
    ref="layout"
    :menus="MENUS"
    :currPage="CURRPAGE"
    :user="USER"
    :userMenus="userMenus"
    :headerMenus="headerMenus"
    @onEvent="onEvent"
  >
    <div slot="header_left" class="logo"></div>
    <slot v-show="!isMicro" slot="content">
      <router-view></router-view>
    </slot>
    <div class="content" v-show="isMicro" slot="content" v-loading="LOADING">
      <div id="container">
      </div>
    </div>
  </hatech-layout>
</template>

<script>
// 使用布局
import { HatechLayout } from "hatech-web-layout-husmc";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    HatechLayout,
  },
  computed: {
    ...mapGetters("app", ["CURRPAGE", "MENUS", "USER", "LOADING"]),
    // 判断当前路由决定展示内容容器
    isMicro() {
      return !!this.CURRPAGE.meta.microPath
    }
  },
  watch: {
    LOADING(newVal) {
      console.log('main.vue loading :', newVal)
    }
  },
  data() {
    return {
      // 点击用户菜单信息
      userMenus: [
        { event: "onChangePassWord", name: "修改密码" },
        { event: "onLogout", name: "注销" },
      ],
      headerMenus: [
        {
          show: true,
          type: "dropdown",
          name: "主题",
          icon: "zhuti",
          code: "theme",
          props: {
            options: this.$theme.themes.map((theme) => ({
              name: theme.name,
              command: theme.key,
            })),
          },
        },
      ],
    };
  },
  methods: {
    ...mapMutations("app", ["Logout"]),
    onEvent(args = {}) {
      const { event, params } = args;
      this[event] && this[event](params);
      console.log(args);
    },
    /**
     * 点击主菜单
     */
    onClickMainMenu({ menu, collapse }) {
      this.currMenu = menu;
      this.showSider = collapse;
      this.$router.push({
        path: menu.path,
      });
    },
    /**
     * 点击菜单
     */
    onClickMenu({ code } = {}) {
      const menu = this.$utils.tree.deepGet(this.MENUS, code, "code");
      if (menu && menu.path) {
        if (this.isMicro) {
          this.$store.commit('app/save', {
            loading: true
          })
        }
        this.$router.push({
          path: menu.path
        });
      }
    },
    /**
     * 头部下拉菜单功能事件回调
     */
    onDropdownEvent(args) {
      const { menu, event, params } = args;
      if (event === "onClickMenu" && menu.code === "theme") {
        const theme = this.$theme.themes.find((t) => t.key === params);
        if (theme) {
          this.$theme.change(theme);
          this.$message.success("主题切换成功");
        }
      }
    },
    /**
     * 头部事件处理，退出登录
     */
    onLogout() {
      this.Logout();
      this.$router.replace({
        name: "login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/logo_istorm.png") no-repeat;
  background-size: 100% 100%;
}
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
#container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>