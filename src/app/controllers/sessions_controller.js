const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
                    return response.status(401).send({ message: 'Wrong username or password' })
                }

                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        return response.satus(401).send({ message: 'Wrong username or password' })
                    }

                    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { 
                        expiresIn: '60 days'
                    })
                    
                    response.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
                    response.redirect('/')
                })
            })
            .catch(error => {
                console.log(error)
            })
    })
}