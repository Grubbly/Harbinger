import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Landing from '@/components/Landing';
import WalletProfile from '@/components/WalletProfile';

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: Landing
    },
    {
        path: '/wallet/:walletName',
        name: 'WalletProfile',
        component: WalletProfile
    },
    {
        // 404 Redirect to Landing component
        path: '*',
        redirect: '/'
    }
];

export default new Router({
    mode: 'history',
    routes: routes
});