import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
Vue.use(Router);

import AppLayout from '@/components/shared/AppLayout';
import Todo from '@/components/todo/Todo';
import TodoList from '@/components/todo/TodoList';
import Account from '@/components/user/Account';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login,
            name: 'Login',
            meta: {
                title: 'Giriş Yapın',
            }
        },  {
            path: '/register',
            component: Register,
            name: 'Register',
            meta: {
                title: 'Kayıt Olun',
            }
        },
        {
            path: '/',
            component: AppLayout,
            name: 'Anasayfa',
            meta: {
                title: 'Anasayfa',
                noCache: true,
                requiresAuth: true

            },
            children: [
                {
                    path: '/account',
                    component: Account,
                    name: 'Hesabım',
                    meta: {
                        title: 'Hesabım',
                        noCache: true,
                        requiresAuth: true
                    }
                },

                {
                    path: '/todoList',
                    component: TodoList,
                    name: 'Yapılacaklar Listesi',
                    meta: {
                        title: 'Yapılacaklar Listesi',
                        noCache: true,
                        requiresAuth: true
                    }
                },
                {
                    path: '/todo/:id',
                    component: Todo,
                    name: 'Görev Listesi',
                    meta: {
                        title: 'Görev Listesi',
                        noCache: true,
                        requiresAuth: true
                    }
                }

            ]
        }
       // {
         //   path: '*',
        //    component: PageNotFound
       // }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.userValidation) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        }
    }
    next();
    document.title = to.meta.title;

});
export default router
