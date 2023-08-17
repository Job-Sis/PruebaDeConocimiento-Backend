'use strict'

const express = require('express')
const api = express.Router()
const inscriptionsController = require('./inscriptions.controller')

//Rutas
api.post('/add', inscriptionsController.add)
api.get('/get/:id', inscriptionsController.get)
api.get('/get', inscriptionsController.gets)

module.exports = api;