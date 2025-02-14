<template>
    <div>
        <div class="alert alert-success" v-if="alertMsg">
            <button class="close" @click.prevent="alertMsg = ''">×</button>
            {{ alertMsg }}
        </div>
        <a
            v-if="bewerbungen.editSettings"
            class="btn btn-default pull-right"
            href="/alliance_candidature_setting/edit"
            lightbox-open
        >
            {{ lightbox.$sm('rules') }}
        </a>
        <h1>
            {{ lightbox.$smc('title', bewerbungen.applications.length) }}
        </h1>
        <enhanced-table
            no-search
            :table-attrs="{ class: 'table table-striped' }"
            :head="{
                user: { title: lightbox.$sm('user').toString(), noSort: true },
                actions: { title: '', noSort: true },
            }"
        >
            <tr v-for="{ user, id } in bewerbungen.applications" :key="id">
                <td>
                    <a :href="`/profile/${user.id}`" lightbox-open>
                        {{ user.name }}
                    </a>
                    <span class="btn-group">
                        <button
                            lightbox-open
                            :href="`/messages/new?target=${encodeURIComponent(
                                user.name
                            )}`"
                            class="btn btn-xs btn-default"
                        >
                            <font-awesome-icon
                                :icon="faEnvelope"
                            ></font-awesome-icon>
                        </button>
                        <template v-if="messageTemplates.length">
                            <button
                                class="btn btn-xs btn-default dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li
                                    v-for="(
                                        { name, subject, template }, index
                                    ) in messageTemplates"
                                    :key="`${id}_${index}`"
                                >
                                    <a
                                        lightbox-open
                                        :href="`/messages/new?target=${encodeURIComponent(
                                            user.name
                                        )}&template=${index}`"
                                        :title="`${subject}\n---\n${template}`"
                                    >
                                        {{ name }}: {{ subject }}
                                    </a>
                                </li>
                            </ul>
                        </template>
                    </span>
                    <span>
                        ({{ lightbox.$sm('earnedCredits') }}:
                        {{ user.credits.toLocaleString() }})
                    </span>
                </td>
                <td style="text-align: right">
                    <template v-if="bewerbungen.editSettings">
                        <button
                            class="btn btn-success"
                            @click="accept(id, user.name)"
                        >
                            {{ lightbox.$sm('accept') }}
                        </button>
                        <button
                            class="btn btn-danger"
                            @click="decline(id, user.name)"
                        >
                            {{ lightbox.$sm('decline') }}
                        </button>
                    </template>
                </td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'bewerbungen',
    'bewerbungen',
    {
        faEnvelope: IconDefinition;
        alertMsg: string;
        messageTemplates: { name: string; subject: string; template: string }[];
    },
    {
        accept(id: number, username: string): void;
        decline(id: number, username: string): void;
        updateCredits(): Promise<void[]>;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-bewerbungen',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            faEnvelope,
            alertMsg: '',
            messageTemplates: [],
        };
    },
    methods: {
        accept(id, username) {
            this.$store
                .dispatch('api/request', {
                    url: `/verband/bewerbungen/annehmen/${id}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            `/verband/bewerbungen`,
                            window.location.origin
                        ),
                        method: 'GET',
                        mode: 'cors',
                    },
                    feature: `redesign-verband-bewerbungen-accept`,
                })
                .then(() => {
                    this.alertMsg = this.lightbox
                        .$sm('alert.accepted', { username })
                        .toString();
                    this.$set(
                        this.lightbox.data,
                        'applications',
                        this.bewerbungen.applications.filter(
                            ({ id: a }) => a !== id
                        )
                    );
                });
        },
        decline(id, username) {
            this.$store
                .dispatch('api/request', {
                    url: `/verband/bewerbungen/ablehnen/${id}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            `/verband/bewerbungen`,
                            window.location.origin
                        ),
                        method: 'GET',
                        mode: 'cors',
                    },
                    feature: `redesign-verband-bewerbungen-decline`,
                })
                .then(() => {
                    this.alertMsg = this.lightbox
                        .$sm('alert.declined', { username })
                        .toString();
                    this.$set(
                        this.lightbox.data,
                        'applications',
                        this.bewerbungen.applications.filter(
                            ({ id: a }) => a !== id
                        )
                    );
                });
        },
        async updateCredits() {
            return Promise.all(
                this.bewerbungen.applications
                    .filter(({ user: { credits } }) => !credits)
                    .map(({ user }) => {
                        const url = new URL(
                            `/profile/${user.id}`,
                            window.location.origin
                        ).toString();
                        return new Promise<void>(resolve =>
                            this.$store
                                .dispatch('api/request', {
                                    url,
                                    feature: `redesign-bewerbungen-load-credits`,
                                })
                                .then((res: Response) => res.text())
                                .then(html =>
                                    import(
                                        /*webpackChunkName: "modules/redesign/parsers/profile"*/ `../parsers/profile`
                                    ).then(async parser => {
                                        this.$set(
                                            user,
                                            'credits',
                                            (
                                                await parser.default({
                                                    doc: new DOMParser().parseFromString(
                                                        html,
                                                        'text/html'
                                                    ),
                                                    href: url,
                                                    getIdFromEl:
                                                        this.lightbox
                                                            .getIdFromEl,
                                                    LSSM: this,
                                                    $m: this.lightbox.$m,
                                                    $sm: this.lightbox.$sm,
                                                    $mc: this.lightbox.$mc,
                                                    $smc: this.lightbox.$smc,
                                                })
                                            ).credits
                                        );
                                        resolve();
                                    })
                                )
                        );
                    })
            );
        },
    },
    props: {
        bewerbungen: {
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
        bewerbungen() {
            this.updateCredits().then(() =>
                this.lightbox.finishLoading('bewerbungen-updated-data')
            );
        },
    },
    mounted() {
        if (this.$store.state.modules.messageTemplates.active) {
            this.$store
                .dispatch('settings/getSetting', {
                    moduleId: 'messageTemplates',
                    settingId: 'templates',
                })
                .then(({ value }) => (this.messageTemplates = value));
        }
        this.updateCredits().then(() =>
            this.lightbox.finishLoading('bewerbungen-mounted')
        );
    },
});
</script>

<style scoped lang="sass">
.row
    margin-left: 0
    margin-right: 0

.map-locator
  cursor: pointer
</style>
