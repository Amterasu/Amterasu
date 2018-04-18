<template>
  <div>
    <div class="resume-content">
      <!-- <el-card  class="box-card" v-for="(item,index) in collect" :key="index" shadow="hover">
        <div class="resume-text item"  @click="gotoArticle(item)">
          <span class="title">{{item.title}}</span>
          <span class="form">来自：{{item.form}} </span>
          <span class="auther">作者：{{item.auther}}</span>
        </div>
      </el-card> -->
      暂无
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

    };
  },
  methods: {
    gotoArticle(item) {
      window.open(item.url);
    }
  }
};
</script>

<style lang="scss">
.resume-content {
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
  .resume-text {
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