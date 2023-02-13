const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

module.exports = async function () {
    let data;
    try {
        data = await readFileAsync(__dirname.concat('/data.json'));
    } catch (err) {
        console.log('ERROR', err);
        throw err;
    }
    return data;
}