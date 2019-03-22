<template>
    <i :class="this.className"></i>
</template>

<script>
    import {Component,Vue} from 'vue-property-decorator'

    @Component({
        name: "Icon",
        props:{
            type:{
                type:String,
                required:true
            }
        },
        computed:{
            className(){
                const {type} = this.$props
                return ['iconfont',type?`icon-${type}`:'']
            }
        }
    })
    export default class Icon extends Vue {


    }
</script>

<style scoped lang="less">
    @import "//at.alicdn.com/t/font_1070235_b3ieu542fe.css";
</style>