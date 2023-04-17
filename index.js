// Start confg
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// way of reading JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Routes of API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// starting route / endpoint
app.get('/', (req, res) => {

    // mostrar req
    res.json({ message: 'Hi Express' })
})

// Connection
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(`mongodb+srv://${ DB_USER }:${DB_PASSWORD}@apicluster.b4au7ks.mongodb.net/bancoapi?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("We connect to MongoDB!")
        app.listen(3000)
    })
    .catch((err) => console.log(err))
