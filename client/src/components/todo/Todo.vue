<template>
    <v-container fluid>
        <v-layout>
        <v-flex class="elevation-5">
            <v-breadcrumbs divider="-">
                <v-icon slot="divider">chevron_right</v-icon>
                <v-breadcrumbs-item :disabled="false" :to="todoListUrl" router>
                   Todo List
                </v-breadcrumbs-item>
                <v-breadcrumbs-item :disabled="true">
                    Todo Item List
                </v-breadcrumbs-item>
            </v-breadcrumbs>

            <v-layout column>
            <v-toolbar class="elevation-1">
                <v-tooltip bottom>
                    <v-btn icon slot="activator">
                        <v-icon color="primary"  medium @click="goBack()">
                            chevron_left
                        </v-icon>
                    </v-btn>
                    <span>Go Back</span>
                </v-tooltip>
                <v-toolbar-title>Todo Items</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <v-btn icon slot="activator" @click="openAddTodoDialog">
                        <v-icon>add</v-icon>
                    </v-btn>
                    <span>Add</span>
                </v-tooltip>
            </v-toolbar>
                <filtering-bar @processFiltering="processFiltering"></filtering-bar>

                <v-layout row>
                <v-flex xs12>
                    <v-data-table :headers="headers" disable-initial-sort :items="tableItems" :pagination.sync="pagination"
                                  :total-items="totalItems" :loading="loading" class="elevation-1" :rows-per-page-items="[5,10,25,50,100]">
                        <template slot="items" slot-scope="props">
                            <table-row-action :props="props" :actions="rowActions" @edit="openEditTodoDialog" @delete="deleteTodo">
                                <td class="text-xs-left">{{ props.item.name }}</td>
                                <td class="text-xs-left">{{ props.item.description }}</td>
                                <td class="text-xs-left">{{ props.item.createdDate }}</td>
                                <td class="text-xs-left">{{ props.item.endDate }}</td>
                                <td class="text-xs-left">{{ props.item.todoStatus }}</td>
                                <td v-if="props.item.dependentTodo != null" class="text-xs-left">{{ props.item.dependentTodo.dependentTodo.name }}</td>
                                <td v-else class="text-xs-left">{{ props.item.dependentTodo }}</td>
                            </table-row-action>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>

            <todo-add-edit-dialog ref="todoAddEditDialog" @save="addTodo" @edit="editTodo"></todo-add-edit-dialog>

        </v-layout>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import TodoAddEditDialog from './TodoAddEditDialog';
    import TableRowAction from '../shared/TableRowAction';
    import FilteringBar from '../shared/FilteringBar'
    export default {
        name: "Todo",
        components: {TodoAddEditDialog,TableRowAction,FilteringBar},
        data: () => {
            return{
                loading: false,
                headers: [
                    {text: 'Name', value: 'name',filteredData: null},
                    {text: 'Description', value: 'description',filteredData: null},
                    {text: 'Creation Date', value: 'createdDate',filteredData: null},
                    {text: 'End Date', value: 'endDate',filteredData: null},
                    {text: 'Status', value: 'todoStatus',filteredData: null},
                    {text: 'Dependent', value: 'dependent',filteredData: null},
                ],
                tableItems: [],
                totalItems: 0,
                pagination: {
                    rowsPerPage: 5,
                    sortBy: 'name',
                    descending: '',
                    ascending: '',
                    page: 1

                },
                rowActions: [
                    {
                        icon: "edit",
                        event: "edit",
                        tooltip: "Update"

                    },
                    {
                        icon: "delete",
                        event: "delete",
                        tooltip: "Delete"

                    },

                ],
                todoListUrl: '/todoList'
            }
        },
        watch: {
            pagination: {
                handler() {
                    this.getAllTodos()
                },
                deep: true
            }
        },
        mounted(){
            this.getAllTodos();
        },
        methods: {
            getAllTodos(data) {
                this.loading = true;
                this.$http.get(`/todo?todoListId=${this.$route.params.id}&sortBy=${this.pagination.sortBy}&direction=${this.pagination.descending === false ? 'asc' : 'desc'}&name=${data !== undefined ? data[0].value : null }&todoStatus=${data !== undefined ? data[1].value : null}`).then((result) => {
                    this.tableItems = result.data.data;
                    this.totalItems = result.data.count;
                    this.loading = false;
                }).catch((error) => {
                    console.log(error);
                })
            },
            openAddTodoDialog(){
                this.$refs.todoAddEditDialog.open();
            },
            openEditTodoDialog(props) {
                this.$http.get(`/todo/detail?todoId=${props.item.id}`).then((result) => {
                    this.$refs.todoAddEditDialog.open(result.data.data);
                }).catch((error) => {
                    console.log(error);
                })
            },
            addTodo(todo) {
                this.$http.post("/todo", todo).then((result) => {
                    this.getAllTodos();
                }).catch((error) => {
                    console.log(error);
                })
            },
            editTodo(todo) {

                var data = todo;
                if(typeof todo.dependentTodo === 'object'){
                    data.dependentTodo = todo.dependentTodo.id
                }
                this.$http.put("/todo", data).then((result) => {
                    this.getAllTodos();
                }).catch((error) => {
                    console.log(error);
                })
            },
            deleteTodo(props){
                this.$http.delete(`/todo/${props.item.id}`).then((result) => {
                    this.getAllTodos();
                }).catch((error) => {
                    console.log(error);
                })
            },
            goBack(){
                this.$router.push(this.todoListUrl);
            },
            processFiltering(data){
                this.getAllTodos(data);
            }
        }
    }
</script>

<style scoped>

</style>