import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/calc',
        name: 'calculator',
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '../pages/Calc.vue'),
    }, ],
});


const titles = {
    dashboard: 'Dashboard',
    about: 'About',
    404: '404 - Not Found',
};

router.afterEach((to) => {
    document.title = titles[to.name];
});

export default router;