import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'test' }
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('@/components/test')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        from.name ? next({ name: from.name }) : next('/')
    } else {
        // Vue.prototype.$loading()
        next()
    }
})

router.afterEach((to, from) => {
    // Vue.prototype.$loading().close()
})

export default router
