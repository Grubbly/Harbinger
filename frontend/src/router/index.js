import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import TheLanding from '@/components/TheLanding';
import WalletProfile from '@/components/WalletProfile';
import TheImportWalletForm from '@/components/TheImportWalletForm';
import TheCreateNewWalletForm from '@/components/TheCreateNewWalletForm';

const routes = [
    {
        path: '/',
        name: 'TheLanding',
        component: TheLanding
    },
    {
        path: '/wallet/:walletName',
        name: 'WalletProfile',
        component: WalletProfile
    },
    {
        path: '/import',
        name: 'TheImportWalletForm',
        component: TheImportWalletForm
    },
    {
        path: '/createWallet',
        name: 'TheCreateNewWalletForm',
        component: TheCreateNewWalletForm
    },
    {
        // 404 Redirect to TheLanding component
        path: '*',
        redirect: '/'
    }
];

export default new Router({
    mode: 'history',
    routes: routes
});