<template>
    <div :class="className" @click="click">
        {{title}}
    </div>
</template>

<script>
    export default {
        name: "TabButton",
        props:{
            title:String,
            active:{
                type:Boolean,
                default:null
            },
            background:{
                type:String
            }
        },
        computed:{
            className(){
                let {active} = this.$props
                if(active===null) active = true
                return {
                    'tabs-button':true,
                    active
                }
            },
            style(){
                const {active,background} = this.$props
                if(active===false) return {background:'transparent',color:'#000'}
                return {background}
            }
        },
        methods:{
            click(){
                this.$emit('click',this.$props.title)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";
.tabs-button{
    display:inline-block;
    font-size:.85em;
    // color:@desc-font;
    color:#bbb;
    border-radius:2em;
    padding:.2em .8em;
    cursor:pointer;
    margin:0 5px;

    &.active{
        background:linear-gradient(left,#3232F1,#7f5be0);
        color:#fff;
        box-shadow:0 0 2px 1px rgba(0,0,0,.2);
    }
}
</style>