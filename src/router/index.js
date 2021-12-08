import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/add/payment/',
            name: 'addpayment',
            component: () =>
                import ('../components/AddPaymentForm.vue'),
        },
        {
            path: '/add/payment/:categorySelected',
            name: 'addpaymentWithCategory',
            component: () =>
                import ('../components/AddPaymentForm.vue'),
        },
    ],
});

export default router;