<template>
  <div class="goods-item" @click="itemClick">
    <!-- {{goodsItem}} -->
    <img :src="showImage" @load="imageLoad" alt />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImagLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  /* 给这个商品展示的组件，整个的底部设置了40px*/
  position: relative;
  /* 子绝父相 */
  width: 48%;
}

.goods-item img {
  width: 100%;
  /* 里面图片搞了100% ，里面图片四个边框设置了一点圆角效果*/
  border-radius: 5px;
}

.goods-info {
  /* 之前padding-bottom搞40px因为：下面整个文字部分用的是定位。即下面文字这个整体占40px，直接把它定位到底部 */
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  /* 这个设置样式主要是让文字超出部分以...形式显示 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  /* 收藏这个文字的前面有小图标，用伪元素做 */
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>

