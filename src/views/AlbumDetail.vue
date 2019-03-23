<template>
    <div class="album-detail">

        <ModulePage :title="!album || !album.name?defaultTitleName:album.name">

            <div class="preview-image">

                <TouchToggleParent v-if="wallpaper && wallpaper.length" first-message="没有更多了" last-message="没有更多了" @toggle="handleTouchToggle">
                    <p>123</p>
                    <TouchToggleChildren v-for="(item,key) in wallpaper" :key="key">

                        <img class="preview" :src="item.img || item.wp" alt="">
                        <div class="user-act-bar">
                            <IconButton class="comment-icon" :icon="`likegood${is_rank(item.id)?'':'-line'}`" font-size="1.3em" :label="item.rank" :active="is_rank(item.id)" @click="likegood(item.id)" />
                            <IconButton class="comment-icon" :icon="`like${ isFavor(item.id)?'':'-line'}`" :active="isFavor(item.id)" label="收藏" font-size="1.3em" />
                        </div>


                    </TouchToggleChildren>

                </TouchToggleParent>

            </div>

        </ModulePage>

    </div>
</template>

<script>
    import ModulePage from "@components/ModulePage";
    import TouchToggleParent from '@components/TouchToggle/TouchToggle'
    import TouchToggleChildren from '@components/TouchToggle/TouchToggleChildren'
    import Icon from '@components/Icon'
    import IconButton from '@components/IconButton'
    import {mapGetters,mapMutations} from 'vuex'

    export default {
        name: "AlbumDetail",
        components:{ModulePage,TouchToggleParent,TouchToggleChildren,Icon,IconButton},
        data(){
            return {
                defaultTitleName:'',
                wallpaper:null,
                comment:{},
                album:null
            }
        },
        created(){
            this.getAlbum()
        },
        computed:{
            isFavor(){
                return id=>{
                    if(!this.comment[id]) return false
                    return this.comment[id].isfavor
                }
            },
            ...mapGetters({
                is_rank:'Storage/is_rank'
            })
        },
        methods:{
            ...mapMutations({
                addRandRecord:'Storage/addRandRecord'
            }),
            likegood(id){
                // console.log(id)
                if(this.is_rank(id)){
                    this.$helper.tips('你已经点赞过了')
                    return;
                }
                this.addRandRecord(id)
                this.$request.set_good(id,false).then(()=>{

                    this.$helper.tips('点赞成功')
                }).catch(()=>{
                    this.$helper.tips('点赞失败')
                })
            },
            handleTouchToggle(index){
                const detail = this.wallpaper[index]
                const {comment} = this
                if(comment.hasOwnProperty(detail.id) && !!comment[detail.id]) return;
                this.update_comment(detail.id)
            },
            update_comment(id,uid){
                this.$request.get_comment(id,uid).then(result=>{
                    if(result.code!==0) return;
                    const {res} = result
                    this.$set(this.comment,id,{
                        list:res.comment,
                        isfavor:!!res.wallpaper.isfavor
                    })
                })
            },
            getAlbum(){
                const id = this.$route.params.id || ''
                if(!id) {
                    this.$toast('获取数据失败')
                    return;
                }
                this.$request.album_detail(id).then(({result:wallpaper})=>{
                    this.wallpaper = wallpaper.wallpaper
                    this.album = wallpaper.album
                }).catch(err=>{
                    this.$toast(err)
                    this.defaultTitleName = '专辑'
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";

    .album-detail{
        width:100%;
        height:100%;
        overflow:hidden;

        .preview-image{
            width:100%;
            height:100%;
            overflow:hidden;

            .preview{
                display:block;
                max-width:100%;
            }

            .user-act-bar{
                height:2em;
                display:flex;
                justify-content:space-around;
                align-items:center;
                border-bottom:1px solid @border-color;

                .comment-icon{
                    font-size:.9em;
                }
            }


        }
    }

</style>