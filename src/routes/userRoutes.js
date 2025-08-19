const express = require('express');

const { createUser } = require('../controllers/userController')
const { addExercises, getExerciseLogs } = require('../controllers/exerciseController')

const router = express.Router();

router.post('/users', createUser)
router.post('/users/:_id/exercises', addExercises)
router.get('/users/:_id/logs', getExerciseLogs)

module.exports = router;