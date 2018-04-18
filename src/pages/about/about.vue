<template>
  <div>
    <div class="about-content">
      <el-container>
        <el-aside width="260px">
          <div id="namecard" class="namecard">
            <div class="shadow-img"></div>
            <h1 class="maintitle">
              <span class="invert">靳国强</span>
            </h1>
            <div class="profile-img">
              <img src="/static/img/me.jpg" alt="profile-image">
            </div>
          </div>
          <div id="menu-container" style="transform: translate3d(0px, 0px, 0px); opacity: 1;">
            <ul class="nav-menu no-padding">
              <li class="nav-btn" @click="page = 'page1'" :class="page == 'page1' ? 'selected': ''">
                <span>关于我</span>
                <i class="fa fa-user fa-fw"></i>
              </li>
              <li class="nav-btn folio-btn" @click="page = 'page2'" :class="page == 'page2' ? 'selected': ''">
                <span>关于本站</span>
                <i class="fa fa-suitcase fa-fw"></i>
              </li>
              <li class="nav-btn" @click="page = 'page3'" :class="page == 'page3' ? 'selected': ''">
                <span>友情链接</span>
                <i class="fa fa-paper-plane fa-fw"></i>
              </li>
              <li class="nav-btn" @click="page = 'page4'" :class="page == 'page4' ? 'selected': ''">
                <span>更新日志</span>
                <i class="fa  fa-clock-o fa-fw"></i>
              </li>
            </ul>
            <div class="social-menu-container">
              <ul class="social-menu no-padding">
                <li>
                  <a href="https://github.com/Amterasu" target="_blank">
                    <i class="fa fa-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-header>
            <div>
              <el-card shadow="never" style="background:#f3d031">
                Welcome To Amterasu
              </el-card>
            </div>
          </el-header>
          <el-main>
            <el-card shadow="never" style="height:540px;">
              <div v-show="page == 'page1'">
                <div class="strong-text"> 关于我</div>
                <div class="large-paragraph">做前端有2年了，目前就职于
                  <a href="http://www.microdreams.com/" target="_blank" style="text-decoration:underline">北京微梦传媒股份有限公司</a>。</div>
                <div class="large-paragraph">今年25周岁，毕业于普通本二学校，计算机专业。</div>
                <div class="large-paragraph">很喜欢编程，热爱接触新技术，现在正在学nodejs和mongodb。</div>
                <ul class="personal-info">
                  <li class="rotate-out">
                    <label>姓名</label>
                    <span>靳国强</span>
                  </li>
                  <li class="rotate-out">
                    <label>住址</label>
                    <span>北京朝阳</span>
                  </li>
                  <li class="rotate-out">
                    <label>邮箱</label>
                    <span>1958348964@qq.com</span>
                  </li>
                  <li class="rotate-out">
                    <label>qq</label>
                    <span>1958348964</span>
                  </li>
                  <li class="rotate-out">
                    <label>github</label>
                    <span>
                      <a href="https://github.com/Amterasu" target="_blank" style="text-decoration:underline">https://github.com/Amterasu</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div v-show="page == 'page2'">
                <div class="strong-text"> 关于本站</div>
                <div class="large-paragraph">做这个博客是为了顺一遍前后端的流程，前前后后花了12天（周末 + 下班后）</div>
                <div class="large-paragraph">这也是自己第一次做博客，希望和大家多多交流，一起成长！</div>
                <div class="large-paragraph">主要的时间费在了vuex上，因为开始写了一套，后来发现不太好，整体改了一次</div>
                <div class="large-paragraph">每个前端都有一个全栈梦，为了目标而不懈努力吧，fighting！</div>
                <ul class="personal-info">
                  <li class="rotate-out">
                    <label>主要功能</label>
                    <span>登录</span>
                    <span>检测登录</span>
                    <span>分类（多对多）</span>
                    <span>筛选</span>
                    <span>分页</span>
                    <span>博客的增删改查</span>
                    <span>markdown编辑</span>
                    <span>图片上传</span>
                    <span>验证码</span>
                  </li>
                  <li class="rotate-out">
                    <label>前端技术</label>
                    <span>vue-cli</span>
                    <span>vue-router</span>
                    <span>vuex</span>
                    <span>element-ui</span>
                  </li>
                  <li class="rotate-out">
                    <label>后端技术</label>
                    <span>nodejs</span>
                    <span>express</span>
                    <span>mongodb</span>
                    <span>mongoose</span>
                  </li>

                  <li class="rotate-out">
                    <label>服务器</label>
                    <span>centos</span>
                  </li>
                  <li class="rotate-out">
                    <label>项目地址</label>
                    <span>
                      <a href="https://github.com/Amterasu" target="_blank" style="text-decoration:underline">https://github.com/Amterasu</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div v-show="page == 'page3'">
                <div class="strong-text"> 友情链接</div>
                <div class="large-paragraph">还没有呢.</div>
              </div>
              <div v-show="page == 'page4'">
                <div class="strong-text"> 更新日志</div>
                <div style="height: 400px;">
                  <el-steps direction="vertical" :active="3">
                    <el-step title="2018-4-4"  description="开始"></el-step>
                    <el-step title="2018-4-15" description="整体基本完毕"></el-step>
                    <el-step title="2018-4-18" description="对vuex代码结构整体进行改写，主要添加了vuex的配置文件，对api接口文件整体改用asyc和await"></el-step>
                  </el-steps>
                </div>
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>

