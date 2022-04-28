module.exports = {
    arrCounter: {
        resetTexts: {
            counter: 'liczniki',
            highlight: 'granice',
            selection: 'wybór pojazdów',
            counter_highlight: 'liczniki i granice',
            counter_selection: 'liczniki i wybór pojazdów',
            highlight_selection: 'granice i wybór pojazdów',
            counter_highlight_selection: 'liczniki, granice i wybór pojazdów',
            reset: 'Resetuj {text}',
        },
        reset: 'Resetuj {text}',
    },
    arrHover: {
        reset: 'Wybór pojazdu jest resetowany przed!',
        headers: {
            set: 'Usawienie',
            attribute: 'Nazwa',
            free: 'Wolne',
            max: 'Maks',
            status: 'Status',
        },
        titles: {
            set: 'Tak często ta kombinacja jest wybierana po naciśnięciu ZR',
            attribute: 'Kombinacja opisana w tym wierszu',
            free: 'Tak często ta kombinacja jest dostępna',
            max: 'Możesz wybrać ten ZR, dopóki ta kombinacja nie będzie już dostępna',
        },
        arrSpecs: {
            any_traffic_car: 'Radiowóz WRD',
            automatic_text_color: 'Automatyczny kolor tekstu',
            boot: 'Łodzie (ogólne)',
            building_ids: 'Posterunki',
            caption: '* Nazwa',
            category_id: 'Kategoria',
            color: 'Kolor',
            column_number: 'Numer kolumny',
            dlk: 'SH lub SD',
            elw: 'SLOp lub SLRr',
            elw2: 'Samochód dowodzenia i łączności',
            fire: 'Samochody pożarnicze',
            flood_equipment: 'Sprzęt przeciwpowodziowy',
            fly_car_any: 'Pomoc medyczna',
            foam: 'Samochód z zbiornikiem na pianę',
            foam_amount: 'Litry piany gaśniczej',
            fustw: 'Radiowóz OPI',
            fustw_or_police_motorcycle: 'Radiowóz OPI lub Motocykl Policyjny',
            fwk: 'Dźwig SP',
            gw_taucher: 'Samochód SLRw',
            gw_wasserrettung: 'Rozbudowa ratownictwa wodnego',
            gwa: 'SPGaz',
            gwgefahrgut: 'Ratownictwo chemiczne',
            gwhoehenrettung: 'SRWys',
            gwl2wasser: 'Cysterna z wodą',
            hlf_only: 'GBARt',
            hose_trucks: 'Pojazd z wężami',
            hotkey: 'Skrót',
            k9: 'Jednostka z psami',
            ktw: 'Ambulans T',
            ktw_or_rtw: 'Ambulans P, S lub T',
            mzb: 'Łódź wielozadaniowa',
            police_motorcycle: 'Motocykl Policyjny',
            polizeihubschrauber: 'Helikopter Policyjny',
            reset: 'Wyczyść poprzedni wybór w oknie wezwania.',
            rth_only: 'Śmigłowiec',
            rtw: 'Ambulans P lub S',
            rw: 'Samochód Ratownictwa Technicznego',
            swat: 'SPKP',
            swat_armored_vehicle: 'Opanerzony Pojazd SPKP',
            swat_suv: 'SUV SPKP',
            text_color: 'Kolor tekstu',
            wasser_amount: 'Litry wody',
        },
    },
    enhancedMissingVehicles: {
        vehicle: 'Typ pojazdu',
        missing: 'Brakujący na misji',
        driving: 'W drodze',
        total: 'Wciąż potrzebne',
        tip: {
            dragging: 'drag window',
            textMode: 'textmode on/off',
            minified: 'collapse',
            overlay: 'overlay',
            reload: 'reload',
            pushRight: 'show this box above vehicle list',
            pushLeft: 'show this box at original position',
        },
        selected: 'Wybrane',
        water: 'litrów wody',
        foam: 'litrów piany gaśniczej',
        staffPrefix: ['Potrzeba jeszcze'],
        towingVehicles: {
            // Note: Only the ones that are towed by vehicles of the same group! If e.g. a MzB can be towed by vehicles of several groups, it MUST NOT be listed here.
            53: [35],
            54: [19, 20, 24],
        },
        staff: {
            [/^policjanci SPKP$/u]: [15, 18],
            [/^strażaków$/u]: [
                0, 1, 2, 3, 4, 6, 7, 10, 11, 12, 13, 25, 27, 28, 29, 35, 36, 37,
                38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
                54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
            ],
            [/^policjantów$/u]: [8, 14, 15, 16, 17, 18, 30],
        },
        vehiclePreprocessor: {
            [/Brakuje (\d+ Radiowoz(u|ów) WRD)/u]: '$1',
        },
        vehiclesByRequirement: {
            [/^– SH lub SD$/u]: [2, 13],
            [/^– Rchem$/u]: [41, 7],
            [/^Ambulanse? P$/u]: [5, 31],
            [/^cystern(a|\(-y\)) z wodą?$/u]: [47, 6, 61, 64],
            [/^Dźwig SP$/u]: [25],
            [/^Helikopter(ów)? Policyjny(ch)?$/u]: [14],
            [/^Jednost(ek|ka) K-9?$/u]: [16],
            [/^łod(ź|zi\(-e\))$/u]: [26],
            [/^pojazdów SPKP$/u]: [15, 18],
            [/^radiowóz OPI$/u]: [8],
            [/^Radiowoz(u|ów) WRD?$/u]: [30],
            [/^samoch(ód|ody\(-ów\)) pożarnicz(y|e\(-ych\))?$/u]: [
                0, 1, 29, 55, 56, 38, 12, 39, 44,
            ],
            [/^Samoch(ód|odów) Ratownictwa Technicznego$/u]: [
                4, 38, 12, 39, 37, 40,
            ],
            [/^samoch(ód|ody\(-ów\)) dowodzenia i łączności?$/u]: [43, 11],
            [/^Samoch(ód|odów) Ratownictwa wysokościowego$/u]: [27],
            [/^Samoch(ód|odów) wężowy(ch)?$/u]: [61, 64],
            [/^Samoch(ód|odów) ze zbiornikiem na pianę?$/u]: [
                55, 56, 57, 58, 59, 44,
            ],
            [/^Samoch(ód|odów) WOPR$/u]: [19],
            [/^Samoch(ód|odów) SLRw$/u]: [24],
            [/^SLOp lub SLRr$/u]: [3, 28],
            [/^SPGaz$/u]: [10, 42],
        },
    },
    tailoredTabs: {
        allTab: 'All',
        occupiedTab: 'Follow-up',
        vehicleMissing: {
            title: 'One vehicle is not present in any tab | Several vehicles are not present in any tab',
            text: 'The following vehicle types are only present in the "All" tab:',
            hide: 'Hide Note',
            close: 'Close Note till change',
        },
    },
    patientCollapse: {
        combis: 'Kombinacje',
        amount: 'Ilość',
        summary: {
            total: 'Pacjęci',
            treated: 'Leczeni',
        },
    },
    hideVehicleList: {
        show: 'Pokaż listę pojazdów',
        hide: 'Ukryj listę pojazdów',
    },
    vehiclePlayerCounter: {
        ' ': '',
        'driving': 'W drodze',
        'atScene': 'Na miejscu',
        'total': 'Całkowity',
        'vehicles': 'Pojazdy',
        'players': 'Gracze',
    },
};
