<template>
    <section class="user-center-easy-info-wrap">

        <div class="user-center-easy-info cl" :style="{height:user_info_height}">
            <Avatar :src="avatar" class="user-login-avatar" :size="user_info_height" />
            <div class="right">
                <p class="name overflow">
                    <span>{{username}}</span>
                </p>

                <p class="position overflow">
                    <span>{{position}}</span>
                </p>
            </div>
        </div>


    </section>
</template>

<script>
    import Avatar from './Avatar'
    export default {
        name: "UserCenterEasyInfo",
        components:{Avatar},
        props:{
            avatar:String,
            username:String,
            position:{
                type:String,
                default:'China'
            }
        },
        data(){
            return {
                user_info_height:'3.2em'
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../assets/styles/var.less';
    .user-center-easy-info-wrap{
        width:100%;
        padding:1.1em 0;
        border-bottom:1px solid @border-color;

        .user-center-easy-info{
            width:100%;
            height:3em;

            .user-login-avatar{
                float:left;
                margin-right:1em;
            }

            .right{
                overflow:hidden;
                height:100%;

                p{
                    width:100%;
                    /*display:flex;*/
                    /*align-items:center;*/
                    display:block;
                    margin:0;
                }

                .name{
                    height:60%;
                    font-size:1em;
                }

                .position{
                    height:40%;
                    font-size:.9em;
                    color:#999;
                }
            }
        }

    }
</style>