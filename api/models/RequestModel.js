const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RequestSchema = new Schema({
  requestBy: { type: String, required: true },
  date: { type: Date, default: Date.now },
  route: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('Requests', RequestSchema);
