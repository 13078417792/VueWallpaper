<template>
    <div class="home-category">
        <h3 class="title">
            分类

            <span class="search-btn">
                <Icon class="search-icon" type="search" />
            </span>
        </h3>

        <ListWrapper class="category-list cl">

            <div class="category-item" v-for="(item,key) in category" :key="key">
                <div class="item-container">
                    <div class="item-container-wrapper">
                        <TyImage :src="item.cover" class="category-pic"></TyImage>
                        <section class="category-desc">
                            <p class="name">
                                {{item.name}}
                            </p>
                            <p class="count">
                                {{item.count}}张
                            </p>
                        </section>
                    </div>

                </div>
            </div>

        </ListWrapper>

    </div>
</template>

<script>
    import Icon from '@components/Icon'
    import ListWrapper from '@components/ListWrapper'
    import {mobileFetch as http} from '@utils/http'
    import TyImage from '@components/TyImage'
    export default {
        name: "Category",
        components:{
            Icon,ListWrapper,TyImage
        },
        data(){
            return {
                category:[]
            }
        },
        mounted(){
            this.fetch()
        },
        methods:{
            fetch(){
                http('CATEGORY').then(({res:{category}})=>{
                    this.category = category
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/styles/var.less";

    .home-category{
        padding:0 @padding;

        @line-height:1.5;
        .title{
            text-align:left;
            line-height:@line-height;
            // padding:0 @padding;
            vertical-align:top;
            display:inline-block;
            width:100%;
            box-sizing:border-box;


            .search-btn{
                float:right;
                transform:scale(@line-height);
                color:@desc-font;
            }
        }

        .category-list{
            // margin-right:-@padding;

            .category-item{
                width:50%;
                float:left;
                margin-bottom:2em;
                padding-bottom:50%*(640/500);
                position:relative;

                .item-container{
                    width:100%;
                    height:100%;
                    position:absolute;
                    padding-right:@padding;
                    top:0;
                    left:0;


                    .item-container-wrapper{
                        width:100%;
                        height:100%;
                        border-radius:@border-radius;
                        overflow:hidden;
                        position:relative;

                        .category-pic{
                            width:100%;
                            height:100%;
                        }

                        .category-desc{
                            position:absolute;
                            left:0;
                            bottom:0;
                            width:100%;
                            /*height:35%;*/
                            background-color:#fff;

                            p{
                                margin:.5em;
                                text-align:left;
                                text-indent:.5em;
                            }

                            .name{
                                font-size:1em;
                                color:#000;
                                font-weight:600;
                            }

                            .count{
                                font-size:.9em;
                                color:@desc-font;
                            }
                        }

                    }


                }


            }

        }
    }
</style>