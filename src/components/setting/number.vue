<template>
    <div class="form-horizontal">
        <label>
            <input
                :name="name"
                :placeholder="placeholder"
                :min="min"
                :max="max"
                :step="step"
                :disabled="disabled"
                type="number"
                class="form-control"
                v-model.number="updateValue"
            />
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'settings-number',
    props: {
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: false,
        },
        min: {
            type: Number,
            required: false,
        },
        max: {
            type: Number,
            required: false,
        },
        step: {
            type: Number,
            required: false,
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
                const int = parseInt(this.value.toString());
                return Number.isNaN(int) ? this.min ?? this.max ?? 0 : int;
            },
            set(value) {
                const int = parseInt(value.toString());
                this.$emit(
                    'input',
                    Number.isNaN(int) ? this.min ?? this.max ?? 0 : int
                );
            },
        },
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%
</style>
