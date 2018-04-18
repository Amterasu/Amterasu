<template>
  <header>
    <nav>
      <input type="hidden" id="lanage" value="zh">
      <div class="logo">
        <router-link to="/" tag="span">Amterasu</router-link>
      </div>
      <div class="menu">
        <div class="menu-box">
          <ul class="menu-list-content">
            <router-link active-class="current" to="/index" tag="li">
              <span class="menu-list-box">首页</span>
            </router-link>
            <router-link active-class="current" to="/write" tag="li">
              <span class="menu-list-box">写作</span>
            </router-link>
            <!-- <router-link active-class="current" to="/classlist" tag="li"><span class="menu-list-box">分类</span></router-link> -->
            <router-link active-class="current" to="/collect" tag="li">
              <span class="menu-list-box">收藏</span>
            </router-link>
            <router-link active-class="current" to="/demo" tag="li">
              <span class="menu-list-box">Demo</span>
            </router-link>
            <router-link active-class="current" to="/about" tag="li">
              <span class="menu-list-box">About</span>
            </router-link>
            <router-link active-class="current" to="/resume" tag="li">
              <span class="menu-list-box">在线简历</span>
            </router-link>
          </ul>
          <div class="user-center user-center-unlogin">
            <ul class="unlogin" v-if="!loginStatus">
              <li>
                <router-link :to="{ path: '/login', query: { backurl: $route.path }}" tag="span">登录</router-link>
                <!-- <i></i> -->
                <!-- <router-link to="/login" tag="span">注册</router-link> -->
              </li>
            </ul>
            <ul class="unlogin" v-if="loginStatus">
              <li>
                <span href="javascript:void(0)">admin</span>
                <i></i>
                <span href="javascript:void(0)" @click="logout">退出登录</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { notice } from "../../../static/js/common";
