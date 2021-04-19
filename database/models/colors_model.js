const db = require('./dbConfig');

module.exports = {
    queryColorPallets,
}

function queryColorPallets(pallet){
    const colors = db('COLORS').where('pallete_name', pallet)
    return colors
}