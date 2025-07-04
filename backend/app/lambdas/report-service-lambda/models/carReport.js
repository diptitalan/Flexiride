const mongoose = require('mongoose')

const carReportSchema= new mongoose.Schema({
    reportStart: {
        type: Date
    },
    reportEnd :{
        type: Date
    },
    location :{
        type: String
    },
    carModel :{
        type: String
    },
    carID :{
        type: String
    },
    daysPerCar :{
        type: Number
    },
    resDuringPeriod : {
        type: Number
    },
    begMilage :{
        type: Number
    },
    endMilage :{
        type: Number
    },
    totalKilometers :{
        type: Number
    },
    AvgMilage:{
        type: Number
    },
    deltaAvgMilage:{
        type: Number
    },
    avgFeedback :{
        type: Number
    },
    miniFeedback :{
        type: Number
    },
    deltaAvgFeedback :{
        type: Number
    },
    revenue :{
        type: Number
    },
    deltaRevenue :{
        type: Number
    }
})

module.exports = mongoose.model('carReport', carReportSchema);