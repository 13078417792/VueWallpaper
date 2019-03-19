<template>
    <div class="nav-layout">

        <div class="container" ref="container">
            <slot></slot>
        </div>


        <Nav class="layout-nav" v-if="!!$route.meta.nav" />

    </div>

</template>

<script>
    import Nav from './Nav'
    export default {
        name: "NavLayout",
        components:{
            Nav
        },
        data(){
            return {
                scrollTop:{}
            }
        },
        watch:{
            // "$route":function(newVal,oldVal){
            //     const container = this.$refs.container
            //     this.scrollTop[oldVal.path] = container.scrollTop
            //     if(this.scrollTop.hasOwnProperty(newVal.path)){
            //         this.$nextTick(()=>{
            //             const container = this.$refs.container
            //             container.scrollTo({
            //                 left:0,
            //                 top:this.scrollTop[newVal.path]
            //             })
            //         })
            //
            //     }
            // }
        },
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";

    .nav-layout{
        width:100%;
        height:100%;
        overflow:hidden;
        position:relative;
        padding-bottom:@bottom-nav-height;
        box-sizing:border-box;
        // display:flex;
        // flex-direction: column;


        .container{
            width:100%;
            height:100%;
            overflow-x:hidden;
            overflow-y:auto;
        }

        .layout-nav{
            position:absolute !important;
        }

    }
</style>