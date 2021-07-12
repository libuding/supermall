<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="price">合计:{{totalPrice}}</div>

    <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return item.price * item.count + preValue;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      //   return this.$store.state.cartList.filter(item => item.checked).length;
      return this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      //   return !this.$store.state.cartList.filter(item => !item.checked).length;
      if (this.$store.state.cartList.length === 0) return false;
      //   return !this.$store.state.cartList.find(item => !item.checked);
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选中
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        //部分或全部不选中
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
      //   this.$store.state.cartList.forEach(
      //     item => (item.checked = !this.isSelectAll)
      //   );
      //  这样不行，因为foreach一直在遍历，过程中会改变某个item.checked这时isSelectAll值会被改掉
    },
    calcClick() {
      // if (!this.isSelectAll) {
      if (!this.$store.state.cartList.find(item => item.checked)) {
        this.$toast.show("请选择购买的商品", 1500);
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 5px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
