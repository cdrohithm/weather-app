const express = require('express')
const request = require('postman-request')

const app = express()
const router = express.Router()

router.get('/', (req, res, next) => {
    res.statusCode = 200
    res.send('Weather')
})
router.get('/weather/:lat/:lon', async (req, res, next) => {
    console.log("req",req.params)
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    try {
        await request(`http://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lon}&appid=${process.env.API_KEY}`, (error, response) => {
            if (response?.statusCode === 200) {
                const data = response.body
                const JSONData = JSON.parse(data)
                // console.log(successMessage(data))
                console.log(JSONData)
                const returnData = {
                    weather: JSONData.weather,
                    main:JSONData.main,
                    coordinates: JSONData.coord,
                    id: JSONData.id,
                    name: JSONData.name
                }
                res.status(200)
                res.send(returnData)
            } else {
                res.statusCode = response.statusCode
                next(response?.body)
            }
        })
    } catch(err) {
        next(err)
    }
})

router.get('/weather/:city', async (req, res, next) => {
    console.log(req.params)
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    try {
        await request(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&APPID=${process.env.API_KEY}`, (error, response) => {
            if (response?.statusCode === 200) {
                const data = response.body
                const JSONData = JSON.parse(data)
                // console.log(successMessage(data))
                console.log(JSONData)
                const returnData = {
                    weather: JSONData.weather,
                    main:JSONData.main,
                    coordinates: JSONData.coord,
                    id: JSONData.id,
                    name: JSONData.name
                }
                res.status(200)
                res.send(returnData)
            } else {
                res.statusCode = response.statusCode
                console.log(response)
                next(response?.body)
            }
        })
    } catch(err) {
        next(err)
    }
})
module.exports = router