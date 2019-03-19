<template>
    <div class="album-detail">

        <ModulePage title="专辑">

            <div class="demo">

            </div>

        </ModulePage>

    </div>
</template>

<script>
    import ModulePage from "@components/ModulePage";
    export default {
        name: "AlbumDetail",
        components:{ModulePage},
        data(){
            return {
                wallpaper:[]
            }
        },
        created(){
            this.getAlbum()
        },
        methods:{
            getAlbum(){
                const id = this.$route.params.id || ''
                if(!id) {
                    this.$toast('获取数据失败')
                    return;
                }
                this.$request.album_detail(id).then(({result:wallpaper})=>{
                    console.log(wallpaper)
                    this.wallpaper = wallpaper.wallpaper
                }).catch(err=>{
                    this.$toast(err)
                })
            }
        }
    }
</script>

<style scoped lang="less">

    .album-detail{
        width:100%;
        height:100%;
        overflow:hidden;

        .demo{
            width:100%;
            height:200vh;
        }
    }

</style>