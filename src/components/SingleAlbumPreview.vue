<template>
    <div class="single-album-preview" v-if="album">
        <Title title="专辑" :level="4" />
        <router-link class="more-album" to="/album">更多>></router-link>
        <div class="album-cover-container">
            <TyImage class="album-cover" :src="album.lcover" :is_img="false" @click.native="$emit('checked',album.id)" />
        </div>
        <section @click="$emit('checked',album.id)" >
            <p class="name overflow">
                {{album.name}}
            </p>
            <p class="desc overflow">
                {{album.desc}}
            </p>
        </section>

    </div>
</template>

<script>
    import Title from './Title'
    import TyImage from '@components/TyImage'
    export default {
        name: "SingleAlbumPreview",
        components:{
            Title,TyImage
        },
        data(){
            return {
                album:null
            }
        },
        created(){
            this.getFirstAlbum()
        },
        methods:{
            getFirstAlbum(){
                this.$request.album_list({
                    limit:1
                }).then(({res:{album}})=>{
                    const result = album.length?album[0]:null
                    if(result){
                        this.album = result
                        console.log(result)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/styles/var.less";
    .single-album-preview{
        width:100%;
        position:relative;

        @more-album-size:.8em;
        .more-album{
            position:absolute;
            right:0;
            top:1/@more-album-size/1.6;
            transform:translateY(-50%);
            z-index:2;
            font-size:@more-album-size;
            color:@desc-font;

        }

        .album-cover-container{
            width:100%;
            height:(375/950)*100vw;
            margin-bottom:1em;
            border-radius:10px;
            overflow:hidden;
            box-shadow:0 0 10px 1px rgba(0,0,0,.3);

            .album-cover{
                width:100%;
                height:100%;
            }
        }

        section{

            p{
                margin:0;
            }

            .name{
                font-size:.95em;
                margin:-5px 0 5px 0;
                font-weight:800;
            }

            .desc{
                font-size:.8em;
                color:@desc-font;
                margin:0 0 10px;
            }

        }
    }
</style>