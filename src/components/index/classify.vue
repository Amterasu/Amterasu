
<template>
  <div class="classify-select js-subcate-cover" cate="create" id="type-filter-cover" :class="classifyBarFixed == true?'classifyBarFixed':''">
    <div class="classify-box">
      <ul class="classify-select-list js-class-hover-cover">
        <li class="parents-nodes classify-item">
          <div class="classify-item-type">
            <a class="classify-default" :class="selectedTagId == ''? 'current':''" href="javascript:void(0)" @click="filterByTag()">全部</a>
          </div>
        </li>
        <li class="parents-nodes classify-item" v-for="item in allTags" :key="item._id" @click="filterByTag(item._id)">
          <div class="classify-item-type">
            <a class="classify-default" href="javascript:void(0)" :class="selectedTagId == item._id ? 'current':''">{{item.name}}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { post } from "../../../static/js/common";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      classifyBarFixed: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!document.querySelector("#content-type")) {
        return false;
      }
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > document.querySelector("#content-type").offsetTop) {
        this.classifyBarFixed = true;
      } else {
        this.classifyBarFixed = false;
      }
    },
    filterByTag(id = "") {
      this.SET_SELECTED_TAG(id);
      this.RESET_PAGE();
      this.GET_LIST();
    },
    ...mapActions('indexContent',["GET_LIST"]),
    ...mapActions('tag',["GET_TAGS"]),
    ...mapMutations('tag',["SET_SELECTED_TAG"]),
    ...mapMutations('indexContent',["RESET_PAGE"])
  },
  created() {
    this.GET_TAGS();
  },
  computed: {
    ...mapState('tag',["allTags"]),
    ...mapState('tag',["selectedTagId"])
  }
};
</script>

<style>
.classify-select {
  background: #ffffff;
  position: relative;
}
.classifyBarFixed {
  position: fixed;
  width: 100%;
  z-index: 2;
  top: 0;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.1);
}
.classify-select .classify-box {
  margin: 0 auto;
  width: 1130px;
}
.classify-select .classify-select-list {
  margin-left: -28px;
  margin-right: -28px;
  *zoom: 1;
}
.classify-select .classify-select-list:after {
  content: "";
  display: table;
}
.classify-select .classify-select-list:after {
  clear: both;
}
.classify-select .classify-select-list .classify-item,
.classify-select .classify-select-list .self-defined {
  height: 60px;
  line-height: 60px;
}
.classify-select .classify-select-list .classify-item .classify-default:hover,
.classify-select .classify-select-list .self-defined .classify-default:hover {
  background: #f2f2f2;
  border-radius: 4px;
}
.classify-select .classify-select-list .classify-item.current .classify-default,
.classify-select .classify-select-list .self-defined.current .classify-default {
  background: #f2f2f2;
  border-radius: 4px;
}
.classify-select .classify-select-list .classify-item .classify-current,
.classify-select .classify-select-list .self-defined .classify-current {
  background: #f2f2f2;
  border-radius: 4px;
}
.classify-select
  .classify-select-list
  .classify-item
  .classify-item-type
  a.current,
.classify-select
  .classify-select-list
  .self-defined
  .classify-item-type
  a.current {
  color: #d36f16;
}
.classify-select .classify-select-list li {
  padding: 0 8px;
  cursor: pointer;
  float: left;
}
.classify-select .combobox-box {
  position: relative;
}
.classify-default {
  padding: 4px 12px;
}
</style>
