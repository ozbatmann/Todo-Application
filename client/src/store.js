import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexPersistenceConfig = {
    persistence : {
        storage: window.localStorage,
    }
};

const vuexLocal = new VuexPersistence(vuexPersistenceConfig);

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
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