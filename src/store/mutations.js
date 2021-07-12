export default {
    addCounter(state, payload) {
        // payLoad.count += 1
        payload.count++
    },
    addToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}