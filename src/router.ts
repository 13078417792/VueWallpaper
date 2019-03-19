import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            nav: true
        }
    }, {
        path: '/category',
        name: 'category',
        component: () => import('./views/Category.vue'),
        meta: {
            nav: true
        }
    }, {
        path: '/user',
        name: 'user',
        component: () => import('./views/User.vue'),
        meta: {
            nav: true
        }
    }, {
        path: '/album/detail/:id',
        name: 'album-detail',
        component: () => import('./views/AlbumDetail.vue')
    }]

})
