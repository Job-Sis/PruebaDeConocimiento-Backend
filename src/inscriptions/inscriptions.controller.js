'use strict'
const Inscription = require('./inscriptions.model')

exports.add = async(req, res) => {
    try{
        let data = req.body
        let dateNow = new Date()
        let birthdate = new Date(data.birthdate)
        let date = new Date(dateNow)
        let edad = 0
        let nextFriday = 0

        //Verificar que la primera caracter sea a o A
        if(data.carnet.charAt(0).toLowerCase() !== "a") return res.status(400).send({message: "El primer carater debe ser a"})

        //Verificar que el tercer caracter sea 5
        if(data.carnet.charAt(2) !== "5") return res.status(400).send({message: "El tercer caracter debe ser 5"})

        //Verificar que el ultimo caracter termine en 1, 3 0 9
        if((data.carnet.charAt(5) !== "1") &&  (data.carnet.charAt(5) !== "3") && (data.carnet.charAt(5) !== "9")) return res.status(400).send({message: "El ultimo caracter debe terminar en 1, 3 0 9"})

        //verificar que sea el genero corecto
        if(data.gender.toLowerCase() !== "m" && data.gender.toLowerCase() !== "f") return res.status(400).send({message: 'Eligar un genero'})

        //verificar que eliga un genero de poesia
        if(data.poeticGenre.toLowerCase() !== "lírica" && data.poeticGenre.toLowerCase() !== "épica" && data.poeticGenre.toLowerCase() !== "dramática") return res.status(400).send({message: "Eliga un genero de poesia"})
        //verificar que sea mayor de edad
        edad = dateNow.getFullYear() - birthdate.getFullYear()
        console.log(edad)
        if (
            dateNow.getMonth() < birthdate.getMonth() ||
            (dateNow.getMonth() === birthdate.getMonth() &&
              dateNow.getDate() < birthdate.getDate())
          ) {
            // Restar un año si la condición se cumple
            edad--
          }
        //Agregar edad a data
        data.age = edad

        if( edad < 17 ||
            ( edad === 17 && dateNow.getMonth() < birthdate.getMonth() || 
          (dateNow.getMonth() === birthdate.getMonth() && dateNow.getDate() <= birthdate.getDate()))){
            return res.status(400).send({message: "Eres no eres mayor de 17 años"})
        }
        data.birthdate = birthdate

        //Ingresar fecha de incripcion
        data.registrationDate = dateNow

        //Agregar cita en 5 dias si termina en 1 y dramatico
        if(data.carnet.charAt(5) === "1" && data.poeticGenre.toLowerCase() === "dramática"){
            date.setDate(date.getDate() + 5)
            if(date.getDay() === 0){
                date.setDate(date.getDate() + 1)
            }
            if(date.getDay() === 6){
                date.setDate(date.getDate() + 2)
            }                     
          //Agregar cita al ultimo dia del mes si termina en 3 y epica
        }else if(data.carnet.charAt(5) === "3" && data.poeticGenre.toLowerCase() === "épica"){
            let lastDay = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0)
            if(lastDay.getDay() === 0){
                lastDay.setDate(lastDay.getDate() - 2)
            }
            if(lastDay.getDay() === 6){
                lastDay.setDate(lastDay.getDate() - 1)
            }
            date = lastDay
        }else{
            //Para toda las demas termnaciones 
            nextFriday = 5 - dateNow.getDay()
            if(nextFriday <= 0){
                nextFriday = nextFriday + 7
            }
            if(nextFriday === 1){
                nextFriday = nextFriday + 7
            }
            date.setDate(date.getDate() + nextFriday)
        }
        data.date = date

        //Guardar el inscription a la db
        let inscription = new Inscription(data)
        let id = inscription._id
        await inscription.save()

        return res.status(200).send({message: "Saved successfully inscription", id})
    }catch(err){
        console.log(err)
        return res.status(500).send({message: "Error to saved inscription"})
    }
}

exports.get = async(req, res) => {
    try{
        let idInscription = req.params.id
        let inscription = await Inscription.findOne({_id: idInscription})
        if(!inscription) return res.status(404).send({message: "Inscription not found"})
        return res.status(200).send({inscription})
    }catch(err){
        console.log(err)
        return res.status(500).send({message: "Error to getting inscription"})
    }
}

exports.gets = async(req, res) => {
    try{
        let inscriptions = await Inscription.find().select('-_id -carnet -address -birthdate -gender -phone -registrationDate')
        return res.status(200).send({inscriptions})
    }catch(err){
        console.log(err)
        return res.status(500).send({message: "Error to getting inscriptions"})
    }
}