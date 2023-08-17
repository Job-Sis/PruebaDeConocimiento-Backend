'use strict'

const express = require('express')
//Registra fácilmente las solicitudes realizadas en el servidor
const morgan = require('morgan')
//Aplica Seguridad al servidor
const helmet = require('helmet')
//Procesa la solicitudes de otros tipos de sistema
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3500

//Routes
const inscriptionsRoutes = require('../src/inscriptions/inscriptions.routes')

//Configuracion del servidor HTTP de express
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Rutas
app.use('/inscription', inscriptionsRoutes)

//Levantar el servidor
exports.initServer = () => {
    app.listen(port)
    console.log(`Server http running in port ${port}`)
}