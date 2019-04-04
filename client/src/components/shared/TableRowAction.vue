<template>
    <tr style="transform: scale(1);" @mouseover="over" @mouseleave="leave">
        <slot></slot>
        <v-fade-transition slot="append">
            <td class="hover-action-container " v-if="show">
                <v-layout row>
                    <v-tooltip bottom v-for="action in actions" :key="action.eventName"  >
                        <v-btn v-if="!action.hide && (action.condition ? action.condition(props) : true)" slot="activator" @click="click(action)" flat icon color='grey darken-2'>
                            <v-icon>{{action.icon}}</v-icon>
                        </v-btn>
                        <span>{{action.tooltip}}</span>
                    </v-tooltip>

                </v-layout>
            </td>
        </v-fade-transition>

    </tr>
</template>

<script>
    export default {
        props: ["props", "actions"],
        data() {
            return {
                show: false
            }
        },
        methods: {
            over() {
                this.show = true;
            },
            leave() {
                this.show = false;
            },
            click(action) {
                if (action.event) this.$emit(action.event, this.props);
            }
        }
    }
</script>

<style scoped>
    .hover-action-container {
        background-color: #E0E0E0;
        position: absolute;
        top: 0px;
        right: 0
    }
</style>
