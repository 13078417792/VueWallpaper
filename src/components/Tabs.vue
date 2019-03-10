<template>
    <div class="tabs-container">

        <div class="tabs-nav cl">
            <template v-for="(title,key) in titles">
                <div class="nav-item" :style="{width:`${100/titles.length}%`}">
                    <tab-button :key="key" :title="title" :active="active===title" @click="toggle(title)" />
                </div>
            </template>

        </div>

        <div class="tabs-content" :style="contentStyle">
            <slot></slot>
        </div>

    </div>
</template>

<script>
    import TabButton from './TabButton'
    export default {
        name: "Tabs",
        components:{TabButton},
        model:{
            prop:'active',
            event:'toggle'
        },
        props:{
            animated:{
                type:Boolean,
                default:true
            },
            active:String,
            height:String
        },
        data(){
            return {
                nav_titles:[]
            }
        },
        computed:{
            is_slide_toggle(){
                const {slide} = this.$props
                if([true,false].includes(slide)) return slide
                return true;
            },
            slots(){
                const slots = this.$slots
                if(!slots.hasOwnProperty('default')) return []
                return slots.default.filter(el=>{
                    return ['TabItem','tab-item'].includes(el.componentOptions.tag)
                })
            },
            titles(){
                return this.slots.map(({data:{attrs:{title}},componentOptions:{propsData:{title:propsTitle}}})=>title || propsTitle)
            },
            contentStyle(){
                const {height} = this.$props
                return {height}
            }
        },
        mounted(){
            // console.log(this)
            // console.log(this.slots,this.titles)
        },
        methods:{
            toggle(title){
                this.$emit('toggle',title)
            }
        }
    }
</script>

<style scoped lang="less">
    .tabs-container{
        width:100%;

        .tabs-nav{
            width:100%;
            /*text-align:center;*/
            display:flex;
            justify-content:center;
            align-items:center;
            padding:.5em 0;

            .nav-item{
                text-align:center;
            }
        }

        .tabs-content{
            width:100%;
            overflow:auto;
        }
    }
</style>