<template>
  <div>
    <div class="help-content">
      <div class="header">
        <div class="allrank">
          <span>{{article.title}}</span>
          <span class="time-bbb">创建于{{createTime}}，更新于{{updateTime}}</span>
        </div>
      </div>
      <div class="help-main">
        <mavon-editor v-model="article.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false"> </mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
import { get, formatDate } from "../../../static/js/common"
import api from '../../api/api'

export default {
  data(){
    return {
      article:{}
    }
  },
  created(){
    var that = this;
    api.getArticleDetail(this.$route.params.id, res=>{
      that.article = res.data;
    })
  },
  computed:{
    createTime(){
      return formatDate(new Date(new Date(this.article.created).getTime()),'Y年M月D日')
    },
    updateTime(){
      return formatDate(new Date(new Date(this.article.updated).getTime()),'Y年M月D日')
    }
  }
};
</script>

<style lang="scss">
.help-content {
  img {
    max-width: 100% !important;
  }
  width: 1152px;
  overflow: hidden;
  vertical-align: top;
  background: #fff;
  min-height: 1330px;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  .header {
    width: 95%;
    height: 55px;
    line-height: 55px;
    position: relative;
    border-bottom: 1px solid #eeeeee;
    .allrank {
      height: 56px;
      overflow: hidden;
    }
    .allrank span:first-of-type {
      font-size: 16px;
      color: #282828;
      text-indent: 30px;
    }
    .allrank span:nth-of-type(2) {
      font-size: 12px;
      margin: 1px 40px;
      float:right;
    }
    .allrank span {
      font-size: 12px;
      color: #bbbbbb;
      float: left;
      text-indent: 0;
    }
    .allrank .cycle {
      float: right;
      margin-right: 25px;
      cursor: pointer;
    }
  }
  .help-main {
    width: 1100px;
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>
