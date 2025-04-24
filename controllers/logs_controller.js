const path = require('path')
const MiscServices = require('../services/misc_services');

class LogsController {
    constructor() {
        this.logFilePath = path.join(process.cwd(), 'logs', 'contact_logs.txt')

    }

    getLogs = async (_, res) => {
        const data = await MiscServices.readLogs(this.logFilePath);
        res.json(data)
    }
}

module.exports = LogsController