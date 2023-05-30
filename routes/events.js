/*
    Rutas de eventos / Events
    host + /api/events/
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const router = Router();

// Todas tienen que pasar por la validacion del JWT

router.use(jwtValidator);

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post(
  '/',
  [
    // Middlewares
    check('title', 'The title is required.').notEmpty(),
    check('start', 'The start date is required.').isISO8601().toDate(),
    check('end', 'The end date is required.').isISO8601().toDate(),
    fieldsValidator,
  ],
  createEvent
);

// Actualizar un evento
router.put(
  '/:id',
  [
    // Middlewares
    check('title', 'The title is required.').notEmpty(),
    check('start', 'The start date is required.').isISO8601().toDate(),
    check('end', 'The end date is required.').isISO8601().toDate(),
    fieldsValidator,
  ],
  updateEvent
);

// Borrar un evento
router.delete('/:id', deleteEvent);

module.exports = router;
