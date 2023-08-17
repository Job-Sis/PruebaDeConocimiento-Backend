'use strict'

require('dotenv').config()
const app = require('./configs/app')
const mongo = require('./configs/mongo')

app.initServer()
mongo.connect()