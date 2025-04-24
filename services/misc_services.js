const { readFile, writeFile, appendFile } = require('fs');

class MiscServices {
    static readDB = (path) => new Promise((resolve, reject) => readFile(path, 'utf-8', (err, data) => {
        if (err) {
            reject(err);
        }
        resolve(data);
    }));



    static updateDB = async (path, data) => new Promise((resolve, reject) => {
        writeFile(path, data, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    });

    static createFile = async (path, data = '') => new Promise((resolve, reject) => {
        appendFile(path, data, (err, _) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })

    static toJson = (data, delimiter = ';') => {
        const results = {}
        const elements = data.split(delimiter);
        for (let ele of elements) {
            const jsonItem = ele.split('=');
            results[jsonItem[0]] = jsonItem[1]
        }
        return results;
    }

    static readLogs = async (path) => {
        const data = await this.readDB(path);
        const results = []
        const logs = data.split('\n')
        for (let log of logs) {
            if (log) results.push(this.toJson(log));
        }
        return results;

    }

}

module.exports = MiscServices