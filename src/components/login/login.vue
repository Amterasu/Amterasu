<template>
  <div class="login-content">
    <div class="pass-header-wrap">
      <div class="login-passcard-nav">
        <router-link to="/" tag="a">Amterasu</router-link>
      </div>

    </div>
    <div class="login-box module-l-static" id="login-box">
      <div class="login-switch">
        <div class="icon-l static-l"></div>
        <div class="icon-l quick-l"></div>
      </div>
      <div class="l-static">
        <div class="l-tab-covers">
          <div class="l-tab-list current">密码登录</div>
        </div>
        <div class="static-module-covers">
          <div class="pass-login-covers" :style="$vuerify.invalid && !$vuerify.invalid ? 'margin-top:65px' :' '">
            <div class="error-tips">
              <span class="ipt-tips-default ipt-default-current" v-show="$vuerify.invalid && !$vuerify.invalid && !severError">
                <i class="el-icon-error"></i>{{formError.username}}
              </span>
              <span class="ipt-tips-default ipt-default-current" v-show="severError">
                <i class="el-icon-error"></i>账号或密码错误，请重试
              </span>
            </div>
            <div class="email">
              <input type="text" v-model="username" placeholder="账号" autocomplete="off" maxlength="32" class="text-style ipt-default-current">
            </div>
            <div class="password">
              <input type="password" v-model="password" placeholder="密码" maxlength="40" autocomplete="off" class="text-style ipt-default-current">
            </div>
            <div>
              <div id="captcha">
                <p id="wait" class="show" v-show="captchaStatus == false">正在加载验证码......</p>
              </div>
            </div>
            <div class="login">
              <el-button type="primary" style="width:100%" @click="login" :loading="loading">登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { post, get, notice } from "../../../static/js/common";
import api from "../../api/api";

export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      severError: false,
      captchaStatus: null
    };
  },
  methods: {
    login() {
      if (this.$vuerify.check()) {
        var result = this.captchaObj.getValidate();
        if (!result) {
          return notice.warning("请完成验证");
        }
        let params = {
          username: this.username,
          password: this.password,
          geetest_challenge: result.geetest_challenge,
          geetest_validate: result.geetest_validate,
          geetest_seccode: result.geetest_seccode
        };
        let that = this;
        this.loading = true;
        api.login(params, res => {
          if (res.data.code === 0) {
            that.severError = true;
            this.loading = false;
          } else {
            that.severError = false;
            that.$store.dispatch("getLoginStatus");
            if (this.$route.query && this.$route.query.backurl) {
              this.$router.push(this.$route.query.backurl);
            } else {
              this.$router.push("/index");
            }
          }
        });
      }
    },
    handler(captchaObj) {
      captchaObj.appendTo("#captcha");
      this.captchaObj = captchaObj;
      // 更多接口说明请参见：http://docs.geetest.com/install/client/web-front/
    }
  },
  vuerify: {
    username: {
      test: /\w{4,}/,
      message: "至少四位字符"
    },
    password: {
      test: /\w{4,}/,
      message: "至少四位字符"
    }
  },
  computed: {
    formError() {
      return this.$vuerify.$errors;
    }
  },
  created() {
    const that = this;

    get("/api/gt/register-slide?t=" + new Date().getTime()).then(data => {
      // 调用 initGeetest 进行初始化
      // 参数1：配置参数
      // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
      that.captchaStatus = true;
      initGeetest(
        {
          // 以下 4 个配置参数为必须，不能缺少
          gt: data.data.gt,
          challenge: data.data.challenge,
          offline: !data.data.success, // 表示用户后台检测极验服务器是否宕机
          new_captcha: data.data.new_captcha, // 用于宕机时表示是新验证码的宕机

          product: "float", // 产品形式，包括：float，popup
          width: "300px"
          // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
        },
        that.handler
      );
    });
  }
};
</script>

<style>
@charset "UTF-8";
#captcha {
  width: 336px;
  display: inline-block;
}

