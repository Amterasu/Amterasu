<template>
  <div>

    <div class="write-content">
      <div class="write-main">
        <mavon-editor v-model="content" ref=md @imgAdd="$imgAdd" :ishljs="true" :codeStyle="style"> </mavon-editor>
      </div>
      <el-form ref="form" :model="form" label-width="80px" style="padding:20px 25px;">
        <el-form-item label="文章标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="form.showStatus"></el-switch>
        </el-form-item>
        <el-form-item label="标签">
          <el-checkbox-group v-model="form.tag">
            <el-checkbox :label="tagItem._id" name="tag" v-for="tagItem in tagArr" :key="tagItem._id">{{ tagItem.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" v-model="form.gist"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{btntext}}</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import api from "../../api/api";
import { post, notice } from "../../../static/js/common";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      content: "",
      form: {
        title: "",
        gist: "",
        showStatus: true,
        tag: []
      },
      style: "agate"
    };
  },
  methods: {
    ...mapActions("tag", ["GET_TAGS"]),
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      axios({
        url: "/uploader",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(data => {
        // 第二步.将返回的data替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.md.$img2Url(pos, data.data.newPath);
      });
    },
    async onSubmit() {
      if (!this.content) {
        notice.error("未填写内容");
        return;
      }
      if (!this.form.title) {
        notice.error("未填写标题");
        return;
      }
      if (!this.form.gist) {
        notice.error("未填写摘要");
        return;
      }
      if (!this.form.tag.length) {
        notice.error("未选择标签");
        return;
      }
      let data = {
        content: this.content,
        title: this.form.title,
        gist: this.form.gist,
        category: this.form.tag,
        showStatus: this.form.showStatus ? 1 : 0
      };
      if (!!this.$route.params.id) {
        data.id = this.$route.params.id;
        let update = await api.updateArticle(data);
        if (update.data.code == 1) {
          notice.success(update.data.msg);
          this.$router.push("/index");
        } else {
          notice.error(update.data.msg);
        }
      } else {
        let add = await api.addArticle(data);
        if (add.data.code == 1) {
          notice.success(add.data.msg);
          this.$router.push("/index");
        } else {
          notice.error(add.data.msg);
        }
      }
    },
    async getDetail() {
      let detail = await api.getArticleDetail(this.$route.params.id);
      this.content = detail.data.content;
      this.form.title = detail.data.title;
      this.form.gist = detail.data.gist;
      this.form.showStatus = detail.data.showStatus ? true : false;
      this.form.tag = detail.data.category.map((value, index, arr) => {
        return value._id;
      });
    }
  },
  created() {
    this.GET_TAGS();
    if (!!this.$route.params.id) {
      // 有id则为编辑
      this.getDetail();
    }
  },
  computed: {
    tagArr() {
      return this.$store.state.tag.allTags;
    },
    btntext() {
      return !!this.$route.params.id ? "确认修改" : "立即创建";
    }
  }
};
</script>

<style lang="scss">
.write-content {
  img {
    max-width: 100% !important;
  }
  width: 1152px;
  overflow: hidden;
  vertical-align: top;
  background: #fff;
  // min-height: 1330px;
  min-height: 530px;

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
      float: right;
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
  .write-main {
    width: 1100px;
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>
