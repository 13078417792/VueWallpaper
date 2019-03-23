<template>
    <div id="app">

        <nav-layout>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </nav-layout>

    </div>


</template>

<script>
    import NavLayout from "@components/NavLayout"
    import {mapActions} from 'vuex'

    export default {
        components:{
            NavLayout
        },
        created(){
            // updateFromLocal
            this.updateStoreStorageFromLocal()
        },
        methods:{
            ...mapActions({
                updateStoreStorageFromLocal:'Storage/updateFromLocal'
            })
        }
    }
</script>

<style lang="less">
    @import "./assets/styles/var.less";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        width: 100%;
        height:100%;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: @bg-color;

    }

</style>