</template>

<script>
import api from "../../api/api";
import { post, notice } from "../../../static/js/common";
import axios from "axios";

export default {
  data() {
    return {
      page: "page1"
    };
  },
  methods: {
    gotoArticle(item) {
      console.log(1);
      window.open(item.url);
    }
  }
};
</script>

<style lang="scss" scoped>
.about-content {
  width: 1152px;
  overflow: hidden;
  vertical-align: top;
  background: #fff;
  // min-height: 530px;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 20px;
  box-sizing: border-box;
  #namecard {
    position: relative;
    background-color: #666;
    height: 47%;
    min-height: 300px;
    text-align: center;
    padding: 15px;
    margin: 0px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .namecard,
  .namecard h1 {
    font-family: "Oswald", sans-serif;
  }
  .profile-img {
    position: relative;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    float: none;
    overflow: hidden;
    background-color: #fff;
    border: 7px solid #f4d03f;
    z-index: 100;
    opacity: 1;
    left: 40px;
    img {
      width: 100%;
    }
  }
  .shadow-img {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #111111;
    background-size: 100% 100%;
    z-index: 0;
    border-radius: 5px;
  }
  .maintitle {
    margin-bottom: 23px;
    color: #f4d03f;
    display: block;
    text-transform: uppercase;
    position: relative;
    font-size: 30px;
    margin-top: 20px;

    .invert {
      color: #fff;
    }
  }
  #menu-container {
    position: relative;
    display: block;
    clear: both;
    background-color: #f4d03f;
    height: 47%;
    min-height: 305px;
    text-align: right;
    padding: 15px 0px;
    margin: 0px;
    box-sizing: border-box;
    border-radius: 5px;
  }

  ul.nav-menu li {
    position: relative;
    padding: 12px 15px;
    width: 100%;
    color: #333;
    border-bottom: 1px solid #e1c03a;
    font-size: 16px;
    margin: 0px;
    font-family: "Oswald", sans-serif;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
  }

  ul.nav-menu li:hover {
    color: #f4d03f;
    background: #111;
  }

  ul.nav-menu li.selected {
    border-right: none;
    font-weight: bold;
  }

  ul.nav-menu li span {
    padding-right: 25px;
    border-right: 2px solid #e1c03a;
    margin-right: 15px;
    text-transform: uppercase;
  }

  ul.nav-menu li:hover span {
    border-right: 2px solid #f4d03f;
  }

  .social-menu-container {
    position: absolute;
    bottom: 0px;
    right: 0px;
    left: 0;
    text-align: center;
  }

  .social-menu-container .title {
    margin-bottom: 5px;
    padding-right: 15px;
    color: #111111;
  }

  .social-menu {
    display: inline-block;
    float: none;
    font-size: 18px;
    margin-right: 5px;
  }

  .social-menu a {
    color: #111111;
  }
  .social-menu a:hover {
    color: #000;
  }
  .social-menu li {
    float: left;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.1s ease-in;
    -webkit-transition: all 0.1s ease-in;
  }

  .social-menu li:hover {
    background-color: #111111;
    color: #f4d03f;
  }

  .social-menu li:hover a {
    color: #f4d03f;
  }

  .social-menu li i {
    margin-top: 33%;
  }
  .no-padding {
    list-style: none;
    padding-left: 0px;
  }
  .strong-text {
    font-family: "Oswald", sans-serif;
    display: inline-block;
    font-size: 22.5px;
    margin: 10px 0px;
  }
  .focus-text {
    color: #666666;
  }
  .focus-text span {
    font-size: 16px;
    font-weight: 600;
  }
  .large-paragraph {
    font-size: 14px;
    line-height: 1.7em;
    letter-spacing: 1.5px;
    color: #666666;
    margin: 15px 0px;
    padding-right: 75px;
  }
  .personal-info {
    list-style: none;
    padding: 0;
    margin-top: 40px;
  }
  ul.personal-info li {
    margin-bottom: 9px;
    padding-left: 75px;
    position: relative;
    font-size: 12.5px;
  }
  .personal-info span {
    background: #111111;
    padding: 4px 10px 5px;
    color: #fff;
    display: inline-block;
    margin-left: 9px;
    text-transform: capitalize;
    border-radius: 2px;
    margin-bottom: 5px;
  }

  .personal-info label {
    position: absolute;
    left: 0;
    width: 75px;
    top: 0;
    bottom: 0;
    min-width: 75px;
    font-size: 12.5px;
    font-weight: 600;
    background: #f4d03f;
    margin-right: 10px;
    padding: 4px 10px 5px;
    margin: 0;
    box-sizing: border-box;
    border-radius: 2px;
    height: 27px;
    // line-height: 27px;
  }
}
</style>