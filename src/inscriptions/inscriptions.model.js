'use strict'

const mongoose = require('mongoose')

const inscriptionSchema = mongoose.Schema({
    carnet: {
        type: String, 
        require: true,
        lowercase: true,
    },
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type:  String,
        require: true
    },
    gender: {
        type: String,
        require: true,
        uppercase: true
    },
    phone: {
        type: Number,
        require: true
    },
    birthdate: {
        type: Date,
        require: true
    },
    studentCareer: {
        type: String,
        require: true
    },
    poeticGenre: {
        type: String,
        requrie: true,
        lowercase: true
    },
    registrationDate: { 
        type: Date,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
},{
    versionKey: false
})

module.exports = mongoose.model('Inscriptions', inscriptionSchema)