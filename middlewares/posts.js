function saveDataToStore(req, res, next) {
    fs.writeFileSync(STORE_FILE, JSON.stringify(storeData, null, 2));
    next();
}

module.exports = {saveDataToStore}