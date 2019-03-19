<template>
    <div class="module-page">

        <header class="module-header">

            <button class="icon-btn" @click="reback">
                <Icon type="reback" class="strong-font" />

                <span class="module-header-title overflow">
                    {{title}}
                </span>

            </button>


        </header>

        <Scroll class="module-content" :horizontal="$props['horizontal-scroll']">
            <slot></slot>
        </Scroll>

    </div>
</template>

<script>
    import Icon from './Icon'
    import Scroll from './Scroll'
    export default {
        name: "ModulePage",
        components:{
            Icon,Scroll
        },
        props:{
            title:{
                type:String,
                default:''
            },
            horizontal:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            reback(){
                const router = this.$router
                if(history.length===0){
                    router.push('/')
                }else{
                    router.go(-1)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";

    .module-page{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;

        @padding:.5em;
        @module-header-height:1.3em;
        @header-height:@padding*2+@module-header-height;
        .module-header{
            padding:@padding;
            height:@module-header-height;
            box-sizing:content-box;
            line-height:@module-header-height;
            color:inherit;

            .icon-btn{
                outline:none;
                border:0;
                background-color:transparent;
                /*color:#000;*/
                font-size:1em;
            }

            .module-header-title{
                font-size:.95em;
                margin-left:.2em;
            }

        }

        .module-content{
            /*width:100%;*/
            /*height:100%;*/
            /*overflow:auto;*/
        }

    }

</style>