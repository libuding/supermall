<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast :message="message" :show="show" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: "",
      show: false
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then(res => {
      //   1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //   2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //   3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //   4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //   5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //   5.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then(res => {
      this.recommends = res.data.list;
    });

    // 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {
    this.$refs.scroll.refresh();
  },

  updated() {},
  methods: {
    ...mapActions(["addCart"]),

    // imageLoad() {
    //   this.$refs.scroll.refresh();
    // }
    detailImageLoad() {
      //其实这里用了防抖函数，用了混入，代码在mixin.js中
      this.refresh();
      //每次图片加载完就计算
      //这里用了防抖函数之后，就不会每次都调用了
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      //   1.获取y值
      const positionY = -position.y;

      //   // 2.positionY和主题中的值进行对比
      //   // // [0,7938,9120,9452]
      //   // positionY在0和7938之间，index=0
      //   // positionY在7938和9120之间，index=1
      //   // positionY在9120和9452之间，index=2
      //   // positionY超过9452，index=3
      //   for (let i in this.themeTopYs) {
      //     //问题1：这个i是str。如果i是0，那么i+1是01 console.log(i+1);
      //     //字符串转成数字类型 i*1 或者 parseInt(i)
      //     if (
      //       positionY > this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]
      //     ) {
      //       console.log(i);
      //     }

      //   // 或者另一个方法
      //   for (let i = 0; i < this.themeTopYs.length; i++) {
      //     if (
      //       positionY > this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]
      //     ) {
      //       console.log(i);
      //     }
      //     //   问题2：i+1越界了，最后一次根本进不来这个语句
      //   }

      //   解决方法：前三个的时候可以按照之前方法判断，最后那个只要滚动位置大于最后一个数即可
      //   let length = this.themeTopYs.length;
      //   for (let i = 0; i < length; i++) {
      //     //   if(()||()){}
      //     //   if((A&&B)||(C&&D)){}
      //     if (
      //       this.currentIndex !== i &&
      //       ((i < length - 1 &&
      //         positionY >= this.themeTopYs[i] &&
      //         positionY < this.themeTopYs[i + 1]) ||
      //         (i === length - 1 && positionY >= this.themeTopYs[i]))
      //     ) {
      //       this.currentIndex = i;
      //       this.$refs.nav.currentIndex = this.currentIndex;
      //     }
      //   }
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 3.判断BackTop是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      //   1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.desc = this.goods.desc;
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //   2.将商品添加到购物车里面
      //   this.$store.cartList.push(product)
      //   this.$store.commit("addCart", product);

      // 这样写是指定调用vuex里面actions里面的方法
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res);
      // });
      // 这样写看起来像是在调自己的方法，但我没这个方法。但我们可以把方法映射到这里
      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;
        // console.log(res);
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        this.$toast.show(res, 1500);
        // this.$toast.show();
        console.log(this.$toast);
      });

      // 3.添加购物车成功
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>


