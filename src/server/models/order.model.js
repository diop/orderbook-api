const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    exchangeAddress: String,
    senderAddress: String,
    makerAssetData: String,
    takerAssetData: String,
    traderAssetData: String,
    makerAddress: String,
    takerAddress: String,
    traderAddress: String,
    feeRecipientAddress: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)
