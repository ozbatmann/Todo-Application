import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userValidation: false,
        userId: null,
        username: null,
        sidebar:{
            show: true,
            mini: false
        }
    },
    mutations: {
        setUserValidation (state,value) {
            state.userValidation = value;
        },
        setUserId (state,value) {
            state.userId = value;
        },
        setUsername (state,value) {
            state.username = value;
        }
    }
})


export default store;