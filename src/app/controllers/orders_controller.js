const Order = require('../models/order.js')

// Create and save Order
exports.create = (request, response) => {
    if (!request.body.content) {
        return response.status(400).send({
            message: 'Order content cannot be empty.'
        })
    }

    const order = new Order({
        title: request.body.title || 'Untitled order',
        content: request.body.content
    })

    order
        .save()
        .then(data => {
            response.send(data)
        }).catch(error => {
            res.status(500).send({
            message: error.message || 'An error occured while creating the order.'
        })
    })
}

// Retrieve and return all orders from the database
exports.findAll = (request, response) => {
    Order
        .find()
        .then(orders => {
            response.send(orders)
        }).catch(error => {
            response.status(500).send({
            message: error.message || 'Some errors occured while retrieving orders'
        })
    })
}

// Find a single order with orderId
exports.findOne = (request, response) => {
    Order.findById(request.params.orderId)
    .then(order => {
        if (!order) {
            return response.status(404).send({
                message: 'Order not found with id ' + request.params.orderId
            })
        }
        response.send(order)
    })
    .catch(error => {
        if (error.kind === 'ObjectId') {
            return response.status(404).send({
                message: 'Order not found with id ' + request.params.orderId
            })
        }
        return response.status(500).send({
            message: 'Error retrieving order with id ' + request.params.orderId
        })
    })
}

// Update an order identified by the orderId in the request.
exports.update = (request, response) => {
    if ( !request.body.content) {
        return response.status(400).send({
            message: 'Order content cannot be empty.'
        })
    }

    Order.findByIdAndUpdate(request.params.orderId, {
        title: request.body.title || 'Untitled order',
        content: request.body.content
    }, {new: true})
    .then(order => {
        if (!order) {
            return response.status(404).send({
                message: 'Order not found with id ' + request.params.orderId
            })
        }
        response.send(order)
    })
    .catch(error => {
        if (error.kind === 'ObjectId') {
            return response.status(404).send({
                message: 'Order not found with id ' + request.params.orderId
            })
        }
        return response.status(500).send({
            message: 'Error updating order with id ' + request.params.orderId
        })
    })
}

// Delete an order with the specified orderId in the request
exports.delete = (request, response) => {
    Order.findByIdAndRemove(request.params.orderId)
    .then(order => {
        if (!order) {
            return response.status(404).send({
                message: 'Order not found with id ' + request.params.orderId
            })
        }
        response.send({ message: 'Order deleted successfuly!' })
    })
    .catch(error => {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return response.status(404).send({
                message: 'Order not found with id ' + request.params.orderId
            })
        }
        return response.status(500).send({
            message: 'Could not delete order with id ' + request.params.orderId
        })
    })
}
