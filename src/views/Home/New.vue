<template>
    <div class="home-new" @contextmenu="contextmenu">
        <div class="wrap cl" ref="wrap">

            <div class="img-wrap" v-for="(item,key) in newest" :key="key" @contextmenu="contextmenu">


                <div class="image-preview" >

                    <div class="img-container">
                        <div class="img" :style="{
                            backgroundImage:`url(${item.thumb})`,
                            backgroundSize:'cover'
                        }"></div>
                    </div>

                </div>
            </div>

        </div>
        <keep-alive>
            <Loading v-if="loading" :size="25" :class="{'home-new-loading':true,init}" color="#2F4056" />
        </keep-alive>

    </div>
</template>

<script>
    import {Component,Vue} from 'vue-property-decorator'
    import {wallpaper} from '@utils/http'
    import api from '@utils/api'
    import Loading from '@components/Loading'

    const http = wallpaper
    @Component({
        name: "New",
        components:{
            Loading
        },
        data(){
            return {
                newest:[],
                current_page:1,
                init:true,
                loading:false
            }
        },
        created(){
            this.loadingImageList(true)
        },
        mounted(){
            window.addEventListener('scroll',this.handleScroll,true)
        },
        destroyed(){
            window.removeEventListener('scroll',this.handleScroll,true)
        },
        activated(){
            console.log('activated')
        }
    })
    export default class New extends Vue {
        contextmenu(e){
            e.preventDefault()
            e.stopPropagation()
        }

        loadingImageList(init=false){
            this.$data.loading = true
            const limit = 30
            const {current_page} = this.$data
            http.get(api.NEW,{
                params:{
                    limit,
                    skip:limit*(current_page-1)
                }
            }).then(result=>{
                const {res:{vertical}} = result
                this.$data.newest = this.$data.newest.concat(vertical)
                this.$data.loading = false
                if(init){
                    this.init = false
                }
            })
        }

        handleScroll(event){
            const {target} = event
            const scrollTop = target.scrollTop || 0
            const {wrap} = this.$refs
            if(!wrap) return;
            const scrollHeight = wrap.clientHeight || 0
            if(scrollHeight > 0 && scrollHeight - scrollTop <= target.offsetHeight && !this.$data.loading){
                this.$data.current_page += 1;
                this.loadingImageList()
            }
            // console.log([target])
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/styles/var.less";

    .home-new{
        padding:0 1em;
        box-sizing:border-box;
        margin-top:2em;
        position:relative;

        .home-new-loading{
            /*margin-top:-4em;*/
            position:absolute;
            left:50%;
            bottom:1em;
            transform:translateX(-50%);

            &.init{
                bottom:-5em;
            }
        }

        @margin:1em;
        .wrap{
            margin-right:-@margin;
            padding-bottom:3em;

            @media screen and (min-width:1600px){
                width:1400px;
                margin-left:50%;
                transform:translateX(-50%);
            }

            .img-wrap{
                width:50%;
                height:auto;
                float:left;
                margin-bottom:2em;

                @media screen and (min-width:768px){
                    width:100%/3;
                }

                @media screen and (min-width:1366px){
                    width:100%/4;
                }
            }

            .image-preview{
                width:100%;
                padding-bottom:100%*(640/480);
                box-sizing:border-box;
                padding-right:@margin;
                /*margin-bottom:2em;*/
                /*float:left;*/
                border-radius:10px;
                position:relative;


                .img-container{
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                    padding-right:@margin;
                    box-sizing:border-box;

                    .img{
                        width:100%;
                        height:100%;
                        border-radius:10px;
                        background-color:@border-color;
                    }
                }


            }
        }
    }
</style>