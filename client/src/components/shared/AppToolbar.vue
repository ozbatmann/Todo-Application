<template>
    <v-toolbar flat color="primary" fixed dark app class="elevation-3">
        <v-chip color="white" text-color="primary" disabled>
            <v-avatar>
                <v-icon>account_circle</v-icon>
            </v-avatar>
            {{$store.state.username}}
        </v-chip>

        <v-spacer></v-spacer>

        <v-btn icon @click="handleFullScreen()">
            <v-icon>fullscreen</v-icon>
        </v-btn>

            <v-btn icon flat @click="logout()">
               <v-icon>exit_to_app</v-icon>
            </v-btn>


    </v-toolbar>
</template>

<script>
    export default {
        name: "AppToolbar",
        methods: {
            handleFullScreen () {
                let doc = window.document;
                let docEl = doc.documentElement;

                let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
                let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

                if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                    requestFullScreen.call(docEl);
                }
                else {
                    cancelFullScreen.call(doc);
                }
            },
            logout(){
                this.$store.commit('setUserValidation',false);
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>