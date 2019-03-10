<template>
    <div v-if="parent" v-show="show" :class="{'tab-panel-item':true}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabItem",
        props:{
            title:String
        },
        data(){
            return {
                parent:null,
            }
        },
        created(){
            this.parent = this.findParent('Tabs')
        },
        computed:{
            show(){
                const {parent:{active},title} = this
                return active===title
            }
        },
        watch:{

        },
        methods:{
            findParent(name){
                let parent = this.$parent
                while(parent){
                    if(parent.$options.name===name) return parent
                    parent = parent.$parent
                }
                return null
            }
        }
    }
</script>

<style scoped lang="less">
    .tab-panel-item{
        width:100%;
        /*display:none;*/


        &.show{
            display:block;
        }

    }
</style>