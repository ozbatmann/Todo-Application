<template>
    <v-app id="AppLayout">

        <v-navigation-drawer
                dark
                mobile-break-point="700"
                width="350"
                fixed app class="elevation-1"
                stateless
                value="true"
                hide-overlay
                v-model="$store.state.sidebar.show"
                :mini-variant="$store.state.sidebar.mini"
                color="primary"
        >
            <v-toolbar flat  color="primary" class="elevation-3">
                <v-flex style="margin-left: -20px;">
                </v-flex>
                <v-toolbar-title class="ml-0" v-if="!$store.state.sidebar.mini">
                    <span class="hidden-sm-and-down white--text font-weight-medium">Todo App</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon v-if="!$store.state.sidebar.mini"
                        @click.stop="$store.state.sidebar.mini = !$store.state.sidebar.mini" color="white">
                    chevron_left
                </v-icon>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list>

                <v-list-tile v-if="$store.state.sidebar.mini">
                    <v-list-tile-action>
                        <v-btn icon @click.stop="$store.state.sidebar.mini = !$store.state.sidebar.mini">
                            <v-icon>chevron_right</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>

                <v-tooltip
                        right
                        v-for="(item, i) in items"
                        light
                        :key="i"
                        :disabled="!$store.state.sidebar.mini"
                >
                    <template slot="activator">

            <v-list-tile
                    :to="{ path: item.path }" ripple="ripple"
            >
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
                    </template>
                    <span>{{item.title}}</span>
                </v-tooltip>
            </v-list>
        </v-navigation-drawer>
       <app-toolbar></app-toolbar>

        <v-content class="app-content">
            <transition name="slide-x-transition" mode="out-in">
                    <router-view></router-view>
            </transition>
        </v-content>
    </v-app>


</template>

<script>
    import AppToolbar from "./AppToolbar";
    export default {
        name: "AppLayout",
        components: {AppToolbar},
        component: {AppToolbar},
        data : () => {
            return{
                items: [
                    { title: 'Anasayfa', icon: 'dashboard', path: '/' },
                    { title: 'Hesabım', icon: 'account_circle', path: '/account' },
                    { title: 'Yapılacaklar Listesi', icon: 'bookmark', path: '/todoList' },

                ]
            }

        },
        mounted(){
        }
    }
</script>

<style scoped>
    #AppLayout {
        background-color: #FAFAFA
    }
</style>