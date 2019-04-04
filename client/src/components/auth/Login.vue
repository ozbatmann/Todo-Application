<template>


    <v-container
            fluid
            fill-height
            pa-0
    >
        <v-layout
                align-center
                fill-height
                wrap
        >
            <v-flex
                    xs4
                    style="position: relative;"
            >
                <v-progress-circular
                        v-show="loading"
                        :width="3"
                        color="green"
                        indeterminate
                        :size="70"
                        class="mb-5"
                ></v-progress-circular>
            </v-flex>

            <v-flex
                    xs5
                    style="position: relative;"
            >
                <div class="mb-5">
                    <h4 class="display-1 font-weight-light">
                        Welcome, <br>
                        <span class="primary--text text--accent-2">
                           TODO Application.
                        </span>
                    </h4>
                </div>
                <v-text-field
                        v-model="loginData.username"
                        name="username"
                        solo
                        flat
                        placeholder="Username"
                        background-color="grey lighten-4"
                        color="black"
                        v-validate="'required'"
                        :error-messages="errors.collect('username')"
                ></v-text-field>

                <v-text-field
                        v-model="loginData.password"
                        name="password"
                        solo
                        flat
                        hide-details
                        placeholder="Password"
                        background-color="grey lighten-4"
                        color="black"
                        type="password"
                        v-validate="'required|min:6'"
                        :error-messages="errors.collect('password')"
                ></v-text-field>

                <v-layout>
                    <v-flex xs4>
                        <v-btn
                                depressed
                                class="white--text mx-0 mt-3"
                                color="primary"
                                @click="login"
                        >
                            GİRİŞ YAP
                        </v-btn>
                    </v-flex>
                    <v-flex xs8 text-xs-right pt-1>
                        <div  @click="showRegisterScreen" style="font-size: 16px;" class="secondary-text primary--text text--accent-2">Register
                        </div>
                    </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>

    export default {
        name: "Login",
        components: {},
        data: () => {
            return{
                loginData: {
                    username: null,
                    password: null
                },
                loading: false
            }
        },
        methods: {
            register (){

            },
            login () {
                this.$validator.validateAll().then((result) => {
                    if(result){
                        this.loading = true;
                        this.$http.post('/auth/signIn', this.loginData)
                            .then(result => {
                                this.loading = false;
                                this.$store.commit('setUserValidation', true);
                                this.$store.commit('setUsername', result.data.data.username);
                                this.$store.commit('setUserId',result.data.data.id);
                                this.$router.push({name:'Anasayfa'});
                            }).catch(error => {
                            console.log(`Error is here: ${error}`);
                        })
                    }

                });

            },
            showRegisterScreen(){
               this.$router.push({name:'Register'});
            }
        }
    }
</script>

<style scoped>

   /* body {
        background: #f6f9fc;
    }
    .m-login__input label.v-label {
        font-size: 14px !important;
    }
    .m-login__background img {
        -webkit-clip-path: circle(53.7% at 38% 31%);
        clip-path: circle(53.7% at 38% 31%);
    }
    .m-login__brand {
        position: absolute;
        top: 40%;
        left: 50%;
        z-index: 5;
        width: 100%;
        text-align: center;
        -webkit-transform: translate3d(-50%, -40%, 0);
        -moz-transform: translate3d(-50%, -40%, 0);
        -ms-transform: translate3d(-50%, -40%, 0);
        -o-transform: translate3d(-50%, -40%, 0);
        transform: translate3d(-50%, -40%, 0);
    }
    .m-login__brand .brand {
        font-family: 'Century Gothic', sans-serif;
        font-size: 64px;
        width: 75%;
        text-align: justify-all;
        color: white;
    }
    .m-login__brand ~ #m-login__overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 3;
        background: rgba(0, 0, 0, 0.5);
    }
    .m-login__clip-path ~ div > h4,
    .m-login__clip-path ~ div > h2 {
        position: relative;
        z-index: 2;
    }
    .m-login__clip-path {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: -45%;
        z-index: 0;
        background: white;
        -webkit-transform: skewY(-12deg);
        -moz-transform: skewY(-12deg);
        -ms-transform: skewY(-12deg);
        -o-transform: skewY(-12deg);
        transform: skewY(-12deg);
    }*/
</style>