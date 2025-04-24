const MiscServices = require('../services/misc_services');
const { mkdirSync, existsSync } = require('fs')
const path = require('path')


class Middleware {
    constructor(file_path) {
        this.path = path.join(process.cwd(), 'logs', file_path);
    }

    logs = async (req, _, next) => {
        // Create file if it doesn't exist
        if (!existsSync(this.path)) {
            mkdirSync(path, join(process.cwd(), 'logs'), { recursive: true });
            await MiscServices.createFile(this.path);
        }
        let data = await MiscServices.readDB(this.path);
        const log = `url=${req.url};method=${req.method};date=${new Date().toLocaleString()}\n`
        data += log
        await MiscServices.updateDB(this.path, data);
        next()
    }
}

module.exports = Middleware