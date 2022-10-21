const modules = {
    appstore: {
        save: 'Uložit',
        reset: 'Resetovat',
        noMapkit:
            'Tento modul nefunguje s typem map "Mapkit" z důvodu omezení Mapkitu!',
        dev: 'Tento modul je v současné době ve vývoji. Aktivací může vést k neúplným funkcím.',
        closeWarning: {
            title: 'Neulozené změny',
            text: 'Ve sbírce aplikací jste provedli změny, které nejsou uloženy. Resetujte je nebo uložte a ukončete sbírku aplikací.',
            close: 'Zavřít zprávu',
        },
    },
    settings: {
        name: 'Nastavení',
        save: 'Uložit',
        discard: 'Zahodit změny',
        reset: 'Resetovat',
        export: 'Export',
        import: 'Import',
        resetWarning: {
            title: 'Resetovat nastavení',
            text: 'Opravdu chcete resetovat nastavení do počátečních hodnot? Tento krok nelze vrátit!',
            close: 'Zavřít',
            total: 'Všechna nastavení',
            module: 'Pouze pro tento modul',
        },
        resetWarningSetting: {
            title: 'Resetovat nastavení',
            text: 'Opravdu chcete resetovat toto jedno nastavení <b>{setting}</b> modulu <b>{module}</b> na výchozí hodnotu?',
            close: 'zrušení',
            reset: 'Resetovat',
        },
        closeWarning: {
            title: 'Neuložené změny',
            text: 'V nastavení jste provedli změny, které nejsou uloženy. Resetujte je nebo uložte a zavřete nastavení.',
            close: 'Zavřít zprávu',
        },
        changeList: {
            true: 'Aktivovat',
            false: 'Deaktivovat',
        },
    },
} as Record<string, Record<string, unknown>>;

