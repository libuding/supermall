<template>
  <div id="tab-bar">
    <slot></slot>
    <!-- <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/email.svg" alt />
      首页
    </div>
    <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/email.svg" alt />
      分类
    </div>
    <div class="tab-bar-item">
      购物车
      <img src="../../assets/img/tabbar/email.svg" alt />
    </div>
    <div class="tab-bar-item">
      我的
      <img src="../../assets/img/tabbar/email.svg" alt />
    </div>-->
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -1px 10px rgba(100, 100, 100, 0.8);
}
</style>