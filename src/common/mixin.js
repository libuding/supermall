import { debounce } from './utils'
import BackTop from "components/content/backtop/BackTop";


export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(
            this.$refs.scroll && this.$refs.scroll.refresh,
            50
        );
        this.itemImgListener = () => { this.refresh(); }
        this.$bus.$on("itemImagLoad", this.itemImgListener);//取消的时候这个函数也要传进去
        // console.log('混入');

    },
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        }
    }
}