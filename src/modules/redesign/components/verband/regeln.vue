<template>
    <div>
        <a
            v-if="rules.edit_text"
            class="btn btn-default pull-right"
            lightbox-open
            href="/veband/text/edit?close-after-submit"
        >
            <font-awesome-icon :icon="faEdit"></font-awesome-icon>
        </a>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <p v-for="(t, index) in rules.rules" :key="index" v-html="t"></p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';

export default defineComponent({
    name: 'verband-regeln',
    data() {
        return {
            faEdit,
        };
    },
    props: {
        rules: {
            type: Object,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        lightbox: {
            type: Object,
            required: true,
        },
        $m: {
            type: Function,
            required: true,
        },
        $mc: {
            type: Function,
            required: true,
        },
        getSetting: {
            type: Function,
            required: true,
        },
        setSetting: {
            type: Function,
            required: true,
        },
    },
    watch: {
        rules() {
            this.lightbox.finishLoading('verband/regeln-updated-data');
        },
    },
    mounted() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const Alliance = this;
        this.$store.dispatch('event/addListener', {
            name: 'redesign-edit-alliance-text-submitted',
            listener({ detail: { rules } }: CustomEvent) {
                if (Alliance.rules.meta.self)
                    Alliance.$set(Alliance.lightbox.data, 'rules', rules);
            },
        });
        this.lightbox.finishLoading('verband/regeln-mounted');
    },
});
</script>
