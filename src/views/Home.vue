<template>
    <div class="home">
        <div class="container cl">
            <div class="content-wrap" :style="wrap_style">
                <div class="content" v-for="(item,key) in nav_arr" :key="key">
                    <Component :is="components[ucfirst(item)]" />
                </div>
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
            this.$data.current_part = part
        }
    }
</script>


<style lang="less">
    @import "../assets/styles/var.less";
    .home{
        width:100vw;
        height:100vh;
        display:flex;
        overflow:hidden;

        .container{
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
        }

        /*.content-wrap{
            overflow:hidden;
            width:100%;
            height:100%;
            padding-bottom:@bottom-nav-height;
            box-sizing:border-box;

            .content{
                height:100%;
                overflow-x:hidden;
                overflow-y:auto;
            }
        }*/
    }

</style>