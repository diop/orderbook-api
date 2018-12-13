require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 3000
const morgan = require('morgan')

const dbConfig = require('./app/config/database.config')
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

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (request, response) => response.send({message: `OkayRelay Orderbook API Endpoints...`}))

var checkAuth = (request, response, next) => {
    if (typeof request.cookies.nToken === 'undefined' || request.cookies.nToken === null) {
        request.user = null
    } else {
        const token = request.cookies.nToken
        const decodedToken = jwt.decode(token, { complete: true }) || {}
        request.user = decodedToken.payload
    }
    next()
}

app.use(checkAuth)

require('./app/controllers/sessions_controller')(app)
require('./config/routes/orders_router')(app)

app.listen(port, () => console.log(`Webserver is running on ${port}...`))
