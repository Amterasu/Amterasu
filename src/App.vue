<template>
  <div id="app">
    <MHeader></MHeader>
    <transition name="component-fade" mode="out-in">
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
import MHeader from "./components/header/mHeader";
export default {
  components: {
    MHeader
  }
};
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
