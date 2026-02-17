const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'scheduled' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
