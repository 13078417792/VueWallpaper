<template>
    <button :class="outerClassName" :style="outerStyle" @click.stop="$emit('click')">
        <span class="comment-button--title">
            {{title}}
        </span>
    </button>
</template>

<script>
    export default {
        name: "AddCommentButton",
        props:{
            title:{
                type:String,
                default:'添加评论'
            },
            color:{
                type:String,
                default:'#F56C6C'
            },
            fill:{
                type:Boolean,
                default:false
            },
            size:{
                type:String,
                default:'middle',
                validator(value){
                    return ['middle','small','big','mini'].includes(value)
                }
            }
        },
        computed:{
            outerStyle(){
                const {$props:props} = this
                const style = this.$helper.newObj()
                style.border = `1px solid ${props.color}`
                if(props.fill){
                    style.color = '#fff'
                    style.backgroundColor = props.color
                }else{
                    style.color = props.color
                }
                return style
            },
            outerClassName(){
                const {$props:props} = this
                const classname = ['add-comment-button',`size--${props.size}`]
                return classname
            }
        }
    }
</script>

<style scoped lang="less">

    .add-comment-button{
        outline:none;
        border:0;
        background-color:transparent;
        box-sizing:border-box;
        position:relative;

        .comment-button--title{
            font-size:.85em;
        }

        &.size--mini{
            border-radius:3px;
            padding:2px 4px;

            .comment-button--title{
                font-size:.7em;
            }
        }

        &.size--small{
            border-radius:4px;
            padding:4px 8px;

            .comment-button--title{
                font-size:.8em;
            }
        }

        &.size--middle{
            border-radius:5px;
            padding:5px 10px;

            .comment-button--title{
                font-size:.85em;
            }
        }

        &.size--big{
            border-radius:6px;
            padding:6px 12px;

            .comment-button--title{
                font-size:.9em;
            }
        }

    }
</style>