#wait {
  text-align: left;
  color: #666;
  margin: 0;
}
.geetest_holder{
  width: 336px!important;
}
.el-icon-error {
  font-size: 20px;
  position: relative;
  left: -20px;
  color: #d7593d;
}
.pass-header-wrap {
  width: 1200px;
  margin: 0 auto;
  font-size: 26px;
  padding: 20px;
  cursor: pointer;
}
.login-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/static/img/login_bg.jpg");
  background-size: contain;
}
.ipt-tips-default {
  width: 336px;
  padding: 0 20px 0 45px;
  border: 1px solid #d46f16;
  border-radius: 4px;
  background: #ffe6e5;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.login-box {
  box-sizing: content-box;
  width: 336px;
  min-height: 300px;
  background: #ffffff;
  position: relative;
  margin: 0 auto;
  margin-top: 100px;
  padding: 30px 32px;
  -webkit-box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.member-login {
  text-align: center;
  font-size: 16px;
  margin-bottom: 25px;
}

.forget-password {
  text-align: right;
  margin-bottom: 20px;
  line-height: 14px;
  color: #444444;
}
.forget-password:hover {
  color: #d36f16;
}

.login {
  margin-bottom: 20px;
  margin-top: 10px;
}

.code {
  margin-bottom: 20px;
  position: relative;
}
.code .ipt-code {
  width: 90px;
  height: 42px;
  margin-right: 10px;
  padding-right: 20px;
}
.code img {
  vertical-align: middle;
  margin-top: -5px;
}
.code .code-wrong,
.code .code-right {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  *vertical-align: auto;
  zoom: 1;
  *display: inline;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -12px;
}
.code .code-wrong {
  background-color: #f4523b;
  /* background-image: url(../images/wrong.png); */
}
.code .code-right {
  background-color: #53bb4c;
  /* background-image: url(../images/right.png); */
}

.ipt-default {
  background: #ffd100;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding-left: 20px;
}

.ipt-default-current {
  width: 336px;
}

.ipt-tips-default,
.email,
.password {
  margin-bottom: 20px;
}

.ipt-tips-default {
  width: 336px;
  padding: 0 20px 0 45px;
  border: 1px solid #d46f16;
  border-radius: 4px;
  /* background: #ffe6e5 url("../images/error-tips.png") no-repeat 20px 12px; */
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.ipt-tips-default a {
  color: #d36f16;
}

.loadding-btn {
  cursor: default;
}

.error-tips .ipt-default-current {
  height: 42px;
}

.l-tab-covers {
  font-size: 16px;
  border-bottom: 1px solid #eeeeee;
}
.l-tab-covers .l-tab-list {
  color: #999999;
  display: inline-block;
  margin-right: 30px;
  border-bottom: 2px solid transparent;
  padding-bottom: 20px;
  margin-bottom: -1px;
  cursor: pointer;
}
.l-tab-covers .l-tab-list:hover,
.l-tab-covers .l-tab-list.current {
  color: #282828;
  border-bottom: 2px solid #282828;
  font-weight: 500;
}

.l-title-covers {
  padding-bottom: 20px;
  border-bottom: 1px solid #eeeeee;
}
.l-title-covers .l-title-h2 {
  font-size: 16px;
  color: #282828;
  font-weight: 500;
}

.module-l-static .l-static,
.module-l-static .static-l {
  display: block;
}

.ipt-short-current {
  width: 116px;
}

.sms-cd-btn {
  height: 42px;
  padding: 0 14px;
  margin-left: 5px;
}

.n-receive-cd {
  color: #282828;
  float: right;
  line-height: 42px;
  cursor: pointer;
  font-size: 12px;
  display: none;
}

.login-links {
  color: #999999;
  float: right;
}
.login-links a:hover {
  color: #282828;
}

.wx_login_links {
  color: #999999;
  text-align: center;
  margin-top: 56px;
}
.wx_login_links a:hover {
  color: #282828;
}

.login-switch {
  width: 53px;
  height: 53px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.icon-l {
  width: 53px;
  height: 53px;
}
.icon-l:hover {
  opacity: 0.8;
}

.er-cd-covers {
  text-align: center;
  color: #999999;
  font-size: 12px;
}

.quick-code {
  width: 190px;
  height: 190px;
  margin: 0 auto 14px;
}
.quick-code img {
  width: 190px;
  height: 190px;
}

.js-ipt-h {
  display: none;
}

.impowerBox .qrcode {
  width: 90px !important;
}

div#login_container {
  height: 270px;
}

.static-module-covers {
  background: #ffffff;
  position: relative;
  z-index: 2;
  margin-top: 45px;
  padding-bottom: 8px;
}

.pass-login-covers {
  position: relative;
}

.error-tips {
  position: absolute;
  top: -54px;
}

/*错误提示的样式 js  */
.js-pass-covers-style,
.js-sms-covers-style {
  margin-top: 66px;
}
</style>
