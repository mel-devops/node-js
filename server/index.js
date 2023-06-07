const cors = require('cors')
const express = require('express')
const { body, check, param, validationResult } = require('express-validator')
const { values } = require('lodash')
const promisePool = require('./PromisePool.js').promisePool

const PORT = 80
const app = express()
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

// Middleware...
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Your endpoints here..

        //messge
app.get('/message', cors(corsOptions), async (req, res) => {
    res.send({"message": "Hello World"})
    })

        //carID
        // app.get('/car/:carID', cors(corsOptions), async (req, res) => {
        // const { carID }= req.params 
        // let result = await promisePool.query('SELECT * FROM car where car_id=?', [carID])
        // console.log(result[0])
        // res.send(result[0])
        
        //  })
    

        //CarMake
        // app.get('/car/:make', cors(corsOptions), async (req, res) => { 
        //     const make  = req.params.make;
        //     let result = await promisePool.query('SELECT * FROM car where make = ?', [make] )
        //     console.log(result[0])
        //     res.send(result[0])
        // })
        
        //post card
        app.post("/car/", cors(corsOptions), async (req, res) => {
        const [result] = await promisePool.execute("insert into car (make, model, color, price) values (?, ?, ?, ?)", ["Toyota", "Corolla", "Gray", 30000])
        const newCarId = result.insertId;
        const [newCar] = await promisePool.query("select * from car where car_id = ?", newCarId)
        res.send(newCar[0]);
      
        //put car
        //     app.put('/car/', cors(corsOptions), async (req, res) => { 
        //     const { make, model, color, price, carId }= req.body;
        //     const UPDATE_CAR = "update car set make = ?, model = ?, color = ?, price = ? where car_id = ?";
        //     const result = await promisePool.query(UPDATE_CAR, [make, model, color, price, carId] )
        //     console.log(result[0])
        //     res.send(result[0])
        // })

        // //delete car
        // app.delete('/car/:carID', cors(corsOptions), async (req, res) => {
        // const { carID }= req.params 
        // let result = await promisePool.query('SELECT * FROM car where car_id=?', [carID])
        // console.log(result[0])
        // res.send(result[0])
        //  })

   
        
        

app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})



