const { Router } = require("express");
const router = Router();
const { check } = require('express-validator');

const validateJWT = require("../middlewares/validateJWT");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const validateProps = require("../middlewares/validateProps");
const { isDate } = require("../helpers/isDate");

router.use(validateJWT);

// /api/events
router.get(
  "/",
  [],
  getEvents
);

router.post(
  "/",
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validateProps
  ],
  createEvent
);

router.put(
  "/:id",
  [],
  updateEvent
);

router.delete(
  "/:id",
  [],
  deleteEvent
);

module.exports = router;
