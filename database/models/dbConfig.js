const knex = require('knex')
const knexFile = require("../../knexfile");
const environment = "development"

module.exports = knex(knexFile[environment])