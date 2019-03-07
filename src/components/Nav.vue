<template>
    <nav id="bottom-nav">
        <div :class="{part:true,on:key===$props.part}" v-for="(item,key) in icon" :key="key" @touchstart="toggle(key)">
            <Icon :type="key" class="bottom-nav-icon" />
            <span class="name">
                {{item}}
            </span>
        </div>
    </nav>
</template>

<script>
    import {Component,Vue} from 'vue-property-decorator';
    import Icon from './Icon.vue';
    @Component({
        name: "Nav",
        components:{Icon},
        props: {
            part:{
                type:String,
                default:'home'
            }
        },
        data(){
            return {
                icon:{
                    home:'首页',
                    category:'分类',
                    album:'专辑'
                }
            }
        }
    })
    export default class Nav extends Vue  {

        toggle(part){
            this.$emit('toggle',part)
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";
    #bottom-nav{
        position:fixed;
        width:100%;
        height:@bottom-nav-height;
        bottom:0;
        left:0;
        z-index:10;
        // border-top:1px solid @border-color;
        box-shadow:0 0 10px 2px @border-color;
        background-color:#fff;
        display:flex;
        justify-content:space-around;
        align-items:center;

        .part{
            width:100%/3*0.5;
            color:@icon-color;

            .bottom-nav-icon{
                font-size:1.8em;
            }

            .name{
                display:block;
                font-size:12px;
                // color:@font-color;
            }

            &.on{
                color:#2c3e50;
            }
        }
    }
</style>