import type { Schooling } from 'typings/Schooling';
import type {
    OpenSchoolings,
    OwnSchoolings,
} from 'typings/modules/SchoolingOverview/main';

export default (
    LSSM: Vue,
    doc = document
): {
    ownSchoolings: OwnSchoolings;
    openSchoolings: OpenSchoolings;
} => {
    const allTab = LSSM.$t('modules.schoolingOverview.all').toString();
    const ownSchoolings: OwnSchoolings = {
        amounts: {},
        tabs: {
            [allTab]: [],
        },
    };
    doc.querySelectorAll('#schooling_own_table tbody tr').forEach(schooling => {
        const btn = schooling.querySelector('a.btn-success') as HTMLLinkElement;
        if (!btn) return;
        const name = btn.textContent || '';
        if (!ownSchoolings.amounts.hasOwnProperty(name))
            ownSchoolings.amounts[name] = 0;
        ownSchoolings.amounts[name]++;
        const category =
            name?.match(/^.*?-/u)?.[0].replace('-', '').trim() || '';
        const endNode = schooling.querySelector('td:nth-of-type(2)');
        const owner = schooling.querySelector('td:nth-of-type(3)');
        if (!endNode || !owner) return;
        const end = parseInt(endNode.getAttribute('sortvalue') || '0');
        if (!ownSchoolings.tabs.hasOwnProperty(category))
            ownSchoolings.tabs[category] = [];
        const element = {
            id: new URL(btn.href).pathname.replace(/\D+/gu, ''),
            name,
            end,
            owner: owner.innerHTML,
        };
        ownSchoolings.tabs[category].push(element);
        ownSchoolings.tabs[allTab].push(element);
    });

    const openSchoolings: OpenSchoolings = {
        amounts: {},
        tabs: {
            [allTab]: [],
        },
    };
    doc.querySelectorAll(
        '#schooling_opened_table tr.schooling_opened_table_searchable'
    ).forEach(schooling => {
        const btn = schooling.querySelector('a.btn-success') as HTMLLinkElement;
        if (!btn) return;
        const name = btn.textContent || '';
        const category =
            name?.match(/^.*?-/u)?.[0].replace('-', '').trim() || '';
        if (!openSchoolings.amounts.hasOwnProperty(name))
            openSchoolings.amounts[name] = { amount: 0, seats: 0 };
        openSchoolings.amounts[name].amount++;
        const seatNode = schooling.querySelector('td:nth-of-type(2)');
        const endNode = schooling.querySelector('td:nth-of-type(4)');
        const owner = schooling.querySelector('td:nth-of-type(5)');
        if (!seatNode || !endNode || !owner) return;
        const seats = parseInt(seatNode.textContent || '0');
        openSchoolings.amounts[name].seats += seats;
        const price =
            schooling.querySelector('td:nth-of-type(3)')?.textContent || '';
        const end = parseInt(endNode.getAttribute('sortvalue') || '0');
        if (!openSchoolings.tabs.hasOwnProperty(category))
            openSchoolings.tabs[category] = [];
        const element = {
            id: new URL(btn.href).pathname.replace(/\D+/gu, ''),
            name,
            seats,
            price,
            end,
            owner: owner.innerHTML,
        };
        openSchoolings.tabs[category].push(element);
        openSchoolings.tabs[allTab].push(element);
    });

    Object.values(
        Object.entries(
            LSSM.$t('schoolings') as unknown as Record<string, Schooling[]>
        ).flatMap(([cat, schoolings]) =>
            Object.values(schoolings).map(
                ({ caption }) => `${cat} - ${caption}`
            )
        )
    ).forEach(
        schooling =>
            !openSchoolings.amounts.hasOwnProperty(schooling) &&
            (openSchoolings.amounts[schooling] = { amount: 0, seats: 0 })
    );

    return { ownSchoolings, openSchoolings };
};
