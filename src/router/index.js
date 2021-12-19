import Vue from 'vue';
import Router from 'vue-router';
// import Dashboard from '../views/Dashboard.vue';
// import About from '../views/About.vue';
// import NotFound from '../views/NotFound.vue';
// import Layouts from '../views/Layouts.vue';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: { name: 'dashboardPage', params: { page: 1 } },
        },
        {
            path: '/dashboard',
            redirect: { name: 'dashboardPage', params: { page: 1 } },
        },
        {
            path: '/add/payment/:category?',
            redirect: (to) => {
                const { params: { category }, query } = to;
                return { name: 'addPayment', params: { page: 1, category }, query };
            },
        },
        {
            path: '/dashboard',
            component: () =>
                import (
                    /* webpackChunkName: "Layouts" */
                    '../views/Layouts.vue'
                ),
            children: [{
                path: ':view',
                name: 'dashboardPage',
                component: () =>
                    import ( /* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
                children: [{
                    path: 'add/payment/:category',
                    name: 'addPayment',
                }, ],
            }, ],
        },
        {
            path: '/about',
            component: () =>
                import (
                    /* webpackChunkName: "Layouts" */
                    '../views/Layouts.vue'
                ),
            children: [{
                path: '',
                name: 'about',
                component: () =>
                    import ( /* webpackChunkName: "About" */ '../views/About.vue'),
            }, ],
        },
        {
            path: '/404',
            name: 'notFound',
            component: () =>
                import ( /* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
        },
        {
            path: '*',
            redirect: { name: 'notFound' },
        },
    ],
});

const titles = {
    dashboard: 'Dashboard',
    dashboardPage: 'Dashboard',
    addPayment: 'Dashboard',
    about: 'About',
    notFound: '404 - Not Found!',
};

router.afterEach((to) => {
    document.title = titles[to.name];
});

export default router;