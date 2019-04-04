<template>
    <v-dialog v-model="showDialog" persistent max-width="500px">
        <v-card class="pa-3">
            <v-card-title>
                <span v-if="isEdit" class="headline">Update Todo Item</span>
                <span v-else class="headline">Add Todo Item</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md pa-0>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field v-validate="'required'" :error-messages="errors.collect('name')"v-model="data.name"
                                          label="Name" name="name"
                                          background-color="grey lighten-4"
                                          color="black" full-width>
                            </v-text-field>
                            <v-text-field v-validate="'required'" :error-messages="errors.collect('description')"v-model="data.description"
                                          label="Description" name="description"
                                          background-color="grey lighten-4"
                                          color="black" full-width>
                            </v-text-field>
                            <v-select
                                    v-model="data.todoStatus"
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
                            ></v-select>
                            <v-select
                                    v-model="data.dependentTodo"
                                    :items="todoItems"
                                    item-text="name"
                                    item-value="id"
                                    label="Dependent"
                                    class="m-input-capitalize"
                                    background-color="grey lighten-4"
                                    color="green accent-2"
                                    solo
                                    flat
                            ></v-select>
                            <v-menu
                                    ref="menu"
                                    :close-on-content-click="false"
                                    v-model="menu"
                                    :return-value.sync="data.endDate"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                            >
                                <v-combobox
                                        slot="activator"
                                        v-model="data.endDate"
                                        chips
                                        readonly
                                        label="End Date"
                                        class="m-input-capitalize"
                                        background-color="grey lighten-4"
                                        color="green accent-2"
                                        solo
                                        flat
                                ></v-combobox>
                                <v-date-picker v-model="data.endDate" no-title scrollable >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="menu = false">Close</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu.save(data.endDate)">Save</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" outline @click.native="close">Close</v-btn>
                <v-btn v-if="isEdit" color="blue darken-1" outline @click.native="edit">Update</v-btn>
                <v-btn v-else color="blue darken-1" outline @click.native="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                menu: false,
                showDialog: false,
                isEdit: false,
                data: {
                    id: null,
                    name: null,
                    description: null,
                    todoStatus: null,
                    todoListId: null,
                    endDate: null,
                    dependentTodo: {
                        id:null,
                        name:null
                    }
                },
                todoStatus: ['INCOMPLETE','COMPLETE','EXPIRED'],
                todoItems:[]
            }
        },
        mounted(){

        },
        methods: {
            getAllTodoItemsDropDownSource(data){
                    this.loading = false;
                    this.$http.get(`/todo/todoItems?todoId=${data !== undefined ? data.id : null}&todoListId=${this.$route.params.id}`).then((result) => {
                        this.todoItems = result.data.data;
                        this.loading = true;
                    }).catch((error) => {
                        console.log(error);
                    })
            },
            open(data) {
                this.showDialog = true;
                this.getAllTodoItemsDropDownSource(data);
                if (data) {
                    this.data.id = data.id;
                    this.data.name = data.name;
                    this.data.description = data.description;
                    this.data.todoStatus = data.todoStatus;
                    this.data.todoListId = data.todoList.id;
                    this.data.endDate = data.endDate;
                    debugger;
                    this.data.dependentTodo = data.dependentTodo != null ? data.dependentTodo.dependentTodo : undefined;
                    this.isEdit = true;
                } else {
                    this.clear();
                }
            },
            close() {
                this.showDialog = false;
                this.clear();
                this.$validator.reset();
            },
            save() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.data.todoListId = this.$route.params.id;
                        this.$emit("save", this.data);
                        this.close();
                    }
                });
            },
            edit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        debugger;
                        this.$emit("edit", this.data);
                        this.close();
                    }
                });
            },
            clear() {
                this.data = {
                    todoId: null,
                    name: null,
                    description: null,
                    todoStatus: null,
                    todoListId: null,
                    endDate: null,
                    dependentTodo:null
                };
                this.isEdit = false;
            }
        }
    }
</script>

<style scoped>

</style>