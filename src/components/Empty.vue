<template>
    <section class="data-empty-tips">
        <span class="tips-content overflow">
            {{content}}
        </span>
    </section>
</template>

<script>
    export default {
        name: "Empty",
        props:{
            content:{
                type:String,
                default:'暂无数据'
            }
        }
    }
</script>

<style scoped lang="less">

    .data-empty-tips{
        width:100%;
        /*height:100%;*/
        height:150px;
        position:relative;

        .tips-content{
            position:absolute;
            top:50%;
            left:50%;
            max-width:100%;
            text-align:center;
            transform:translate(-50%,-50%);
            color:#aaa;
            font-size:.85em;
        }
    }

</style>