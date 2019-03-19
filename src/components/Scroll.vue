<template>
    <div class="scroll-wrapper" ref="wrapper" :style="scrollCssValue">
        <slot></slot>
    </div>
</template>

<script>
    import SaveScrollMixin from '../mixins/save-scroll'
    export default {
        name: "Scroll",
        mixins:[SaveScrollMixin],
        props:{
            horizontal:{
                type:Boolean,
                default:false,
            },
            vertical:{
                type:Boolean,
                default:true
            }
        },
        computed:{
            scrollCssValue(){
                const props = this.$props
                return {
                    'overflow-x':!!props.horizontal?'auto':'hidden',
                    'overflow-y':!!props.vertical?'auto':'hidden'
                }
            }
        }
    }
</script>

<style scoped lang="less">

    .scroll-wrapper{
        width:100%;
        height:100%;
        overflow:auto;

        /*.scroll-content{*/
            /*width:100%;*/
        /*}*/
    }

</style>