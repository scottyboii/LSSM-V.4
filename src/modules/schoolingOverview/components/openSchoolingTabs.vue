<template>
    <tabs :on-select="(_, index) => (currentTab = tabTitles[index])">
        <tab v-for="tab in tabTitles" :key="tab" :title="tab">
            <enhanced-table
                :head="heads"
                :table-attrs="{ class: 'table table-striped' }"
                @sort="setSorting"
                :sort="sort"
                :sort-dir="sortDir"
                :search="search"
                @search="s => (search = s)"
            >
                <tr
                    v-for="(schooling, id) in schoolings"
                    :key="id"
                    class="schooling_opened_table_searchable"
                >
                    <td>
                        <a
                            class="btn btn-success"
                            :href="`/schoolings/${schooling.id}`"
                        >
                            {{ schooling.name }}
                        </a>
                    </td>
                    <td>{{ schooling.seats }}</td>
                    <td>{{ schooling.price }}</td>
                    <td :id="`education_schooling_${schooling.id}`">
                        {{ schooling.end }}
                    </td>
                    <td v-html="schooling.owner"></td>
                </tr>
            </enhanced-table>
        </tab>
    </tabs>
</template>

<script lang="ts">
import Vue from 'vue';

import type {
    OpenSchoolingTabs,
    OpenSchoolingTabsComputed,
    OpenSchoolingTabsMethods,
    OpenSchoolingTabsProps,
} from 'typings/modules/SchoolingOverview/OpenSchoolingTabs';

export default Vue.extend<
    OpenSchoolingTabs,
    OpenSchoolingTabsMethods,
    OpenSchoolingTabsComputed,
    OpenSchoolingTabsProps
>({
    name: 'lssmv4-so-openSchoolingTabs',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        const heads = {} as Record<
            string,
            {
                title: string;
            }
        >;
        ['name', 'seats', 'price', 'end', 'owner'].forEach(
            head =>
                (heads[head] = {
                    title: this.$t(
                        `modules.schoolingOverview.titles.${head}`
                    ).toString(),
                })
        );
        const all = this.$t('modules.schoolingOverview.all') as string;
        const tabTitles = [all, ...Object.keys(this.$t('schoolings'))];
        return {
            heads,
            tabTitles,
            currentTab: tabTitles[0],
            search: '',
            sort: 'name',
            sortDir: 'asc',
            all,
        } as OpenSchoolingTabs;
    },
    computed: {
        schoolings() {
            const schoolings = this.tabs[this.currentTab] || [];
            return (
                this.search
                    ? schoolings.filter(a =>
                          JSON.stringify(Object.values(a))
                              .toLowerCase()
                              .match(this.search.toLowerCase())
                      )
                    : schoolings
            ).sort((a, b) => {
                let modifier = 1;
                if (this.sortDir === 'desc') modifier = -1;
                if (a[this.sort] < b[this.sort]) return -1 * modifier;
                if (a[this.sort] > b[this.sort]) return modifier;
                return 0;
            });
        },
    },
    methods: {
        setSorting(key) {
            const s = key;
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
    },
    props: {
        tabs: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
