import linkPreview from '../components/linkPreview.vue';

import type { Building } from 'typings/Building';
import type { CombinedVueInstance } from 'vue/types/vue';
import type { DefaultProps } from 'vue/types/options';
import type { Vehicle } from 'typings/Vehicle';
import type {
    LinkPreview,
    LinkPreviewComputed,
    LinkPreviewMethods,
} from 'typings/modules/GeneralExtensions/LinkPreview';

export default async (
    LSSM: Vue,
    previews: string[],
    MODULE_ID: string
): Promise<void> => {
    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        autoUpdate: true,
        feature: `${MODULE_ID}-linkPreviews`,
    });
    await LSSM.$store.dispatch('api/registerVehiclesUsage', {
        autoUpdate: true,
        feature: `${MODULE_ID}-linkPreviews`,
    });

    const previewLinkClass =
        LSSM.$store.getters.nodeAttribute('is-previewLink');
    const attrSelectors = previews.map(
        p => `a[href^="/${p}/"]:not(.${previewLinkClass})`
    );

    const links = Array.from(
        document.querySelectorAll(attrSelectors.join(','))
    );

    if (!links.length) return;

    LSSM.$store.commit('useFontAwesome');

    const infoBoxClass = LSSM.$store.getters.nodeAttribute(
        'link-preview-infobox'
    );

    await LSSM.$store.dispatch('addStyle', {
        selectorText: `.${infoBoxClass}`,
        style: {
            'position': 'fixed',
            'z-index': 20_000,
        },
    });

    let currentTimeout = null as number | null;
    let infoBoxHovered = false;

    const infoBox = document.createElement('div');
    infoBox.classList.add(infoBoxClass, 'hidden', 'panel', 'panel-default');
    const infoBoxContent = document.createElement('div');
    infoBox.append(infoBoxContent);

    infoBox.addEventListener('mouseover', () => (infoBoxHovered = true));
    infoBox.addEventListener('mouseout', () => (infoBoxHovered = false));

    document.body.append(infoBox);

    const LinkPreviewInstance = new LSSM.$vue<
        LinkPreview,
        LinkPreviewMethods,
        LinkPreviewComputed
    >({
        store: LSSM.$store,
        i18n: LSSM.$i18n,
        render: h =>
            h(linkPreview, {
                props: {
                    previewLinkClass,
                },
            }),
    }).$mount(infoBoxContent).$children[0] as CombinedVueInstance<
        Vue,
        LinkPreview,
        LinkPreviewMethods,
        LinkPreviewComputed,
        DefaultProps
    >;

    if (!LinkPreviewInstance) return;

    const buildingIcons = LSSM.$t('buildingIcons') as unknown as string[];

    const generateInfobox = (e: MouseEvent) => {
        const type = (e.target as Element)
            .getAttribute('href')
            ?.match(/^\/([^/]+)/u)?.[1];
        const id = parseInt(
            (e.target as Element)
                .getAttribute('href')
                ?.match(/\d+\/?$/u)?.[0] || '0'
        );
        if (!type || !id) return;
        LinkPreviewInstance.setMousePosition(e.clientX, e.clientY);
        // Building
        if (type === 'buildings') {
            const building = (
                LSSM.$store.state.api.buildings as Building[]
            ).find(b => b.id === id);
            if (!building) return;
            const icon = buildingIcons[building.building_type] || 'building';
            LinkPreviewInstance.setBuilding(building, icon);
        }
        // Vehicle
        else if (type === 'vehicles') {
            const vehicle = (LSSM.$store.state.api.vehicles as Vehicle[]).find(
                b => b.id === id
            );
            if (!vehicle) return;
            LinkPreviewInstance.setVehicle(vehicle);
        }
        // User
        else if (type === 'profile') {
            LinkPreviewInstance.setUser(id);
        }
        // Mission
        else if (type === 'missions') {
            LinkPreviewInstance.setMission(id);
        } else {
            return;
        }

        infoBox.classList.remove('hidden');
    };

    document.addEventListener('mouseover', e => {
        if (!(e.target as HTMLElement).matches(attrSelectors.join(','))) return;
        currentTimeout = window.setTimeout(
            () => generateInfobox(e as MouseEvent),
            500
        );
    });

    document.addEventListener('mouseout', e => {
        if (!(e.target as HTMLElement).matches(attrSelectors.join(','))) return;
        if (currentTimeout) window.clearTimeout(currentTimeout);
        if (!infoBoxHovered) {
            const hideInterval = window.setInterval(() => {
                if (!infoBoxHovered) {
                    infoBox.classList.add('hidden');
                    clearInterval(hideInterval);
                }
            }, 100);
        }
    });
};
