import { request } from './request'
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
export function getHomeGoods(type, page) {
    return request({
        url: 'home/data',
        params: {
            type,//就是上面通过形参传过来的实参page：page
            page
        }
    })
}    