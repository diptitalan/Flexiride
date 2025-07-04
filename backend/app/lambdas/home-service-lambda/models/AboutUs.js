const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  numericValue: {
    type: String,
    required: true
  },
  title:{
    type : String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.AboutUs || mongoose.model('AboutUs', aboutUsSchema);

