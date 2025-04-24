const express = require('express');
const LogsController = require('../controllers/logs_controller');

const router = express.Router();
const logsController = new LogsController();

router.get('/logs', logsController.getLogs)

module.exports = router