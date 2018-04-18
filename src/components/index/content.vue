<template>
  <div class="content-type" id="content-type" v-loading="contentLoading">
    <waterfall :align="align" :line-gap="384" :watch="all">
      <waterfall-slot v-for="(item, index) in all" width="372" :height="item.cheight" :order="index" :key="item._id">
        <div class="item">
          <div class="foradmin" v-if="loginStatus">{{item.showStatus == 1?'显示':'隐藏'}}</div>
          <div class="clearfix article-tit">
            <a href="javascript:void(0)" target="_blank" class="big-tit fl" @click='turntoDetail(item._id)'>{{item.title}}</a>
            <img class="fr" :src="`http://47.95.9.245/tag/${item.category[0].name}.jpg`">
          </div>
          <div>
            <p class="article-content">{{item.gist}}</p>
            <div class="bottom-info clearfix">
              <span v-for="tag in item.category" :key="tag.id" class="tag">{{tag.name}}</span>
              <a href="javascript:void(0)" target="_blank" class="fr blue" @click='turntoDetail(item._id)'>阅读全文</a>
              <a href="javascript:void(0)" target="_blank" class="fr blue" style="margin:0 10px" @click='editArticle(item._id)' v-if="loginStatus">编辑</a>
            </div>
          </div>
        </div>
      </waterfall-slot>
    </waterfall>
    <div class="nomore" v-show="nomore">没有更多</div>
    <!-- <div class="nomore" v-show="nodata">暂无数据</div> -->
  </div>
</template>

<script>
import Waterfall from "vue-waterfall/lib/waterfall";
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot";
import { post, notice } from "../../../static/js/common";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      align: "center",
      contentLoading: true,
      timeout: false, // 滚动节流 true 可请求 false不可请求
      nomore: false,
    };
  },
  components: {
    Waterfall,
    WaterfallSlot
  },
  created() {
    // 发送 POST 请求
    let that = this;
    this.GET_LIST().then(() => {
      that.timeout = true;
      that.contentLoading = false;
    });
  },
  computed: {
    ...mapState('indexContent',["all", "page", "count"]),
    ...mapState('checkUser',["loginStatus"]),
  },
  methods: {
    ...mapActions('indexContent',["GET_LIST"]),
    ...mapMutations('indexContent',["INCREMENT_PAGE"]),
    turntoDetail(id) {
      this.$router.push({ path: `/detail/${id}` });
    },
    editArticle(id) {
      this.$router.push({ path: `/write/${id}` });
    },
    onScroll() {
      let that = this;
      if (
        this.timeout &&
        this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()
      ) {
        if (this.count < this.page * 10) {
          // notice.error('到底了')
          this.nomore = true;
          return;
        }
        this.timeout = false;
        this.contentLoading = true;
        setTimeout(() => {
          this.INCREMENT_PAGE();
          this.GET_LIST({
            page: this.page
          }).then(res => {
            that.timeout = true;
            that.contentLoading = false;
          });
        }, 300);
      }
    },
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    //文档的总高度
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-type {
  width: 1152px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 0 48px;
  margin-top: 36px;
  min-height: 1000px;
  .nomore {
    margin: 0 auto;
    text-align: center;
    background: #fff;
    margin-top: 20px;
    width: 98%;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
  }
  .item {
    width: 362px;
    height: 90%;
    margin-top: 5%;
    // margin-left: 9px;
    margin-left: 3%;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
    border-radius: 8px;
    transition: all 0.3s;
    padding: 24px 32px 32px;
    &:hover {
      box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
    }
    .foradmin {
      width: 30px;
      border-radius: 8px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      position: absolute;
      left: 0;
      top: 19px;
      background: #ffca04;
      text-align: center;
      color: #fff;
    }
    .article-tit {
      height: 48px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .big-tit {
      font-size: 16px;
      color: #07111b;
      line-height: 24px;
      transition: all 0.3s;
      width: 224px;
    }
    img {
      width: 72px;
      height: 48px;
      border-radius: 3px;
    }
    .article-content {
      font-size: 12px;
      color: #4d555d;
      line-height: 24px;
      text-align: justify;
      word-break: break-all;
      font-weight: 400;
    }
    .bottom-info {
      font-size: 12px;
      color: #93999f;
      line-height: 24px;
      margin-top: 12px;
      font-weight: 400;
      > span {
        margin-right: 24px;
      }
      a {
        transition: all 0.3s;
      }
      .blue {
        color: rgba(0, 140, 200, 0.6);
      }
      .tag {
        display: inline-block;
        background: #eaeaea;
        border-radius: 3px;
        padding: 0 4px;
        margin-right: 4px;
        color: #999;
      }
    }
  }
}
</style>
