const mongoose = require('../database');

const Reservation = require('../models/reservation');
const Guest = require('../models/guest');

module.exports = {
  getReservations: async (req, res) => {
    try {
      const reservations = await Reservation.find().populate('guests');
      res.send({ reservations });
    } catch (error) {
      res.status(400).send('Error loading reservations');
    }
  },

  getReservation: async (req, res) => {
    try {
      const reservation = await Reservation.findById(
        req.params.reservationId
      ).populate('guests');
      res.send({ reservation });
    } catch (error) {
      res.status(400).send('Error loading reservation');
    }
  },

  createReservation: async (req, res) => {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      let guests = [...req.body.guests];
      for (let i = 0; i < guests.length; i++) {
        const guest = guests[i];
        if (!guest._id) {
          let newGuest = await Guest.create([guest], { session: session });
          guests.splice(i, 1, newGuest[0]);
        }
      }
      req.body.guests = guests;
      let reservation = await Reservation.create([req.body], {
        session: session,
      });
      reservation = reservation[0];
      await session.commitTransaction();
      session.endSession();

      reservation = await Reservation.findById(reservation._id).populate(
        'guests'
      );
      res.status(201).send({ reservation });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).send('Error creating new reservation');
    }
  },

  updateReservation: async (req, res) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      let guests = [...req.body.guests];
      for (let i = 0; i < guests.length; i++) {
        const guest = guests[i];
        if (!guest._id) {
          let newGuest = await Guest.create([guest], { session: session });
          guests.splice(i, 1, newGuest);
        }
      }
      req.body.guests = guests;

      const reservation = await Reservation.findByIdAndUpdate(
        req.params.reservationId,
        req.body,
        { new: true, session: session }
      ).populate('guests');

      await session.commitTransaction();
      session.endSession();

      res.send({ reservation });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).send('Error updating reservation');
    }
  },

  deleteReservation: async (req, res) => {
    try {
      await Reservation.findByIdAndRemove(req.params.reservationId);
      res.send();
    } catch (error) {
      res.status(400).send('Error deleting reservation');
    }
  },
};
