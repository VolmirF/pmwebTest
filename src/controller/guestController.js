const Guest = require('../models/guest');

module.exports = {
  getGuests: async (req, res) => {
    try {
      const guests = await Guest.find();
      res.send({ guests });
    } catch (error) {
      res.status(400).send('Error loading guests');
    }
  },

  getGuest: async (req, res) => {
    try {
      const guest = await Guest.findById(req.params.guestId);
      res.send({ guest });
    } catch (error) {
      res.status(400).send('Error loading guest');
    }
  },

  createGuest: async (req, res) => {
    try {
      const guest = await Guest.create(req.body);
      res.status(201).send({ guest });
    } catch (error) {
      res.status(400).send('Error creating new guest');
    }
  },

  updateGuest: async (req, res) => {
    try {
      const guest = await Guest.findByIdAndUpdate(
        req.params.guestId,
        req.body,
        { new: true }
      );
      res.send({ guest });
    } catch (error) {
      res.status(400).send('Error updating guests');
    }
  },

  deleteGuest: async (req, res) => {
    try {
      await Guest.findByIdAndRemove(req.params.guestId);
      res.send();
    } catch (error) {
      res.status(400).send('Error deleting guests');
    }
  },
};
