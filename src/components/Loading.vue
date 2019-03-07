<template>
    <div class="loading">

        <div class="loading-container" :style="container_style">
            <canvas class="outside" ref="outside" :width="real_size" :height="real_size"></canvas>
            <canvas class="inside" ref="inside" :width="real_size" :height="real_size"></canvas>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Loading",
        props:{
            size:{
                type:Number,
                default:30
            },
            border:{
                type:Number,
                default:2
            },
            color:{
                type:String,
                default:'#FF5722'
            }
        },
        computed:{
            real_size(){
                const {$props:props} = this
                return props.size + props.border
            },
            container_style(){
                const {real_size} = this
                return {
                    width:`${real_size}px`,
                    height:`${real_size}px`
                }
            },
            inside_style(){
                const {$props:{border}} = this
                return {
                    top:`${border}px`,
                    left:`${border}px`
                }
            },
            outside_ctx(){
                const {outside} = this.$refs
                return outside.getContext('2d')
            },
            inside_ctx(){
                const {inside} = this.$refs
                return inside.getContext('2d')
            }
        },
        data(){
            return {
                start:-90,
                end:0,
                last_timestamp:0,
                frame_index:null
            }
        },
        mounted(){
            this.draw_outside()
            this.draw_inside()
            this.run(300)
        },
        destroyed(){
            window.cancelAnimationFrame(this.this.frame_index)
            this.this.frame_index = null
        },
        methods:{
            angle(angle){
                return (Math.PI/180)*angle
            },
            draw_outside(){
                const {real_size,$props:props,outside_ctx} = this
                outside_ctx.beginPath();
                const point =(real_size-props.border)/2;
                const radius = real_size/2
                outside_ctx.arc(radius,radius,point,0,this.angle(360))
                outside_ctx.lineWidth = props.border
                outside_ctx.strokeStyle = props.color
                outside_ctx.globalAlpha = 0.5
                outside_ctx.stroke()
                outside_ctx.closePath()
            },
            draw_inside(){
                const {start,end} = this
                const {real_size,$props:props,inside_ctx} = this
                inside_ctx.clearRect(0,0,real_size,real_size)
                inside_ctx.beginPath();
                const point =(real_size-props.border)/2;
                const radius = real_size/2
                inside_ctx.arc(radius,radius,point,this.angle(start),this.angle(end))
                inside_ctx.lineWidth = props.border
                inside_ctx.strokeStyle = props.color
                inside_ctx.stroke()
                inside_ctx.closePath()
            },
            run(speed=100){
                this.frame_index = requestAnimationFrame((timestamp)=>{
                    // console.log(timestamp)
                    const {last_timestamp} = this
                    const time = (timestamp - last_timestamp) / 1000
                    this.last_timestamp = timestamp
                    this.start += speed * time
                    this.end += speed * time
                    this.draw_inside()
                    this.run(speed)
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .loading{
        display:block;

        .loading-container{
            margin:1em auto;
            position:relative;

            canvas{
                position:absolute;
                top:0;
                left:0;

                &.outside{
                    z-index:9;
                }

                &.inside{
                    z-index:10;
                }
            }

        }
    }
</style>