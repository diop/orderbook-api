module.exports = (app) => {
    const orders = require('../controllers/order.controller')

    app.post('/orders', orders.create)
    app.get('/orders', orders.findAll)
    app.get('/orders/:orderId', orders.findOne)
    app.put('/orders/:orderId', orders.delete)
}
