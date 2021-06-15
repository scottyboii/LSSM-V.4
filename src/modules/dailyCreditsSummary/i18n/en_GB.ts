export default {
    amount: 'Amount',
    categories: {
        allianceMission: {
            regex: /^\[Alliance]/,
            title: 'Alliance Missions',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%',
            title: 'Own Missions',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Vehicle bought/,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Daily login reward/,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Building constructed|Refund Building$|Building demolished without refund)/,
            title: 'Building constructed/demolished',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Station (upgraded( \(from small .*? station\))??|constructed)|Cancel:|Refund Building upgrade)/,
            title: 'Station constructed',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Completed task ".*?"/,
            title: 'Completed Task',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Patient Treatment/,
            title: 'Patients',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Hospital - Alliance/,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Police - Alliance/,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Prisoner? Transported/,
            title: 'Prisoner',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(education|Alliance Training Applicant)/,
            title: 'Education',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Attached building to Building Complex Base|Upgraded to Building Complex Base|Upgraded to Building Complex|Building Complex Base upgrade finished)/,
            title: 'Building Complex',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /False Alarm/,
            titel: 'False Alarms',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Category',
    title: 'Summary',
    total: 'Total',
    others: 'Others',
};
