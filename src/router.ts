import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Category from './views/Category.vue'

Vue.use(Router)
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta:{
                nav:true
            }
        },
        {
            path: '/category',
            name: 'category',
            component: ()=>import('./views/Category.vue'),
            meta:{
                nav:true
            }
        }
    ],
    // scrollBehavior(to, from, savedPosition) {
    //     if(savedPosition){
    //         return savedPosition
    //     }
    //     return {x:0,y:0}
    // }

})
