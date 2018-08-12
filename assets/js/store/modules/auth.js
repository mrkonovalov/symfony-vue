import {AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/auth'
import {USER_REQUEST}                                        from '../actions/user'
import axios                                                 from 'axios'
// import apiCall                                               from 'utils/api'

const state = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
};

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit(AUTH_REQUEST);
            axios({
                url: 'auth',
                data: user,
                method: 'POST'
            })
                .then(resp => {
                    const token = resp.data.token;
                    localStorage.setItem('user-token', token); // store the token in localstorage
                    axios.defaults.headers.common['Authorization'] = token;
                    commit(AUTH_SUCCESS, token);
                    // you have your token, now log in your user :)
                    dispatch(USER_REQUEST);
                    resolve(resp)
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                    delete axios.defaults.headers.common['Authorization'];
                    reject(err)
                })
        })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem('user-token');
            resolve()
        })
    }
};

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status        = 'success';
        state.token         = resp.token;
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: (state) => {
        state.status        = 'error';
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}