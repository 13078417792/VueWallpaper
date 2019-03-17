<template>
    <div class="user">

        <Title title="个人中心" />

        <template v-if="is_login">

            <UserCenterEasyInfo :username="UserInfo.name" :avatar="UserInfo.avatar" />

            <Tabs v-model="active" height="300px">
                <TabItem title="收藏">
                    <div class="">
                        收藏233
                    </div>
                </TabItem>

                <TabItem title="下载">
                    <div class="">
                        下载
                    </div>
                </TabItem>

            </Tabs>
        </template>

        <Login v-else />


    </div>
</template>

<script>
    import Tabs from '@components/Tabs'
    import TabItem from '@components/TabItem'
    import Title from '@components/Title'
    import {mapGetters,mapState} from 'vuex'
    import Login from './UserLogin'
    import UserCenterEasyInfo from '@components/UserCenterEasyInfo'

    export default {
        name: "User",
        components:{Tabs,TabItem,Title,Login,UserCenterEasyInfo},
        data(){
            return {
                active:'收藏'
            }
        },
        computed:{
            ...mapGetters({
                is_login:'Auth/is_login',
                auth:'Storage/auth',
                UserInfo:'Storage/UserInfo'
            }),
            ...mapState({
                cookies:'Storage/cookie'
            }),
        },
        created(){
            console.log(this.UserInfo)
        }
    }
</script>

<style scoped lang="less">
    .user{
        padding:0 1.5em;
        overflow:auto;
    }
</style>