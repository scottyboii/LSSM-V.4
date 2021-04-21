<template>
    <toggle-button
        :name="name"
        labels
        class="setting-toggle"
        :class="{ 'pull-right': pullRight }"
        v-model="updateValue"
        :disabled="disabled"
    ></toggle-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'settings-toggle',
    props: {
        name: {
            type: String,
            required: true,
        },
        value: {
            type: Boolean,
            required: true,
        },
        pullRight: {
            type: Boolean,
            required: false,
            default: true,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        updateValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
});
</script>

<style scoped lang="sass">
.setting-toggle.pull-right
    transform: translateY(-32px)
</style>
