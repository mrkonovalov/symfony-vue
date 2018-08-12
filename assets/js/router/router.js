import Vue     from 'vue'
import Router  from 'vue-router'
import Home    from '../components/Home'
import Login   from '../components/Login'
import Account from '../components/Account'
import Users   from '../components/Users'
import store   from '../store/index'

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return
    }
    next('/login')
};

export default new Router({
    // mode: 'history',
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: '/account',
            name: 'Account',
            component: Account,
            beforeEnter: ifAuthenticated,
        },
        {
            path: '/users',
            name: 'Users',
            component: Users,
            beforeEnter: ifAuthenticated,
        },
    ],
})