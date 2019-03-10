<template>
    <h3 class="title--header">
        {{title}}
    </h3>
</template>

<script>
    export default {
        name: "Title",
        props:{
            title:String
        }
    }
</script>

<style scoped lang="less">
    .title--header{
        color: #2c3e50;
    }
</style>