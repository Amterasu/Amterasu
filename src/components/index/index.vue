<template>
  <div>
    <Classify></Classify>
    <Content></Content>
  </div>
</template>

<script>
import Content from "./content"
import Classify from "./classify"
import { post } from "../../../static/js/common"

export default {
  name: "App",
  components: {
    Content,
    Classify
  },
};
</script>

<style>

</style>
