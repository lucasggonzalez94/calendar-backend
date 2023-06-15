const { response } = require('events')

const Event = require('../models/Event');

const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'get'
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    
    const eventDB = await event.save();

    res.json({
      ok: true,
      event: eventDB
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'put'
  });
};

const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'delete'
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};