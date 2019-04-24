<template>
    <v-toolbar class="elevation-1">
        <v-menu
                v-model="menu"
                bottom
                origin="center center"
                transition="slide-y-transition"
                :close-on-content-click="false"
                :nudge-width="300"
        >
            <v-btn icon slot="activator">
                <v-icon>filter_list</v-icon>
            </v-btn>

            <v-card>
                <v-list color="primary">
                    <v-list-tile avatar >
                        <v-list-tile-avatar>
                            <v-icon>filter_list</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Filter</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>

                <v-divider></v-divider>

                <v-list three-line>

                    <v-list-tile class="pl-1" >
                            <v-list-tile-content>
                                <v-text-field v-validate="'required'" :error-messages="errors.collect('name')"v-model="filter[0].value"
                                              label="Name" name="name"
                                              background-color="grey lighten-4"
                                              color="black" full-width style="width: 325px;" >
                                </v-text-field >
                            </v-list-tile-content>

                        </v-list-tile>

                    <v-list-tile class="pl-1" >
                        <v-list-tile-content>
                            <v-select
                                    v-model="filter[1].value"
                                    :items="todoStatus"
                                    item-text="name"
                                    label="Status"
                                    :error-messages="errors.collect('todoStatus')"
                                    v-validate="'required'"
                                    class="m-input-capitalize"
                                    background-color="grey lighten-4"
                                    color="green accent-2"
                                    solo
                                    flat
                                    style="width: 325px;"
                            ></v-select>
                        </v-list-tile-content>

                    </v-list-tile>
                </v-list>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn flat @click="clearFiltering">Close</v-btn>
                    <v-btn color="primary" flat @click="processFiltering()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>

        <v-item-group multiple v-show="showChips">
            <v-item
                    v-for="(chip,index) in chips"
                    :key="index">
                <v-chip v-if="chip.value !== ''"
                        slot-scope="{ active, toggle }"
                        close
                        @input="onClose(chip)">
                    <strong>{{ chip.key }}:</strong>&nbsp;
                    {{(chip.value)}}
                </v-chip>
            </v-item>
        </v-item-group>

    </v-toolbar>
</template>

<script>
    export default {
        name: "FilteringBar",
        props:[],
        data () {
            return {
                menu: false,
                showChips: false,
                filter:[
                    {key: 'Name', value: ''},
                    {key: 'Status', value: ''}],
                todoStatus: ['INCOMPLETE','COMPLETE','EXPIRED'],
                chips:[],

            }
        },
        methods:{
            processFiltering(){
                this.showChips = true;
                this.chips = this.filter;
                this.$emit('processFiltering',this.chips);
                this.menu = false;

            },
            clearFiltering(){
                this.menu = false;
            },
            onClose(item){
                this.chips.find(chip => chip === item).value = '';
                this.processFiltering();
            }
        }
    }
</script>

<style scoped>

</style>