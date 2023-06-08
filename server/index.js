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
        app.get('/car/:carID', cors(corsOptions), param('id').isNumeric(),
        async (req, res) => {
             
            const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        }

        let car_id = req.params['id'];
        const result = await promisePool.query('SELECT * FROM car where car_id=?', [car_id])
        
        result[0]? res.send(result[0]):res.status(404).send({message: 'not found.'});
        });
        
        
        //CarMake
        // app.get('/car/:make', cors(corsOptions), async (req, res) => { 
        //     const make  = req.params.make;
        //     let result = await promisePool.query('SELECT * FROM car where make = ?', [make] )
        //     console.log(result[0])
        //     res.send(result[0])
        // })
        
        //post car
        // app.post("/car/", cors(corsOptions), async (req, res) => {
        // const [result] = await promisePool.execute("insert into car (make, model, color, price) values (?, ?, ?, ?)", ["Toyota", "Corolla", "Gray", 30000])
        // const newCarId = result.insertId;
        // const [newCar] = await promisePool.query("select * from car where car_id = ?", newCarId)
        // console.log(newCar[0])
        // res.send(newCar[0]);

        // })
      
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
        // // const DELETE_CAR = "delete from car where car_id = ?"
        // console.log(result[0])
        // res.send(result[0])
        //  })


        //api hardening

        // app.get('/person/:id', cors(corsOptions), async (req, res) => {
        // const personId = req.params['id']
        // const person = await mySqlProxy.selectPersonById(personId)
        // person ? res.send(person) : res.status(404).send({message: 'Not found.'})
        // })
   
        
        

app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})



