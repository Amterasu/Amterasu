<template>
  <div>
    <div class="demo-content">
      <el-row>
        <el-col :span="6" v-for="(o, index) in demoList" :key="index" :offset="index%3 > 0 ? 3 : 0" style="margin-bottom:20px">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.img" class="image">
            <div style="padding: 14px;">
              <span>{{o.title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{o.time}}</time>
                <el-button type="text" class="button" @click="viewDemo(o.url)">查看</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      demoList: [{
        title: `爱心表白`,
        time: `2018-4-16`,
        url: "http://47.95.9.245/1/index.html",
        img: "/static/img/biaobai.jpg"
      }]
    };
  },
  methods: {
    viewDemo(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-content {
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
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>