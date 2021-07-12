import Vue from "vue"
import Vuex from "vuex"


import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 1、安装插件
Vue.use(Vuex)
// 2、创建store对象
const state = {
    cartList: []
}

const store = new Vuex.Store({
    state,
    // state: {
    //     cartList: []
    // },
    mutations,
    // addCart(state, palyLoad) {
    // //palyLoad新添加的商品
    // let oldProduct = null,
    // for (let item of state.cartList) {
    //     if (item.iid === palyLoad.iid) {
    //         oldProduct = item
    //         //oldProduct指向那个与我传进来的商品一样的商品
    //     }
    // }
    // if (oldProduct) {
    //     oldProduct.count += 1
    // } else {
    //     palyLoad.count = 1
    //     //没有count这个属性，这样就有了
    //     state.cartList.push(palyLoad)
    // }
    // let index = state.cartList.indexOf(palyLoad)

    // if (index !== -1) {
    //     let oldProduct = state.cartList[index]
    //     oldProduct.count += 1
    // } else {
    //     palyLoad.count = 1
    //     state.cartList.push(palyLoad)
    // }

    // 查找之前数组中是否有该商品
    // let oldProduct = state.cartList.find(function (item) {
    //     return item.iid === palyLoad.iid
    //     // item=>item.iid===palyLoad.iid
    // })
    // if (oldProduct) {
    //     oldProduct.count += 1
    // } else {
    //     palyLoad.count = 1
    //     //没有count这个属性，这样就有了
    //     state.cartList.push(palyLoad)
    // }


    // addCounter(state, palyLoad) {
    //     // palyLoad.count += 1
    //     palyLoad.count++
    // },
    // addToCart(state, palyLoad) {
    //     state.cartList.push(palyLoad)
    // }

    actions,
    // addCart(context, palyLoad) {
    //     let oldProduct = context.state.cartList.find(function (item) {
    //         return item.iid === palyLoad.iid
    //         // item=>item.iid===palyLoad.iid
    //     })
    //     if (oldProduct) {
    //         // oldProduct.count += 1
    //         context.commit('addCounter', oldProduct)
    //     } else {
    //         palyLoad.count = 1
    //         // context.state.cartList.push(palyLoad)
    //         context.commit('addToCart', palyLoad)
    //     }
    // }
    getters

})
// 3、挂载到Vue实例上
export default store
