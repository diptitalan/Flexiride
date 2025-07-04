const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true
  },
  locationAddress: {
    type: String,
    required: true
  },
  locationImageUrl: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Location || mongoose.model('Location', locationSchema);

