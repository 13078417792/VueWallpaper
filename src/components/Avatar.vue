<template>
    <div class="ty-avatar" :style="style">

        <img v-if="src" :src="src || ''" :style="style">

    </div>
</template>

<script>
    export default {
        name: "Avatar",
        props:{
            src:String,
            size:String
        },
        computed:{
            style(){
                const props = this.$props
                return {
                    width:props.size,
                    height:props.size
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";

    @default-size:45px;
    .ty-avatar{
        display:inline-block;
        width:@default-size;
        height:@default-size;
        background-color:@border-color;
        border-radius:50%;
        overflow:hidden;

        img{
            display:block;
            width:100%;
            height:100%;
        }
    }
</style>