import api from "../../api/api";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "mHeader",
  data() {
    return {
      tagArr: []
    };
  },
  computed: {
    ...mapState("checkUser", ["loginStatus"])
  },
  beforeRouteEnter(to, from, next) {
    this.GET_LOGIN_STATUS();
    next();
  },
  created() {
    this.GET_LOGIN_STATUS();
  },
  methods: {
    ...mapActions("checkUser", ["GET_LOGIN_STATUS"]),
    async logout() {
      let that = this;
      let logout = await api.logout();
      if (logout.data.code == 1) {
        notice.success(logout.data.msg);
        that.GET_LOGIN_STATUS();
        this.$router.push("/login");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  font-size: 20px;
}
header {
  width: 100%;
  height: 56px;
  background: #ffd100;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
}

header nav {
  height: 56px;
  margin: 0 70px;
  position: relative;
}

header nav .logo {
  position: absolute;
  top: 12px;
  left: 0;
}

header nav .return-to-old {
  font-size: 12px;
  margin-left: 13px;
  float: right;
  margin-top: 4px;
}

header nav .menu {
  height: 56px;
  margin: 0 auto;
}

header nav .menu [placeholder],
header nav .menu input[placeholder] {
  color: #444 !important;
}

header nav .menu .menu-box {
  text-align: center;
}

header nav .menu .menu-box > ul.menu-list-content {
  height: 56px;
  margin: 0 auto;
  display: inline-block;
}

header nav .menu .menu-box > ul.menu-list-content li {
  float: left;
  cursor: pointer;
  height: 56px;
  line-height: 56px;
  text-align: start;
  text-align: left;
}

header nav .menu .menu-box > ul.menu-list-content li span.menu-list-box {
  display: inline-block;
  padding: 0 24px;
}

header nav .menu .menu-box > ul.menu-list-content li span.menu-tit-box {
  padding: 0 20px;
}

header nav .menu .menu-box > ul.menu-list-content li:hover {
  background: #282828;
  color: #ffd100;
}

header
  nav
  .menu
  .menu-box
  > ul.menu-list-content
  li.current
  span.menu-list-box {
  font-weight: 600;
}
header nav .menu .menu-box > ul.menu-list-content li.current {
  border-bottom: 2px solid #fff;
}

header nav .menu .discover {
  position: relative;
  cursor: pointer;
}

header nav .menu .discover:hover {
  background: #444;
  color: #ffd100;
}

header nav .menu .discover:hover .menu-list {
  display: block;
}

header nav .menu .discover .discover-box {
  width: 664px;
  padding: 0;
  left: 0;
}

header nav .menu .discover .discover-box .discover-box-list {
  border-bottom: 1px solid #eaeaea;
  line-height: 0;
  overflow: hidden;
  padding: 11px 17px 17px;
}

header nav .menu .discover .discover-box .discover-box-list div {
  float: left;
  width: 90px;
  height: 28px;
  line-height: 28px;
  position: relative;
  margin-top: 4px;
  text-align: center;
}

header nav .user-center .login,
header nav .user-center .unlogin {
  float: right;
}
header nav .user-center .login {
  height: 56px;
  line-height: 56px;
  font-size: 20px;
}
header nav .menu .discover .discover-box .discover-box-list a {
  display: inline-block;
  min-width: 42px;
  height: 28px;
  line-height: 28px;
  padding: 0 7px;
  text-align: center;
  position: relative;
  margin: 0 6px;
  border-radius: 4px;
}

header nav .menu .discover .discover-box .discover-box-list a:hover {
  background: #ffd100;
  color: #444;
}

header nav .menu .discover .discover-box .discover-check-all {
  padding: 0 30px;
  line-height: 51px;
}

header nav .menu .discover .discover-box .discover-check-all a {
  margin-right: 40px;
  color: #444;
  padding-right: 15px;
  /* background: url(../images/svg/gengduojiantou.svg) right no-repeat; */
  background-size: 10px 10px;
}

header nav .menu .discover .discover-box .discover-check-all a:hover {
  color: #d36f16;
  background-size: 10px 10px;
}

header nav .menu .discover .discover-box i {
  display: inline-block;
  width: 1px;
  height: 14px;
  background: #ddd;
  position: absolute;
  top: 5px;
  right: 0;
}

header nav .menu .discover .discover-box a i:not(:last-child) {
  width: 0;
}

header nav .menu .header-menu-withmore {
  position: relative;
  cursor: pointer;
}

header nav .menu .header-menu-withmore:hover {
  background: #444;
  color: #ffd100;
}

header nav .menu-list,
header nav .user-center .menu-list {
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0 0 4px 4px;
  color: #444;
  z-index: 14;
}

header nav .menu .header-menu-withmore:hover .menu-list {
  display: block;
}

header nav .menu .header-menu-withmore p a {
  width: 152px;
  padding-left: 20px;
}

header nav .menu .more-menu {
  position: relative;
  cursor: pointer;
}

header nav .menu .more-menu .menu-list p a {
  width: 152px;
  position: relative;
}

header nav .menu .more-menu i {
  display: inline-block;
  background-repeat: no-repeat;
  background-position: left center;
  width: 20px;
  height: 56px;
}

header nav .menu .more-menu:hover i {
  width: 20px;
  height: 56px;
}

header nav .menu .more-menu:hover .menu-list {
  display: block;
}

header nav .menu .menu-list {
  left: 0;
}

header nav .menu-list {
  width: 152px;
  padding: 6px 0;
  position: absolute;
  background: #fff;
  top: 56px;
}

header nav .menu-list p {
  height: 44px;
  line-height: 44px;
  cursor: pointer;
}

header nav .menu-list p:hover {
  background: #ffd100;
}

header nav .menu-list p a {
  width: 100%;
  padding-left: 20px;
  display: inline-block;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

header nav .menu-list sup.subnav-dot-sup {
  top: 12px;
}
header nav .user-center {
  width: 192px;
  height: 56px;
  position: absolute;
  top: 0;
  right: 0;
}
header nav .user-center .login,
header nav .user-center .unlogin {
  float: right;
  -webkit-margin-before: 0;
}
header nav .user-center .unlogin li {
  line-height: 60px;
}

header nav .user-center .unlogin a,
header nav .user-center .unlogin span {
  margin-left: 20px;
  padding: 0;
  cursor: pointer;
}

header nav .user-center .unlogin i {
  display: inline-block;
  width: 1px;
  height: 10px;
  background: #444;
  margin-left: 20px;
}
</style>
