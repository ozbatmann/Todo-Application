<template>
    <v-dialog v-model="showDialog" persistent max-width="500px">
        <v-card class="pa-3">
            <v-card-title>
                <span v-if="isEdit" class="headline">Update Todo List</span>
                <span v-else class="headline">Add Todo List</span>
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
                showDialog: false,
                isEdit: false,
                data: {
                    id: null,
                    name: null,
                    userId: null,
                }
            }
        },
        methods: {
            open(data) {
                this.showDialog = true;
                if (data) {
                    this.data = data;
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
                        this.data.userId = this.$store.state.userId;
                        this.$emit("save", this.data);
                        this.close();
                    }
                });
            },
            edit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.data.userId = this.$store.state.userId;
                        this.$emit("edit", this.data);
                        this.close();
                    }
                });
            },
            clear() {
                this.data = {
                    todoListId: null,
                    name: null,
                    userId: null
                };
                this.isEdit = false;
            }
        }
    }
</script>

<style scoped>

</style>