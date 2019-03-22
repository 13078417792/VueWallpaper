<template>
    <div class="touch-toggle__children" :style="style">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TouchToggleChildren",
        data(){
            return {
                style:{},
                initY:0
            }
        },
        methods:{
            setCss(css){
                if(this.$helper.get_type(css)!=='object') return false;
                for(let name in css){
                    this.$set(this.style,name,css[name])
                }
                return true
            }
        }
    }
</script>

<style scoped lang="less">

    .touch-toggle__children{
        width:100%;
        height:100%;
        overflow-x:hidden;
        overflow-y:auto;
        position:absolute;
        top:0;
        left:0;

    }

</style>