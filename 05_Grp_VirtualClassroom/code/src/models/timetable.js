const mongoose = require('mongoose')

const timetableschema = mongoose.Schema({
    branchsem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branchsem',
        required: true,
    },
    11: {
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    12:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    13:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    14:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    15:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    16:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    21:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    22:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    23:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    24:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    25:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    26:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    31:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    32:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    33:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    34:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    35:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    36:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    41:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    42:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    43:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    44:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    45:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    46:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    51:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    52:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    53:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    54:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    55:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    56:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    61:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    62:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    63:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    64:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    65:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    66:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    71:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    72:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    73:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    74:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    75:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
    76:{
        subject: {
            type: String,
        },
        link: {
            type: String,
            default: 'https://meet.google.com/usa-brbv-enm',
        }
    },
},{collection : 'Timetable'})

module.exports = mongoose.model('Timetable', timetableschema)