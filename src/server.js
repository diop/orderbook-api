require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const morgan = require('morgan')

const dbConfig = require('./server/config/database.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database...')
}).catch(error => {
    console.log('Could not connect to the database...', error)
    process.exit()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (request, response) => response.send({message: `Token Orderbook API Endpoints`}))

require('./server/routes/order.routes.js')(app)
app.listen(port, () => console.log(`Webserver is running on ${port}...`))
