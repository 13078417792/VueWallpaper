<template>
    <div class="album-detail">

        <ModulePage :title="!album || !album.name?defaultTitleName:album.name">

            <div class="preview-image">

                <TouchToggleParent v-if="wallpaper && wallpaper.length" first-message="没有更多了" last-message="没有更多了" @toggle="handleTouchToggle">
                    <p>123</p>
                    <TouchToggleChildren v-for="(item,key) in wallpaper" :key="key" class="wallpaper-item">

                        <img class="preview" :src="item.img || item.wp" alt="">
                        <div class="user-act-bar">
                            <IconButton class="comment-icon" :icon="`likegood${is_rank(item.id)?'':'-line'}`" font-size="1.3em" :label="item.rank" :active="is_rank(item.id)" @click="likegood(item.id)" />
                            <IconButton class="comment-icon" :icon="`like${ isFavor(item.id)?'':'-line'}`" :active="isFavor(item.id)" label="收藏" font-size="1.3em" />
                        </div>

                        <section class="wallpaper-comment">

                            <div class="top cl">

                                <span class="left-part">
                                    <Icon class="comment-icon" type="comment" />
                                    <span>评论</span>
                                </span>

                                <div class="fr right-part">
                                    <AddCommentButton @click="openCommentForm" size="small" />
                                </div>

                            </div>


                            <template v-if="comment.hasOwnProperty(item.id)">
                                <Loading :size="20" v-if="comment[item.id].loading" />
                                <Empty class="empty-comment" content="暂无评论" v-else-if="comment[item.id].loading===false && comment[item.id].list.length===0" />

                                <ul class="comment-list" v-else>

                                    <li class="cl" v-for="(commentItem,commentKey) in comment[item.id].list" :key="commentKey">
                                        <Avatar class="fl user-avatar" :src="commentItem.user.avatar" size="35px" />

                                        <div class="comment-item-right-part">

                                            <span class="desc-user-comment name">
                                                {{commentItem.user.name}}
                                            </span>

                                            <span class="time desc-user-comment">
                                                {{time(commentItem.atime)}}
                                            </span>

                                            <p class="content">{{commentItem.content}}
                                                <span class="rank"  >
                                                    <Icon class="rank-icon" :type="`likegood${commentItem.isup?'':'-line'}`" />
                                                    <span class="rank-count">
                                                        {{commentItem.size}}
                                                    </span>
                                                </span>
                                            </p>

                                        </div>
                                    </li>

                                </ul>
                            </template>

                        </section>


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
    import AddCommentButton from '@components/AddCommentButton'
    import Empty from '@components/Empty'
    import Loading from '@components/Loading'
    import Avatar from '@components/Avatar'
    import dayjs from 'dayjs'
    console.log(dayjs)
    // const dayjs = require('dayjs')


    export default {
        name: "AlbumDetail",
        components:{ModulePage,TouchToggleParent,TouchToggleChildren,Icon,IconButton,AddCommentButton,Empty,Loading,Avatar},
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
                is_rank:'Storage/is_rank',
                is_login:'Storage/is_login'
            }),
            time(){
                return time=>dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        methods:{
            ...mapMutations({
                addRandRecord:'Storage/addRandRecord'
            }),
            openCommentForm(){
                console.log('openCommentForm')
            },
            likegood(id){
                // console.log(id)
                if(!this.is_login){
                    this.$helper.tips('请先登录')
                    return;
                }
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
                if(comment.hasOwnProperty(detail.id)) return;
                this.$set(this.comment,detail.id,{
                    list:[],
                    isfavor:false,
                    loading:true
                })
                this.update_comment(detail.id)
            },
            update_comment(id,uid){
                this.$request.get_comment(id,uid).then(result=>{
                    if(result.code!==0) return;
                    const {res} = result
                    console.log(res.comment)
                    this.$set(this.comment,id,{
                        list:res.comment,
                        isfavor:!!res.wallpaper.isfavor,
                        loading:false
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
                    // this.comment
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

            .wallpaper-item{
                padding-bottom:3em;
            }

            .preview{
                display:block;
                max-width:100%;
            }

            .user-act-bar{
                height:2em;
                display:flex;
                justify-content:space-around;
                align-items:center;
                background-color:#fff;

                .comment-icon{
                    font-size:.9em;
                }
            }

            .wallpaper-comment{
                margin-top:10px;
                width:100%;
                background-color:#fff;
                /*padding:.8em .5em;*/
                padding-top:.8em;

                .top,.empty-comment{
                    padding:0 .5em;
                }

                .top{
                    overflow:hidden;
                    margin-bottom:1em;

                    .left-part{
                        float:left;

                        .comment-icon{
                            font-size:1.5em;
                            color:#21A0FF;
                        }

                        >span{
                            display:inline-block;
                            font-size:.85em;
                            margin-left:3px;
                            overflow:hidden;
                        }
                    }

                }

                .empty-comment{
                    height:50px;
                }

                .comment-list{

                    >li{
                        border-bottom:1px solid @border-color;
                        padding:1em .5em;

                        &:last-child{
                            border-bottom:0;
                        }


                        .user-avatar{
                            margin-right:10px;
                        }

                        .comment-item-right-part{
                            overflow:hidden;
                            min-height:35px;

                            .desc-user-comment{
                                font-size:.8em;
                                color:#666;
                                display:block;
                                margin-bottom:3px;

                                &:last-child{
                                    margin-bottom:0;
                                }
                            }

                            .content{
                                margin:0;
                                white-space: pre-line;
                                font-size:.9em;
                                color:#000;
                                position:relative;
                                line-height:1.5em;

                                .rank{
                                    position:absolute;
                                    top:0;
                                    right:0;

                                    .rank-icon{
                                        font-size:1.5em;

                                        &.on{
                                            color:@warn-color;
                                        }
                                    }

                                    .rank-count{
                                        white-space:initial;
                                        text-align:center;
                                        display:inline-block;
                                        font-size:1.1em;
                                        line-height:1;
                                        overflow:hidden;
                                    }


                                }
                            }

                        }
                    }
                }


            }


        }
    }

</style>