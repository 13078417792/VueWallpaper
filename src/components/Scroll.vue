<template>
    <div class="scroll-wrapper" ref="wrapper">
        <div class="scroll-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Scroll",
        data(){
            return {
                position:{
                    x:0,y:0
                }
            }
        },
        activated(){
            console.log('activated')
        },
        deactivated(){
            console.log(1)
        }
    }
</script>

<style scoped lang="less">

    .scroll-wrapper{
        width:100%;
        height:100%;
        overflow-x:hidden;
        overflow-y:auto;

        .scroll-content{
            width:100%;
        }
    }

</style>