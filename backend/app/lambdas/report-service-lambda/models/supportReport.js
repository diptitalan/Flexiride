const mongoose = require('mongoose')

const supportReportSchema = new mongoose.Schema({
    carRentAge :{
        type: String
    },
    supportAgent :{
        type: String
    },
    suppAgentEmail :{
        type: String
    },
    repStart :{
        type: Date
    },
    repEnd :{
        type: Date
    },
    bookBySuppAgent :{
        type: Number
    },
    deltaBookBySuppAgent :{
        type: Number
    },
    avgFeedback :{
        type: Number
    },
    miniFeedback :{
        type: Number
    },
    avgFeedback :{
        type: Number
    },
    revenue :{
        type: Number
    },
    deltaRevenue :{
        type: Number
    }
})

module.exports = mongoose.model('supportReport', supportReportSchema);