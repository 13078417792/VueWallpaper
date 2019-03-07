<template>
    <div class="home">
        <!--<div class="container cl">-->
            <!--<div class="content-wrap" :style="wrap_style">-->
                <!--<div class="content" v-for="(item,key) in nav_arr" :key="key">-->
                    <!--<Component :is="components[ucfirst(item)]" />-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <div class="part" >
            <div class="part-content" ref="container">
                <keep-alive>
                    <Component :is="components[ucfirst(current_part)]" />
                </keep-alive>
            </div>
        </div>

        <Nav :part="current_part" @toggle="toggleNav" />
    </div>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import {wallpaper} from '@utils/http'
    import Nav from "@components/Nav"

    @Component({
        components: {
            Nav
        },
        data(){
            return {
                current_part:'home',
                scrollTop:{
                    home:0,
                    category:0,
                    album:0
                },
                components:{
                    Home:()=>import ('./Home/New'),
                    Category:()=>import ('./Home/Category'),
                    Album:()=>import ('./Home/Album'),
                }
            }
        },
        computed:{
            nav_arr(){
                return Object.keys(this.components)
            },
            part(){
                return this.ucfirst(this.current_part)
            },
            wrap_style(){
                const {nav_arr,current_part} = this
                const nav_index = nav_arr.indexOf(this.ucfirst(current_part))
                return {
                    transform:`translate3d(${nav_index*-100}vw,0,0)`
                }
            }
        }
    })
    export default class Home extends Vue {
        ucfirst(str){
            if(!str) return ''
            if(str.length===1) return str.toLocaleUpperCase()
            return `${str[0].toLocaleUpperCase()}${str.slice(1)}`
        }

        toggleNav(part){
            const {current_part} = this
            const {container} = this.$refs
            this.scrollTop[current_part] = container.scrollTop
            this.current_part = part
            this.$nextTick(()=>{
                this.$refs.container.scrollTo({
                    top:this.scrollTop[part],
                    left:0,
                    behavior:'auto'
                })
            })


        }
    }
</script>


<style lang="less">
    @import "../assets/styles/var.less";
    .home{
        width:100vw;
        height:100vh;
        /*display:flex;*/
        overflow:hidden;
        background-color:@bg-color;

        /*.container{
            overflow:hidden;
            width:100%;
            height:100%;
            padding-bottom:@bottom-nav-height;
            box-sizing:border-box;

            .content-wrap{
                width:300%;
                height:100%;
                overflow:hidden;
                transition:transform .3s;


                .content{
                    float:left;
                    width:100vw;
                    height:100%;
                    overflow-x:hidden;
                    overflow-y:auto;
                }
            }
        }*/

        .part{
            width:100%;
            height:100%;
            padding-bottom:@bottom-nav-height;

            .part-content{
                width:100%;
                height:100%;
                overflow-x:hidden;
                overflow-y:auto;
            }

            .gd{
                transition:transform .3s;
            }

            .slide-enter{
                .gd;
                transform:translate3(100%,0,0);
            }

            .slide-leave,.slide-enter{
                .gd;
                transform:translate3(0,0,0);
            }

            .slide-leave-active{
                .gd;
                transform:translate3(-100%,0,0);
            }

        }
    }

</style>