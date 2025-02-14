<template>
    <lightbox name="appstore" no-title-hide>
        <h1>
            AppStore
            <button class="btn btn-success" :disabled="!changes" @click="save">
                {{ $m('save') }}
            </button>
            <button class="btn btn-danger" :disabled="!changes" @click="reset">
                {{ $m('reset') }}
            </button>
        </h1>
        <label class="search_label">
            <input
                type="search"
                class="search_input_field"
                v-model="moduleSearch"
                :placeholder="$t('search')"
            />
        </label>
        <ul class="auto-sized-grid">
            <li
                v-for="moduleId in modulesFiltered"
                :key="moduleId"
                class="card"
                :class="{
                    dev: modules[moduleId].dev || modules[moduleId].alpha,
                    mapkit: hasMapkitConflict(moduleId),
                }"
            >
                <toggle-button
                    class="pull-right appstore-toggle"
                    :value="modules[moduleId].active"
                    :active="modules[moduleId].active"
                    @change="toggleModule(moduleId, $event)"
                    :id="
                        $store.getters.nodeAttribute(
                            `appstore-toggle-${moduleId}`,
                            true
                        )
                    "
                    :disabled="hasMapkitConflict(moduleId)"
                    labels
                    :ref="`moduleSwitch_${moduleId}`"
                ></toggle-button>
                <a
                    :href="$store.getters.moduleWiki(moduleId)"
                    class="pull-right lightbox-open wiki-btn"
                >
                    <span class="glyphicon glyphicon-info-sign"></span>
                </a>
                <small v-if="hasMapkitConflict(moduleId)" class="mapkit-notice">
                    {{ $m('noMapkit') }}
                </small>
                <small v-if="modules[moduleId].dev" class="dev-notice">
                    {{ $m('dev') }}
                </small>
                <div class="appstore-content">
                    <h4>
                        <b>{{ $t(`modules.${moduleId}.name`) }}</b>
                    </h4>
                    <br />
                    <span
                        v-if="
                            modules[moduleId].description !==
                            `modules.${moduleId}.description`
                        "
                    >
                        {{ modules[moduleId].description }}
                    </span>
                </div>
            </li>
        </ul>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import isEqual from 'lodash/isEqual';

import type { DefaultProps } from 'vue/types/options';
import type { Modules } from 'typings/Module';
import type {
    AppstoreComputed,
    AppstoreData,
    AppstoreMethods,
} from 'typings/components/Appstore';

export default Vue.extend<
    AppstoreData,
    AppstoreMethods,
    AppstoreComputed,
    DefaultProps
>({
    name: 'lssmv4-appstore',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ './lightbox.vue'
            ),
    },
    data() {
        const modules = this.$store.getters.appModules as Modules;
        Object.keys(modules).forEach(
            moduleId =>
                (modules[moduleId] = {
                    ...modules[moduleId],
                    description: this.$t(
                        `modules.${moduleId}.description`
                    ).toString(),
                })
        );
        return {
            modules,
            modulesSorted: this.$store.getters.modulesSorted as string[],
            activeStart: Object.keys(modules).filter(
                m => modules[m].active
            ) as string[],
            moduleSearch: '' as string,
        };
    },
    computed: {
        active() {
            return Object.keys(this.modules)
                .filter(module => this.modules[module].active)
                .sort();
        },
        changes() {
            return !isEqual(this.active, [...this.activeStart].sort());
        },
        modulesFiltered() {
            return this.modulesSorted.filter(m =>
                this.moduleSearch.length > 0
                    ? JSON.stringify([
                          m,
                          this.$t(`modules.${m}.name`),
                          this.$t(`modules.${m}.description`),
                      ])
                          .toLowerCase()
                          .match(this.moduleSearch.toLowerCase())
                    : true
            );
        },
    },
    methods: {
        hasMapkitConflict(moduleId) {
            return this.modules[moduleId].noMapkit && this.$store.state.mapkit;
        },
        toggleModule(moduleId, event) {
            this.$set(this.modules[moduleId], 'active', !!event.value);
            this.$store.commit('setAppstoreChanges', this.changes);
        },
        save() {
            this.$store
                .dispatch('storage/set', {
                    key: 'activeModules',
                    value: [...new Set(this.active)],
                })
                .then(() => {
                    this.activeStart = [...new Set(this.active)];
                    this.$store.commit('setAppstoreChanges', this.changes);
                    this.$store.commit('setAppstoreReload');
                })
                .catch(err => this.$store.dispatch('console/error', err));
        },
        reset() {
            Object.keys(this.modules).forEach(module => {
                this.$set(
                    this.modules[module],
                    'active',
                    this.activeStart.includes(module)
                );
                (
                    this.$refs[`moduleSwitch_${module}`] as unknown as {
                        toggled: boolean;
                    }[]
                )[0].toggled = this.activeStart.includes(module);
            });
            this.$store.commit('setAppstoreChanges', this.changes);
        },
        $m: (key, args) =>
            (window[PREFIX] as Vue).$t(`modules.appstore.${key}`, args),
    },
    mounted() {
        (window[PREFIX] as Vue).$appstore = this;
    },
});
</script>

<style scoped lang="sass">
@import 'src/sass/mixins/autoSizedGrid'

.search_label
    position: absolute
    right: 1em
    top: calc(1em + 32px)

.auto-sized-grid
    @include auto-sized-grid

    .card
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
        transition: 0.3s
        border-radius: 5px
        padding: 1rem

        &.dev,
        &.mapkit

            .appstore-content
                cursor: not-allowed
                pointer-events: none
                opacity: 0.5
                font-size: unset
                display: inline-block
                transition: 0.3s

            .mapkit-notice,
            .dev-notice
                display: inline-block
                transition: 0.3s
                font-size: 0

            .mapkit-notice
                color: red

            .dev-notice
                color: yellowgreen

        &:hover
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)

            &.dev,
            &.mapkit

                .mapkit-notice,
                .dev-notice
                    font-size: small

                &:hover

                    .appstore-content
                        font-size: 0

        .wiki-btn
            margin-right: 1rem
</style>
