const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Order = require('../models/order.js')

module.exports = app => {
    app.get('/sign-up', (request, response ) => {
        response.redirect(`/sign-up`)
    })

    app.get('/login', (request, response ) => {
        response.redirect(`/login`)
    })

    app.get('/logout', (request, response ) => {
        response.clearCookie('nToken')
        response.redirect(`/`)
    })

    app.post('/sign-up', (request, response) => {
        console.log(request.body)
        const user = new User(request.body)
        
        user
            .save()
            .then(user => {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days'})
                response.cookie('nToken', token, { maxAge: 900000, httpOnly: true})
                response.redirect(`/`)
            })
            .catch(error => {
                console.log(error.message)
                return response.status(400).send({ error })
            })
    })

    app.post('/login', (request, response) => {
        const username = request.body.username
        const password = request.body.password

        User.findOne({ username }, 'username password')
            .then(user => {
                if (!user) {
                    return response.status(401).send({ message: 'Wrong username or password1' })
                }

                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        return response.status(401).send({ message: 'Wrong username or password2' })
                    }

                    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { 
                        expiresIn: '60 days'
                    })
                    
                    response.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
                    response.redirect(`/`)
                })
            })
            .catch(error => {
                console.log(error)
            })
    })

    app.post('/orders/new', (request, response) => {
        if (request.user) {
            const order = new Order(request.body)

            console.log(order)

            order
                .save()
                .then(order => {
                    response.json(order)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            return response.status(401) // Unauthorized
        }
    })

    app.get('/orders/:id', (request, response) => {
        const id = request.params.id
        Order
            .findById(id)
            .then(order => {
                response.redirect(`/orders/` + order._id)
            })
            .catch(error => {
                console.log(error.message)
            })
    })
}