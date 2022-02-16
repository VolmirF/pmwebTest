const express = require('express');
const guestController = require('./controller/guestController');
const { deleteReservation } = require('./controller/reservationController');
const reservationController = require('./controller/reservationController');

const routes = express.Router();

// /guests
routes.get('/guests', guestController.getGuests);
routes.get('/guests/:guestId', guestController.getGuest);
routes.post('/guests', guestController.createGuest);
routes.put('/guests/:guestId', guestController.updateGuest);
routes.delete('/guests/:guestId', guestController.deleteGuest);

// /reservations
routes.get('/reservations', reservationController.getReservations);
routes.get(
  '/reservations/:reservationId',
  reservationController.getReservation
);
routes.post('/reservations', reservationController.createReservation);
routes.put(
  '/reservations/:reservationId',
  reservationController.updateReservation
);
routes.delete(
  '/reservations/:reservationId',
  reservationController.deleteReservation
);

module.exports = routes;
