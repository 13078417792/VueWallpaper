<template>
    <section class="image-container" >
        <div class="image" :style="style" v-if="!is_img"></div>
        <img class="ys-img" :src="src" v-else>
    </section>
</template>

<script>
    import {mapMutations,mapGetters} from 'vuex'
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
            },
            is_img:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                image_src:''
            }
        },
        computed:{
            style(){
                const {$props:props,$data:data} = this
                return {
                    backgroundImage:`url(${props.src})`,
                    backgroundSize:'cover',
                    borderRadius:props.radius
                }
            },
            ...mapGetters({
                getValue:'Storage/getValue'
            })
        },
        created(){
            // this.request_img()
        },
        methods:{
            ...mapMutations({
                updateImageBase:'Storage/updateImageBase'
            }),
            request_img(){
                let src = this.getValue(this.$props.src)
                if(!src){
                    this.$helper.base64_img(this.$props.src,true).then(base=>{
                        this.updateImageBase({
                            src:this.$props.src,
                            dataUrl:base
                        })
                        this.image_src = base
                        console.log(base)
                    }).catch(err=>{
                        console.error(err)
                    })
                }else{
                    this.image_src = src
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

        .ys-img{
            background-color:@border-color;
            max-width:100%;
        }
    }
</style>