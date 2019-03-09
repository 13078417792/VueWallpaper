<template>
    <keep-alive>
        <New />
    </keep-alive>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import NavLayout from '@components/NavLayout'
    import New from './Home/New'

    @Component({
        components: {
            NavLayout,
            New
        },
        data(){
            return {
                current_part:'home',
                scrollTop:{
                    home:0,
                    category:0,
                    album:0
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
    }
</script>


<style lang="less">

</style>