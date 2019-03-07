<template>
    <div class="list-wrapper">
        <div class="wrap--ef6cyr33 cl" :style="style">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListWrapper",
        props:{
            space:{
                type:[Number,String],
                default:'-1em'
            }
        },
        computed:{
            style(){
                return {
                    marginRight:this.$props.space
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";
    .list-wrapper{
        width:100%;

        .wrap--ef6cyr33{
            margin-right:-@padding;
        }
    }
</style>