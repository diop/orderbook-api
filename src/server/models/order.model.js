const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    token_name: String,
    price: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)
