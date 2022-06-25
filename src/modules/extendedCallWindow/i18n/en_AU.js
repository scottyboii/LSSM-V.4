module.exports = {
    arrCounter: {
        resetTexts: {
            counter: 'ARR-Counter',
            highlight: 'ARR border',
            selection: 'Vehicle selection',
            counter_highlight: 'ARR counter / border',
            counter_selection: 'ARR counter and vehicle selection',
            highlight_selection: 'ARR border and vehicle selection',
            counter_highlight_selection:
                'ARR counter / border and vehicle selection',
        },
        reset: '{text} reset',
    },
    arrHover: {
        reset: 'The vehicle selection is reset before!',
        headers: {
            set: 'Set',
            attribute: 'Name',
            free: 'Free',
            max: 'Max',
            status: 'Status',
        },
        titles: {
            set: 'So often this combination is selected when you press the ARR',
            attribute: 'The combination described in this line',
            free: 'So often this combination is available',
            max: 'You can select this ARR until this combination is no longer available',
        },
        arrSpecs: {
            fire: 'Pumper or Light Tanker or Tanker',
            hlf_only: 'Rescue Pumper',
            elw: 'Support Vehicle',
            elw2: 'Mobile Command Vehicle',
            dlk: 'Ladder Platform Trucks',
            rtw: 'Ambulance',
            rw: 'Rescue',
            gwa: 'BASU',
            gwl2wasser: 'Bulk Water Tanker',
            gwgefahrgut: 'HAZMAT Unit',
            rth_only: 'Air Ambulance',
            fustw: 'Patrol Car',
            police_motorcycle: 'Police Motorcycle',
            fustw_or_police_motorcycle: 'Police car or Police Motorcycle',
            polizeihubschrauber: 'Police helicopter',
            swat: 'TOG',
            swat_armored: 'TOG Armoured Vehicle',
            swat_suv: 'TOG SUV',
            k9: 'K-9 Unit',
            police_horse: 'Mounted Police',
            gw_wasserrettung: 'SES Vehicle',
            mzb: 'Rescue Boat',
            wasser_amount: 'Litres of water',
            brush_vehicle: 'Brush Truck',
            brush_truck: 'Brush Truck',
            fire_aviation: 'Fire Aviation',
            water_drop_helicopter: 'Fire Helicopter',
            air_tanker: 'Bomber',
            heavy_air_tanker: 'Large Air tanker',
        },
    },
    enhancedMissingVehicles: {
        vehicle: 'Vehicle type',
        missing: 'Missing on mission',
        driving: 'En-route',
        total: 'Still needed',
        tip: {
            dragging: 'drag window',
            textMode: 'textmode on/off',
            minified: 'collapse',
            overlay: 'overlay',
            reload: 'reload',
            pushRight: 'show this box above vehicle list',
            pushLeft: 'show this box at original position',
        },
        selected: 'Selected',
        water: 'l. water',
        staffPrefix: ['We need'],
        staff: {
            [/^TOG Personnel$/u]: [15, 18],
        },
        towingVehicles: {
            // Note: Only the ones that are towed by vehicles of the same group! If e.g. a MzB can be towed by vehicles of several groups, it MUST NOT be listed here.
            21: [20],
            22: [8],
        },
        vehiclesByRequirement: {
            [/^Fire engine(s)?$/u]: [0, 1, 12, 13, 19, 30],
            [/^Ladder Platform Truck(s)?$/u]: [2, 13],
            [/^Support Vehicle(s)?$/u]: [3, 11],
            [/^Major Rescue Vehicle(s)?$/u]: [4, 12, 26],
            [/^BASU$/u]: [10],
            [/^Bulk Water Tanker(s)?$/u]: [6, 30],
            [/^Mobile Command Vehicle(s)?$/u]: [11],
            [/^HAZMAT Truck(s)?$/u]: [7],
            [/^Ambulance(s)?$/u]: [5],
            [/^Police car(s)?$/u]: [8, 16, 17, 37],
            [/^HEMS$/u]: [9],
            [/^Police Helicopter(s)?$/u]: [14],
            [/^TOG Vehicles$/u]: [15, 18],
            [/^K-9 Unit(s)?$/u]: [16],
            [/^Mounted Police?$/u]: [22],
            [/^SES?$/u]: [20],
            [/^Brush Truck(s)?$/u]: [1, 18, 28, 29],
            [/^Airborne firefighting vehicle(s)?$/u]: [31, 32, 33],
            [/^Boat(s)?$/u]: [21],
            [/^Paramedic Supervisor(s)?$/u]: [23],
            [/^Senior Sergeant(s)?$/u]: [37],
            [/^Riot Police Group Vehicle(s)?$/u]: [35],
            [/^Riot Police SUV(s)?$/u]: [34],
            [/^Riot Police Equipment Vehicle(s)?$/u]: [36],
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
        combis: 'Combinations',
        amount: 'Amount',
        summary: {
            total: 'patients',
            treated: 'being treated',
        },
    },
    hideVehicleList: {
        show: 'Show vehicle list',
        hide: 'Hide vehicle list',
    },
    vehiclePlayerCounter: {
        ' ': '',
        'driving': 'en Route',
        'atScene': 'at Scene',
        'total': 'Total',
        'vehicles': 'Vehicles',
        'players': 'Players',
    },
    releasePatient: {
        release: 'Release patient (No reward)',
    },
};
