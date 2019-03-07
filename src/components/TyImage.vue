<template>
    <section class="image-container">
        <div class="image" :style="style">

        </div>
    </section>
</template>

<script>
    export default {
        name: "TyImage",
        props:{
            src:{
                type:String,
                required:true
            },
            radius:{
                type:String,
                default:'0px'
            }
        },
        computed:{
            style(){
                const {$props:props} = this
                return {
                    backgroundImage:`url(${props.src})`,
                    backgroundSize:'cover',
                    borderRadius:props.radius
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";
    .image-container{
        display:inline-block;

        .image{
            background-color:@border-color;
            width:100%;
            height:100%;
        }
    }
</style>