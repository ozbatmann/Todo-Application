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
                        name="firstName"
                        v-model="registirationData.firstName"
                        solo
                        flat
                        placeholder="İsim"
                        background-color="grey lighten-4"
                        color="black"
                        v-validate="'required'"
                        :error-messages="errors.collect('firstName')"
                ></v-text-field>
                <v-text-field
                        name="middleName"
                        v-model="registirationData.middleName"
                        solo
                        flat
                        placeholder="İkinci İsim"
                        background-color="grey lighten-4"
                        color="black"
                ></v-text-field>
                <v-text-field
                        name="lastName"
                        v-model="registirationData.lastName"
                        solo
                        flat
                        placeholder="Soy İsim"
                        background-color="grey lighten-4"
                        color="black"
                        v-validate="'required'"
                        :error-messages="errors.collect('lastName')"
                ></v-text-field>

                <v-text-field
                        name="username"
                        v-model="registirationData.username"
                        solo
                        flat
                        placeholder="Kullanıcı Adı"
                        background-color="grey lighten-4"
                        color="black"
                        v-validate="'required'"
                        :error-messages="errors.collect('username')"
                ></v-text-field>


                <v-text-field
                        name="password"
                        v-model="registirationData.password"
                        solo
                        flat
                        placeholder="Şifre"
                        background-color="grey lighten-4"
                        color="black"
                        type="password"
                        v-validate="'required|min:6'"
                        :error-messages="errors.collect('password')"
                        ref="password"
                ></v-text-field>
                <v-text-field
                        name="confirmPassword"
                        v-model="registirationData.confirmPassword"
                        solo
                        flat
                        placeholder="Şifrenizi Onaylayın"
                        background-color="grey lighten-4"
                        color="black"
                        type="password"
                        v-validate="'required|confirmed:password'"
                        :error-messages="errors.collect('confirmPassword')"
                ></v-text-field>
                <v-layout>
                    <v-flex xs4>
                        <v-btn
                                depressed
                                color="primary"
                                class="white--text mx-0 mt-3"
                                @click="register"
                        >
                           Register
                        </v-btn>
                    </v-flex>
                    <v-flex xs8 text-xs-right pt-1>
                        <div style="font-size: 16px;" class="secondary-text primary--text text--accent-2"  @click="showLoginScreen">Login
                        </div>
                    </v-flex>
        </v-layout>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>

    export default {
        name: "Register",
        data: () => {
            return{
                registirationData:{
                    firstName: null,
                    middleName: null,
                    lastName: null,
                    username: null,
                    password: null,
                    confirmPassword: null
                },
                loading: false
            }
        },
        methods: {
            register(){
                this.$validator.validateAll().then((result) => {
                    this.loading = true;
                    this.$http.post('/auth/register', this.registirationData)
                        .then(result => {
                            this.$router.push({name:'Login'});
                        }).catch(error => {
                        console.log(`Error is here: ${error}`);
                    }).finally(() => {
                        this.loading = false;
                    })
                });
            },
            showLoginScreen(){
                this.$router.push({name:'Login'});
            }
        }
    }
</script>

<style scoped>

</style>

