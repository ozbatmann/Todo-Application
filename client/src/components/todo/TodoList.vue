<template>
    <v-container fluid>
        <v-layout column>
            <v-toolbar class="elevation-1">
                <v-toolbar-title>Todo List</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <v-btn icon slot="activator" @click="openAddTodoListDialog">
                        <v-icon>add</v-icon>
                    </v-btn>
                    <span>Ekle</span>
                </v-tooltip>
            </v-toolbar>

            <v-layout row>
                <v-flex xs12>
                    <v-data-table :headers="headers" disable-initial-sort :items="tableItems" :pagination.sync="pagination"
                                  :total-items="totalItems" :loading="loading" class="elevation-1" :rows-per-page-items="[5,10,25,50,100]">
                        <template slot="items" slot-scope="props">
                            <table-row-action :props="props" :actions="rowActions" @edit="openEditTodoListDialog" @delete="deleteTodoList"
                                                  @goToTodoListTodo="goToTodoListTodo">
                                <slot>
                                    <td class="text-xs-left">{{ props.item.name }}</td>
                                </slot>
                            </table-row-action>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>

            <todo-list-add-edit-dialog ref="todoListAddEditDialog" @save="addTodoList" @edit="editTodoList"></todo-list-add-edit-dialog>

        </v-layout>
    </v-container>
</template>

<script>
    import TodoListAddEditDialog from './TodoListAddEditDialog';
    import TableRowAction from '../shared/TableRowAction'
    export default {
        name: "TodoList",
        components: {TodoListAddEditDialog,TableRowAction},
        data: () => {
            return{
                loading: false,
                headers: [
                    {text: 'Name', value: 'name',filteredData: null}
                ],
                tableItems: [],
                totalItems: 0,
                pagination: {
                    rowsPerPage: 5,
                    sortBy: 'name',
                    descending: '',
                    page: 1

                },
                rowActions: [
                    {
                        icon: "edit",
                        event: "edit",
                        tooltip: "Update"

                    },
                    {
                        icon: "present_to_all",
                        event: "goToTodoListTodo",
                        tooltip: "Go To Todo Items"

                    },
                    {
                        icon: "delete",
                        event: "delete",
                        tooltip: "Delete"

                    },

                ],
            }
        },
        watch: {
            pagination: {
                handler() {
                    this.getAllTodoLists()
                },
                deep: true
            }
        },
        mounted(){
            this.getAllTodoLists();
        },
        methods: {
            getAllTodoLists() {
                this.loading = true;
                this.$http.get(`/todoList?userId=${this.$store.state.userId}&sortBy=${this.pagination.sortBy}&direction=${this.pagination.descending === false ? 'asc' : 'desc'}`).then((result) => {
                    this.tableItems = result.data.data;
                    this.totalItems = result.data.count;
                    this.loading = false;
                }).catch((error) => {
                    console.log(error);
                })
            },
            openAddTodoListDialog(){
                this.$refs.todoListAddEditDialog.open();
            },
            openEditTodoListDialog(props) {
                this.$http.get(`/todoList/detail?todoListId=${props.item.id}`).then((result) => {
                    this.$refs.todoListAddEditDialog.open(result.data.data);
                }).catch((error) => {
                    console.log(error);
                })
            },
            addTodoList(todoList) {
                this.$http.post("/todoList", todoList).then((result) => {
                    this.getAllTodoLists();
                }).catch((error) => {
                    console.log(error);
                })
            },
            editTodoList(todoList) {
                this.$http.put("/todoList", todoList).then((result) => {
                    this.getAllTodoLists();
                }).catch((error) => {
                    console.log(error);
                })
            },
            deleteTodoList(props) {
                this.$http.delete(`/todoList/${props.item.id}`).then((result) => {
                    this.getAllTodoLists();
                }).catch((error) => {
                    console.log(error);
                })
            },
            goToTodoListTodo(props){
                this.$router.push({name: "Görev Listesi", params: {id: props.item.id}});
            }
        }
    }
</script>

<style scoped>

</style>