<template>
  <div>
    <div class="collect-content">
      <el-card  class="box-card" v-for="(item,index) in collect" :key="index" shadow="hover">
        <div class="collect-text item"  @click="gotoArticle(item)">
          <span class="title">{{item.title}}</span>
          <span class="form">来自：{{item.form}} </span>
          <span class="auther">作者：{{item.auther}}</span>
        </div>
      </el-card>
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
      collect: [
        {
          title: "VUEX源码学习笔记（第1~4章，共6章)",
          form: "知乎",
          auther: "DuLinRain",
          url: "https://segmentfault.com/a/1190000011668695"
        },
                {
          title: "VUEX源码学习笔记（第5~6章 共6章)",
          form: "知乎",
          auther: "DuLinRain",
          url: "https://segmentfault.com/a/1190000011668825"
        },
                {
          title: "Shell变量-细说linux配套视频",
          form: "segmentfault",
          auther: "那页阳光",
          url: "https://segmentfault.com/a/1190000010695752"
        },
                {
          title: "Redis的发布与订阅",
          form: "segmentfault",
          auther: "那页阳光",
          url: "https://segmentfault.com/a/1190000010287367"
        },
                {
          title: "好好说道下Http协议",
          form: "segmentfault",
          auther: "那页阳光",
          url: "https://segmentfault.com/a/1190000010287131"
        },
      ]
    };
  },
  methods: {
    gotoArticle(item) {
      console.log(1)
      window.open(item.url);
    }
  }
};
</script>

<style lang="scss">
.collect-content {
  width: 1152px;
  overflow: hidden;
  vertical-align: top;
  background: #fff;
  min-height: 530px;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 20px;
  box-sizing: border-box;
  .box-card {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .collect-text {
    .form {
      float: right;
      margin-right: 20px;
    }
    .auther {
      float: right;
      margin-right: 20px;
    }
  }
}
</style>