import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import moment from 'moment';

import config from '../../config';

import type { AllianceInfo } from 'typings/api/AllianceInfo';
import type { Building } from 'typings/Building';
import type { CreditsInfo } from 'typings/api/Credits';
import type { ModuleMainFunction } from 'typings/Module';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default (async ({ LSSM, MODULE_ID }) => {
    if (
        !window.location.pathname.match(
            new RegExp(`/profile/${window.user_id}/?`)
        )
    )
        return;

    moment.locale(LSSM.$store.state.lang);

    const generationBtn = document.createElement('button');
    generationBtn.classList.add('btn', 'btn-default', 'pull-right');

    const btnIcon = document.createElement('i');
    btnIcon.classList.add('fas', 'fa-chart-line');
    generationBtn.append(btnIcon);

    const header = document.querySelector<HTMLHeadingElement>('h1');
    if (!header) return;
    header.before(generationBtn);

    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: MODULE_ID,
    });
    await LSSM.$store.dispatch('api/registerVehiclesUsage', {
        feature: MODULE_ID,
    });
    await LSSM.$store.dispatch('api/registerAllianceinfoUsage', {
        feature: MODULE_ID,
    });
    await LSSM.$store.dispatch('api/fetchCreditsInfo', MODULE_ID);

    const alliance = document.querySelector<HTMLAnchorElement>(
        '.page-header a[href^="/alliances/"]'
    );

    generationBtn.addEventListener('click', () => {
        const {
            credits_user_current,
            credits_user_total,
            user_name,
            user_id,
            user_toplist_position,
            user_level_title,
            credits_alliance_active,
            credits_alliance_current,
            credits_alliance_total,
        }: CreditsInfo = LSSM.$store.state.api.credits;
        const profileLink = `${window.location.origin}/profile/${user_id}`;
        const toplistPage = Math.ceil(user_toplist_position / 20);

        const allianceName = alliance?.innerText;
        const allianceInfo: AllianceInfo = LSSM.$store.state.api.allianceinfo;
        const allianceRoles = {} as Record<string, number>;
        const allianceListPage = alliance
            ? Math.ceil(allianceInfo.rank / 20)
            : 0;
        if (alliance) {
            allianceInfo.users.forEach(({ roles }) =>
                roles.forEach(role => {
                    if (!allianceRoles.hasOwnProperty(role))
                        allianceRoles[role] = 0;
                    allianceRoles[role]++;
                })
            );
        }

        const { buildings }: { buildings: Building[] } = LSSM.$store.state.api;
        const extremeBuildings = {} as {
            north?: Building;
            south?: Building;
            west?: Building;
            east?: Building;
        };
        buildings.forEach(building => {
            if (building.latitude > (extremeBuildings.north?.latitude ?? -90))
                extremeBuildings.north = building;
            if (building.latitude < (extremeBuildings.south?.latitude ?? 90))
                extremeBuildings.south = building;
            if (building.longitude < (extremeBuildings.west?.longitude ?? 180))
                extremeBuildings.west = building;
            if (building.longitude > (extremeBuildings.east?.longitude ?? -180))
                extremeBuildings.east = building;
        });

        pdfMake
            .createPdf({
                pageSize: 'A4',
                info: {
                    title: `LSS-Manager Report für ${user_name}`,
                    author: 'LSS-Manager',
                },
                watermark: {
                    text: 'Created by LSS-Manager',
                    opacity: 0.03,
                },
                header: {
                    columns: [
                        {
                            width: '*',
                            text: 'LSSM Status Report',
                            alignment: 'left',
                            margin: 10,
                            link: `https://lss-manager.de/docs/${LSSM.$store.state.lang}`,
                        },
                        {
                            width: '*',
                            text: user_name,
                            alignment: 'center',
                            margin: 10,
                            link: profileLink,
                        },
                        {
                            width: '*',
                            text: moment().format('L'),
                            alignment: 'right',
                            margin: 10,
                        },
                    ],
                    columnGap: 10,
                },
                content: [
                    {
                        toc: {
                            numberStyle: {
                                bold: true,
                            },
                        },
                        margin: [0, 0, 0, 30],
                    },
                    {
                        text: 'Spielerinfos',
                        style: 'h1',
                        tocItem: true,
                    },
                    {
                        table: {
                            body: [
                                [
                                    'Spielername',
                                    { text: user_name, link: profileLink },
                                ],
                                ['User-ID', user_id],
                                [
                                    'Premium-Account',
                                    window.user_premium ? 'Ja' : 'Nein',
                                ],
                                [
                                    'Aktuelle Credits',
                                    credits_user_current.toLocaleString(),
                                ],
                                [
                                    'Gesamtverdiente Credits',
                                    credits_user_total.toLocaleString(),
                                ],
                                ['Dienstgrad', user_level_title],
                                [
                                    'Rang in der Toplist',
                                    user_toplist_position.toLocaleString(),
                                ],
                                [
                                    'Seite auf der Toplist',
                                    {
                                        text: `Seite ${toplistPage.toLocaleString()}`,
                                        link: `${window.location.origin}/toplist?page=${toplistPage}`,
                                    },
                                ],
                                ...(alliance
                                    ? [
                                          [
                                              'Verband',
                                              {
                                                  text: allianceName,
                                                  link: alliance.href,
                                              },
                                          ],
                                      ]
                                    : []),
                            ].map(([title, ...content]) => [
                                { text: `${title}:`, style: 'bold' },
                                ...content,
                            ]),
                        },
                        layout: 'noBorders',
                        margin: 10,
                    },
                    ...(alliance
                        ? [
                              {
                                  text: 'Verband',
                                  style: 'h1',
                                  tocItem: true,
                              },
                              {
                                  table: {
                                      body: [
                                          [
                                              'Verbandsname',
                                              {
                                                  text: allianceName,
                                                  link: alliance.href,
                                              },
                                          ],
                                          [
                                              'Verbands-ID',
                                              alliance.href.match(
                                                  /\d+/u
                                              )?.[0] ?? '',
                                          ],
                                          [
                                              'Verdiente Credits',
                                              credits_alliance_total?.toLocaleString() ??
                                                  0,
                                          ],
                                          [
                                              'Anzahl Mitglieder',
                                              allianceInfo.user_count.toLocaleString(),
                                          ],
                                          [
                                              'Platzierung in der Verbandsliste',
                                              allianceInfo.rank.toLocaleString(),
                                          ],
                                          [
                                              'Seite auf der Verbandsliste',
                                              {
                                                  text: `Seite ${allianceListPage.toLocaleString()}`,
                                                  link: `${window.location.origin}/alliances?page=${allianceListPage}`,
                                              },
                                          ],
                                          [
                                              'Verbandskasse aktiv',
                                              credits_alliance_active
                                                  ? 'Ja'
                                                  : 'Nein',
                                          ],
                                          [
                                              'Credits in der Verbandskasse',
                                              credits_alliance_current?.toLocaleString() ??
                                                  0,
                                          ],
                                      ].map(([title, ...content]) => [
                                          { text: `${title}:`, style: 'bold' },
                                          ...content,
                                      ]),
                                  },
                                  layout: 'noBorders',
                                  margin: 10,
                              },
                              {
                                  text: 'Mitglieder',
                                  style: 'h2',
                                  tocItem: true,
                                  tocMargin: [10, 0] as [number, number],
                                  margin: [10, 0] as [number, number],
                              },
                              {
                                  table: {
                                      body: [
                                          [
                                              'Anzahl Mitglieder',
                                              allianceInfo.user_count.toLocaleString(),
                                          ],
                                          ...Object.entries(allianceRoles),
                                      ].map(([title, ...content]) => [
                                          { text: `${title}:`, style: 'bold' },
                                          ...content,
                                      ]),
                                  },
                                  layout: 'noBorders',
                                  margin: [20, 10] as [number, number],
                              },
                          ]
                        : []),
                    {
                        text: 'Fahrzeuge',
                        style: 'h1',
                        tocItem: true,
                    },
                    {
                        text: 'Gebäude',
                        style: 'h1',
                        tocItem: true,
                    },
                    {
                        table: {
                            body: [
                                [
                                    'Anzahl Gebäude',
                                    buildings.length.toLocaleString(),
                                ],
                            ].map(([title, ...content]) => [
                                { text: `${title}:`, style: 'bold' },
                                ...content,
                            ]),
                        },
                        layout: 'noBorders',
                        margin: 10,
                    },
                    {
                        text: 'Unnützes Wissen',
                        style: 'h2',
                        tocItem: true,
                        tocMargin: [10, 0] as [number, number],
                        margin: [10, 0] as [number, number],
                    },
                    {
                        text: 'Extremstellen',
                        style: 'h2',
                        tocItem: true,
                        tocMargin: [20, 0] as [number, number],
                        margin: [20, 0] as [number, number],
                    },
                    {
                        table: {
                            body: [
                                ...Object.entries(extremeBuildings)
                                    .map(([spec, building]) =>
                                        building
                                            ? [
                                                  spec,
                                                  {
                                                      text: building.caption,
                                                      link: `${window.location.origin}/buildings/${building.id}`,
                                                  },
                                              ]
                                            : []
                                    )
                                    .filter(e => e.length),
                            ].map(([title, ...content]) => [
                                { text: `${title}:`, style: 'bold' },
                                ...content,
                            ]),
                        },
                        layout: 'noBorders',
                        margin: [30, 10] as [number, number],
                    },
                    {
                        text: 'Dokumenteninfos',
                        style: 'h1',
                        tocItem: true,
                    },
                    {
                        table: {
                            body: [
                                [
                                    'LSS-Manager Version',
                                    LSSM.$store.state.version,
                                ],
                                ['Generiert am', moment().format('LLLL:ss')],
                            ].map(([title, ...content]) => [
                                { text: `${title}:`, style: 'bold' },
                                ...content,
                            ]),
                        },
                        layout: 'noBorders',
                        margin: 10,
                    },
                ],
                footer: (currentPage, pageCount) => ({
                    columns: [
                        {
                            width: '*',
                            text: 'LSS-Manager',
                            alignment: 'left',
                            margin: 10,
                            link: 'https://lss-manager.de',
                        },
                        {
                            width: '*',
                            text: config.games[LSSM.$store.state.lang].name,
                            alignment: 'center',
                            margin: 10,
                            link: window.location.origin,
                        },
                        {
                            width: '*',
                            text: `${currentPage}/${pageCount}`,
                            alignment: 'right',
                            margin: 10,
                        },
                    ],
                }),
                defaultStyle: {
                    fontSize: 12,
                },
                styles: {
                    h1: {
                        bold: true,
                        fontSize: 15,
                    },
                    h2: {
                        bold: true,
                        fontSize: 14,
                    },
                    bold: {
                        bold: true,
                    },
                },
            })
            .open();
    });
}) as ModuleMainFunction;
