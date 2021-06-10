<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- <div :class="{active:isActive}">
      <slot name="item-text"></slot>
    </div>-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
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
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      //   isActive: true
      //   path: "/home"
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      //   console.log("你好");
      console.log("this.path");
      console.log(this.path);
      this.$router.replace(this.path);
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  /* margin-bottom: 0.5px; */
}
/* .active {
  color: red;
} */
</style>