import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home " */'@/views/Home.vue'),
    },
    {
        path: '/technologies',
        name: 'Technologies',
        component: () => import(/* webpackChunkName: "home " */'@/views/Technologies.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
