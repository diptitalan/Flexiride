const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  carRating: {
    type: Number
  },
  category: {
    type: String
  },
  serviceRating: {
    type: Number
  },
  engineCapacity: {
    type: String
  },
  fuelType: {
    type: String
  },
  gearBoxType: {
    type: String
  },
  fuelConsumption: {
    type: String
  },
  carImages: {
    type: [String]
  },
  pricePerDay: {
    type: mongoose.Types.Decimal128
  },
  passengerCapacity: {
    type: String
  },
  status: {
    type: String
  },
  climateControlOption: {
    type: String
  },
  carLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
