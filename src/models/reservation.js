const mongoose = require('../database');

const ReservationSchema = new mongoose.Schema({
  hotel: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date_performed: {
    type: String,
    required: true,
  },
  initial_date: {
    type: String,
    required: true,
  },
  final_date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest',
    },
  ],
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;
