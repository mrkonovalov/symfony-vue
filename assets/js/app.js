import Vue     from 'vue'
import Vuetify from 'vuetify'
import axios   from 'axios'
// стили
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

// настройки
import router from './router/router'
import store  from './store'

// главный шаблон
import App from './pages/App'

Vue.config.productionTip = false;

const token = localStorage.getItem('user-token');
if (token) {
    axios.defaults.headers.common['Authorization'] = token
}

Vue.use(Vuetify, {
    iconfont: 'fa'
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
});