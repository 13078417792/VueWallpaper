<template>
    <button :class="{
        'icon-button':true,
        'active-on':active
    }"
        @click="$emit('click')"
    >
        <Icon class="icon-button--component" :type="icon" :style="{
            fontSize
        }" />
        <span class="icon-button--label">{{label}}</span>
    </button>
</template>

<script>
    import Icon from './Icon'

    export default {
        name: "IconButton",
        components:{Icon},
        props:{
            icon:{
                type:String,
                default:''
            },
            label:{
                type:[String,Number],
                default:''
            },
            active:{
                type:Boolean,
                default:false
            },
            fontSize:{
                type:String,
                default:'1em'
            }
        },
    }
</script>

<style scoped lang="less">

    .icon-button{
        outline:none;
        border:0;
        background-color:transparent;
        color:#999;
        text-align:center;
        padding:0;

        .icon-button--component,.icon-button--label{
            vertical-align:middle;
        }

        .icon-button--label{
            margin-left:3px;
        }

        &.active-on{

            .icon-button--component{
                color:#ff151d;
            }

        }


    }

</style>