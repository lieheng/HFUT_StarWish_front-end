import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../components/Main.vue'
import History from '../components/History.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/history',
            name: 'History',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: History
        }
    ]
})

export default router
