<template>
    <h1 class="title--header" v-if="title_level===1">
        {{title}}
    </h1>
    <h2 class="title--header" v-else-if="title_level===2">
        {{title}}
    </h2>
    <h3 class="title--header" v-else-if="title_level===3">
        {{title}}
    </h3>
    <h4 class="title--header" v-else-if="title_level===4">
        {{title}}
    </h4>
    <h5 class="title--header" v-else-if="title_level===5">
        {{title}}
    </h5>
    <h6 class="title--header" v-else-if="title_level===6">
        {{title}}
    </h6>
</template>

<script>
    export default {
        name: "Title",
        props:{
            title:String,
            level:{
                type:Number,
                default:3
            }
        },
        computed:{
            title_level(){
                const {level} = this.$props
                if(level<=0){
                    return 1
                }
                if(level>6){
                    return 6
                }
                return level
            }
        }
    }
</script>

<style scoped lang="less">
    .title--header{
        color: #2c3e50;
    }
</style>