export default {
    modules,
    updateUserscript: {
        title: 'Userscript out of date',
        text: `Dear LSSM-User,<br>
unfortunately your LSSM V.4 userscript is outdated. In the latest version changes have been made to the userscript, which are important for the function of the LSSM V.4.<br>
You need at least version {minVersion}, the update can be done comfortably by clicking on {updateLink}.<br>
Sometimes the update does not work by clicking the link (for unknown reasons). Then you can either trigger an update within Tampermonkey (click on the tampermonkey icon in your browser, then "Overview". Check the box in front of the LSSM userscript and select "Update" as action.<br>
If that also does not work, edit the LSSM Script within Tampermonkey by replacing all script content with the content of {bypassLink}.<br>
Sometimes, LSSM is installed multiple times after an update. In this case, please delete the script that does not have version 4.5.10 (in Tampermonkey).<br>
We're sorry for any caused issue if updates did not work correctly.
<br>
Kind regards,<br>
your LSSM team`,
        close: 'Ok',
    },
    error: {
        title: 'LSS Manager: Error',
        msg: 'Pokud k této chybě dochází často, prosím kontaktujte tým LSSM!',
    },
    warnings: {
        version: {
            title: 'Špatná verze LSS Managera',
            text: 'Vážený uživateli, bohužel jsme zjistili, že nemáte nejnovější verzi doplňku LSS Manager. Nejnovější verze je {version}, ale vy aktuálně máte {curver}. Prosíme o znovunačtení hry bez mezipaměti (pomocí Ctrl + F5, na zařízeních Apple příkaz + R), tímto může být chyba odstraněna. Pokud chyba přetrvává, prosím nahlašte to týmu LSSM! Pokud používáte špatnou verzi, nemůžeme garantovat plnou funkcionalitu doplňku LSS-Manager.',
            close: 'Uzavřít zprávu a znovunačíst hru(doporučeno)',
            abort: 'Zavřít zprávu bez znovunačtení hry',
        },
    },
    anniversary1: {
        closeNote: 'Tip: You can also click on the balloons to close!',
        title: '🎉 There is reason to celebrate! 🎉',
        content:
            'Wow, how fast time flies!<br>It\'s been <b>one year</b> since the LSS Manager V.4 went online! A lot has happened this year, of course, and so on this special occasion we would like to say a special thank you to you, the users. The joy with which you test our new features inspires us again and again and gives us new motivation to continue. Also, a big thank you goes out to our translators who volunteer their time to make the LSSM usable in other versions of the game.</br>To celebrate, we\'d like to share a few facts and figures here:<ul><li><code>February 10th 2020</code>: The First Commit on GitHub was made: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Since then we have made over 5,600 commits!</li><li><code>September 19th, 2020</code>: V.4 was officially announced for the first time on the forum: <a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a>. With this, the application phase for beta testers has also started</li><li><code>October 17th 2020</code>: Beta testers have been given access to V.4 for the first time. The 4-week beta phase has thus started</li><li><code>November 21st 2020</code>: LSS Manager V.4 goes online for everyone!</li><li>Our telemetry currently records around 5,000 users in the past 6 months. Of these, over 2,200 were active in the last 14 days. The dark figure (number of users who have deactivated telemetry) can not be estimated.</li><li>Our thread in the forum has now reached almost 1,200 messages. That\'s quite a bit, but the V.3 thread, which is currently scratching the 3,500 responses, is far from catching up.</li><li>For more stats, check out our thread in the forum:<a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a></li></ul><br>We\'re looking forward to many more great moments in the time of LSSM V.4!<br>Your LSSM Team<br>Jan, Sanni & Ron',
    },
    globalSettings: {
        name: 'Základní nastavení',
        labelInMenu: {
            title: 'Popisek namísto ikony v menu',
            description:
                'Zobrazí jednotuchý popisek v navigační liště namísto loga LSSM',
        },
        allowTelemetry: {
            description:
                'Povolit LSSM odesílat data, což pomáhá při vývoji tohoto rozšíření.',
            title: 'Povolení telemetrie',
        },
        branch: {
            description:
                'Choose here between stable, beta or a preview version. Note that preview versions are automatically deleted approx. 7 days after their last update.',
            title: 'Choose version',
        },
        iconBg: {
            description: 'Změnit barvu pozadí ikony LSSM',
            title: 'pozadí ikony LSSM',
        },
        iconBgAsNavBg: {
            description:
                'barva celé navigační lišty v barvě pozadí  ikony LSSM',
            title: 'Zbarvení navigační lišty',
        },
        debugMode: {
            title: 'Debug-Mode',
            description:
                'A small debug mode that displays helpful hints in the browser console. Enabling it is only recommended if requested by the LSSM team, as the console will contain many messages.',
        },
    },
    vehicles: {
        0: {
            caption: 'CAS 20',
            color: '#cc0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 4,
            maxPersonnel: 6,
        },
        1: {
            caption: 'CAS 30',
            color: '#bb0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 6,
        },
        2: {
            caption: 'AZ',
            color: '#d92626',
            coins: 30,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            special: 'Požadováno po vybudování 3 požárních stanic',
        },
        3: {
            caption: 'VEA',
            color: '#d02525',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            special: 'Požadováno po vybudování 6 požárních stanic',
        },
        4: {
            caption: 'TA',
            color: '#ad1f1f',
            coins: 25,
            credits: 12_180,
            minPersonnel: 2,
            maxPersonnel: 3,
            special: 'Požadováno po vybudování 4 požárních stanic',
        },
        5: {
            caption: 'RZP',
            color: '#9c1c1c',
            coins: 25,
            credits: 5000,
            minPersonnel: 3,
            maxPersonnel: 3,
        },
        6: {
            caption: 'KHA',
            color: '#aa0000',
            coins: 25,
            credits: 17_300,
            minPersonnel: 1,
            maxPersonnel: 2,
            special: 'Požadováno po vybudování 7 požárních stanic',
        },
        7: {
            caption: 'TACH',
            color: '#990000',
            coins: 25,
            credits: 19_200,
            minPersonnel: 1,
            maxPersonnel: 3,
            schooling: 'Požární stanice - Nebezpečné látky',
            shownSchooling: 'Nebezpečné látky',
            special: 'Požadováno po vybudování 11 požárních stanic',
        },
        8: {
            caption: 'Policejní automobil',
            color: '#8b1818',
            coins: 25,
            credits: 5000,
            minPersonnel: 2,
            maxPersonnel: 4,
        },
        9: {
            caption: 'Vrtulník LZS',
            color: '#e61919',
            coins: 30,
            credits: 300_000,
            minPersonnel: 3,
            maxPersonnel: 5,
        },
        10: {
            caption: 'AP',
            color: '#e61919',
            coins: 25,
            credits: 14_000,
            minPersonnel: 1,
            maxPersonnel: 2,
        },
        11: {
            caption: 'Policejní vrtulník',
            color: '#ca1616',
            coins: 30,
            credits: 300_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            schooling: 'Policie - Kurz Letecké služby PČR',
            shownSchooling: 'Členové Letecké služby PČR',
        },
        12: {
            caption: 'Obrněné vozidlo URNA',
            color: '#ca1616',
            coins: 25,
            credits: 10_000,
            minPersonnel: 6,
            maxPersonnel: 6,
            schooling: 'Policie - URNA',
            shownSchooling: 'URNA',
            special: 'Požadováno po vybudování 8 Obvodních oddělení Policie',
        },
        13: {
            caption: 'Vozidlo Kynologů PČR',
            color: '#ca1616',
            coins: 25,
            credits: 7000,
            minPersonnel: 1,
            maxPersonnel: 2,
            schooling: 'Policie - Kynologové Policie',
            shownSchooling: 'Kynologové Policie',
            special: 'Požadováno po vybudování 6 Obvodních oddělení Policie',
        },
        14: {
            caption: 'Policejní motocykl',
            color: '#ca1616',
            coins: 18,
            credits: 2500,
            minPersonnel: 1,
            maxPersonnel: 1,
            schooling: 'Policie - Policejní motocykl',
            shownSchooling: 'Strážník na motocyklu',
        },
        15: {
            caption: 'URNA SUV',
            color: '#ca1616',
            coins: 23,
            credits: 7000,
            minPersonnel: 2,
            maxPersonnel: 4,
            schooling: 'Policie - URNA',
            shownSchooling: 'URNA',
            special: 'Požadováno po vybudování 8 Obvodních oddělení Policie',
        },
        16: {
            caption: 'Protiplynový automobil',
            color: '#770000',
            coins: 25,
            credits: 11_680,
            minPersonnel: 1,
            maxPersonnel: 3,
            special: 'Požadováno po vybudování 5 požárních stanic',
        },
        17: {
            caption: 'MOS',
            color: '#791515',
            coins: 25,
            credits: 25_500,
            minPersonnel: 1,
            maxPersonnel: 6,
            schooling: 'Požární stanice - MOS (mobilní operační středisko)',
            shownSchooling: 'MOS',
            special: 'Požadováno po vybudování 13 požárních stanic',
        },
        18: {
            caption: 'Vyzidlo vyšetřovatelů DN',
            color: '#8b1818',
            coins: 10,
            credits: 15_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            schooling: 'Policie - vyšetřovatel DN',
            shownSchooling: 'Vyšetřovatel DN',
        },
        19: {
            caption: 'Vozidlo pyrotechnika PČR',
            color: '#8b1818',
            coins: 35,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            schooling: 'Policie - Policejní pyrotechnik',
            shownSchooling: 'Policejní pyrotechnik',
        },
        20: {
            caption: 'Přívěs se člunem',
            color: '#990000',
            coins: 12,
            credits: 6000,
            minPersonnel: 0,
            maxPersonnel: 0,
            special: 'Požadováno po vybudování 11 požárních stanic',
        },
        21: {
            caption: 'Přívěs se člunem VZS ČČK',
            color: '#990000',
            coins: 12,
            credits: 6000,
            minPersonnel: 0,
            maxPersonnel: 0,
            special:
                'Je potřeba tažné vozidlo (SUV VZS ČČK, Dodávka VZS ČČK). Vyžaduje osoby(4) se speciálním vzděláním v oboru odtahové vozidlo',
        },
        22: {
            caption: 'Potápěčský automobil',
            color: '#990000',
            coins: 25,
            credits: 10_000,
            minPersonnel: 2,
            maxPersonnel: 4,
            special: 'Požadováno po vybudování 11 požárních stanic',
        },
        23: {
            caption: 'SUV VZS ČČK',
            color: '#990000',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 4,
        },
        24: {
            caption: 'Dodávka VZS ČČK',
            color: '#990000',
            coins: 25,
            credits: 10_000,
            minPersonnel: 2,
            maxPersonnel: 4,
        },
        25: {
            caption: 'RV',
            color: '#9c1c1c',
            coins: 20,
            credits: 4000,
            minPersonnel: 1,
            maxPersonnel: 2,
        },
        26: {
            caption: 'IP',
            color: '#9c1c1c',
            coins: 25,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            special: 'Požadováno po vybudování 10 výjezdových stanovišť ZZS',
            schooling: 'Záchranáři - Školení inspektora provoz',
            shownSchooling: 'Školení inspektora provoz',
        },
        27: {
            caption: 'RLP',
            color: '#9c1c1c',
            coins: 30,
            credits: 10_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            schooling: 'Záchranáři - Školení lékaře',
            shownSchooling: 'Školení lékaře',
        },
        28: {
            caption: 'VYA',
            color: '#791515',
            coins: 10,
            credits: 35_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            schooling: 'Požární stanice - ',
            shownSchooling: '',
        },
        29: {
            caption: 'AJ',
            color: '#791515',
            coins: 10,
            credits: 35_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            schooling: 'Požární stanice - ',
            shownSchooling: '',
        },
        30: {
            caption: 'DA',
            color: '#791515',
            coins: 10,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 9,
        },
        31: {
            caption: 'RZA',
            color: '#791515',
            coins: 10,
            credits: 20_000,
            minPersonnel: 2,
            maxPersonnel: 3,
        },
    },
    buildingCategories: {
        'Fire Department': {
            buildings: [0, 4, 11, 13, 17],
            color: '#ff2d2d',
        },
        'Rescue Stations': {
            buildings: [3, 6, 12, 16],
            color: '#ffa500',
        },
        'Police Stations': {
            buildings: [5, 7, 8, 15, 18],
            color: '#00ac00',
        },
        'Other': {
            buildings: [2, 9, 14],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        'Firefighters': {
            vehicles: {
                'Fire trucks': [0, 1, 13, 18],
                'WaterTanker': [7],
                'Special vehicles': [2, 3, 4, 6, 8, 9, 12],
                'Wildland vehicles': [30, 31, 32, 33, 34, 38, 39, 40, 41],
                'Airport Vehicles': [17],
                'Boats': [21, 22, 24],
                'Fire Aviation': [35, 36, 37],
            },
            color: '#ff2d2d',
        },
        'Rescue Vehicles': {
            vehicles: {
                'Ambulances': [5, 27],
                'HEMS': [11],
                'First Responder': [15],
                'Rescue Boat': [25],
                'Other EMS Vehicle': [20, 28, 29],
            },
            color: '#ffa500',
        },
        'Police Vehicles': {
            vehicles: {
                'Patrol Car': [10],
                'SWAT': [16, 26],
                'Police Motorcycle': [23],
                'Police helicopter': [14],
                'K-9 Unit': [19],
                'FBI': [42, 43, 44, 45, 46],
                'Sheriff': [47],
            },
            color: '#00ac00',
        },
    },
    small_buildings: {
        0: 18,
        2: 20,
        6: 19,
    },
    schoolings: {
        'Fire Station': [
            {
                caption: 'Hazmat',
                duration: '3 Days',
            },
            {
                caption: 'Mobile command',
                duration: '5 Days',
            },
            {
                caption: 'ARFF-Training',
                duration: '3 Days',
            },
            {
                caption: 'Swift water rescue',
                duration: '4 Days',
            },
            {
                caption: 'Ocean Navigation',
                duration: '5 Days',
            },
            {
                caption: 'Airborne firefighting',
                duration: '5 Days',
            },
            {
                caption: 'Heavy Machinery Operating',
                duration: '3 Days',
            },
            {
                caption: "Truck Driver's License",
                duration: '2 Days',
            },
        ],
        'Police': [
            {
                caption: 'Police Aviation',
                duration: '7 Days',
            },
            {
                caption: 'SWAT',
                duration: '5 Days',
            },
            {
                caption: 'K-9',
                duration: '5 Days',
            },
            {
                caption: 'Police Motorcycle',
                duration: '3 Days',
            },
            {
                caption: 'FBI Mobile Center Commander ',
                duration: '7 Days',
            },
            {
                caption: 'FBI Bomb Technician',
                duration: '5 Days',
            },
            {
                caption: 'FBI Drone Operator',
                duration: '5 Days',
            },
            {
                caption: 'Sheriff',
                duration: '5 Days',
            },
        ],
    },
    amount: 'Quantity',
    search: 'Search',
    alliance: 'Alliance',
    premiumNotice:
        'This feature extends a premium feature of the game and is therefore only available for players with a Missionchief game premium account!',
    credits: 'Kredity',
    coins: 'Mincí',
    close: 'Close',
    fullscreen: {
        expand: 'Activate full screen mode',
        compress: 'Disable full screen mode',
    },
    hideTitle: 'Show heading | Hide heading',
    vehicle: 'Cars | Car | Cars',
    building: 'Buildings',
    station: 'Stations | Station | Stations',
    distance: 'Distance | Distances',
    vehicleType: 'Vehicle type',
    noOptions: 'Sorry, no matching options.',
    fmsReal2Show: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        9: 9,
    },
    pois: [
        'Park',
        'Rybník',
        'Nemocnice',
        'Les',
        'Autobusová zastávka',
        'Tramvajová zastávka',
        'Železniční stanice (regionální doprava)',
        'Železniční stanice (regionální a dálková doprava)',
        'Nákladové nádraží',
        'Supermarket (malý)',
        'Supermarket (velký)',
        'Čerpací stanice',
        'Škola',
        'Muzeum',
        'Nákupní centrum',
        'Autoservis',
        'Dálniční sjezd',
        'Vánoční trh',
        'Skladiště',
        'Diskotéka',
        'Stadion',
        'Farma',
        'Kancelářská budova',
        'Plovárna',
        'Křížení železnic',
        'Divadlo',
        'Zábavní park',
        'Řeka',
        'Malé letiště (ranvej)',
        'Velké letiště (ranvej)',
        'Letištní terminál',
        'Banka',
        'Velkosklad',
        'Most',
        'Rychlé občerstvení',
        'Nákladní přístav',
        'Sběrný dvůr',
        'Výšková budova',
        'Přístaviště výletních lodí',
        'Malý přístav',
        'Železniční přejezd',
        'Tunel',
        'Chladírenský sklad',
        'Elektrárna',
        'Továrna',
        'Šrotiště',
        'Stanice metra',
        'Malá chemická skladovací nádrž',
        'Velká chemická skladovací nádrž',
        'Hotel',
        'Bar',
        'Skládka',
        'Kryté parkoviště',
        'Silo',
        'Křižovatka se semafory',
        'Křižovatka',
        'Srub',
        'Tržnice',
        'Truhlárna',
        'Muniční sklad',
        'Sklad pyrotechniky',
        'Autobusové nádraží',
        'Vlakové nádraží',
        'Sklad uhlí',
        'Náměstí',
        'Centrum města',
        'Motorest',
        'Panelový dům',
        'Prolézačky',
        'Plnírna plynu',
        'Pole',
        'Bioplynová stanice',
        'Elektrorozvodna',
        'Staveniště',
        'Hrad',
        'Kostel',
        'Dálnice',
        'Železnice',
    ],
    only_alliance_missions: [57, 74],
};
