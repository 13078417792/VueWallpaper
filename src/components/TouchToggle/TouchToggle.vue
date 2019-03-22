<template>
    <div class="touch-toggle__parent"

    >

        <div class="touch-toggle__parent--wrapper transition"
             :style="wrap_style">
            <slot></slot>
        </div>

    </div>
</template>

<script>
    import AlloyFinger from 'alloyfinger'
    let af
    export default {
        name: "TouchToggle",
        props:{
            firstMessage:{
                type:String,
                default:''
            },
            lastMessage:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                wrapper_style:{},
                children:[],
                initMove:[0,0],
                currentIndex:0,
                transform:[0,0],
                transition:true
            }
        },
        computed:{
            wrap_style(){
                return this.wrapper_style
            }
        },
        mounted(){
            this.init()
            af = new AlloyFinger(this.$el,{})
            af.on('swipe',this.handleSwipe)
        },
        updated(){
            // this.init()
        },
        methods:{
            handleSwipe({direction}){
                let {currentIndex,children} = this
                const count = children.length
                if(direction==='Right'){
                    if(currentIndex>0){
                        this.currentIndex-=1;
                    }else if(currentIndex===0 && this.$props.firstMessage){
                        this.$toast({
                            message:this.$props.firstMessage,
                            position:'bottom'
                        })
                    }

                }else if(direction==='Left'){
                    if(currentIndex<count-1){
                        this.currentIndex+=1;
                    }else if(currentIndex===count-1 && this.$props.lastMessage){
                        this.$toast({
                            message:this.$props.lastMessage,
                            position:'bottom'
                        })
                    }

                }
                this.setWrapStyle({
                    transform:`translate3d(${100/count*this.currentIndex*-1}%,0,0)`
                })
                this.$emit('toggle',this.currentIndex)
            },
            init(){
                this.children = []
                this.getAvailableChildren(function(){},()=>{
                    this.$emit('toggle',this.currentIndex)
                })
            },
            setWrapStyle(css){
                if(this.$helper.get_type(css)!=='object') return false;
                for(let name in css){
                    this.$set(this.wrapper_style,name,css[name])
                }
                return true
            },
            getAvailableChildren(callback=function(){},finish=function(){}){
                const slots = this.$slots.default || []
                let count = 0
                let index = 0
                slots.forEach(slot=>{
                    const ins = slot.componentInstance
                    if(ins && ins.$options.name==='TouchToggleChildren'){
                        this.children.push(ins)
                        Promise.resolve(ins).then(ins=>{
                            ins.setCss({
                                width:`${100/count}%`,
                                transform:`translate3d(${100*index}%,0,0)`
                            })
                            callback(ins,index,count)
                            index++
                        })

                    }else{
                        slot.elm.style.display = 'none'
                    }
                })
                count = this.children.length
                finish(this.children,count)
                this.setWrapStyle({
                    width:`${count*100}%`
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .touch-toggle__parent{
        width:100%;
        height:100%;
        overflow:hidden;

        .touch-toggle__parent--wrapper{
            width:100%;
            height:100%;
            overflow:hidden;
            position:relative;

            &.transition{
                transition:transform .3s;
            }

        }
    }
</style>