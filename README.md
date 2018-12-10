## BEW Final Project 
Trustless Token Trading Orderbook inspired by the 0xProject Protocol. An orderbook is a list of buy or sell orders sorted by price and timestamp.

## Instructions from within this repo:

To install all required modules:
```
$ npm install
```

To import mock oder data into Mongo:
```
$ mongoimport --host=127.0.0.1 -d orderbook-api -c orders --type csv --file orders.csv --headerline
```

To run the server:
```
$ node src/server.js
```

The API endpoint will be serving at:
```
http://localhost:3000/orders
```

## GET /orders
Retrieves a list of orders given query parameters.

### Order specific parameters:

* ``` exchangeAddress ``` [string]: returns orders created for this exchange address
* ``` senderAddress ``` [string]: returns orders with the specified senderAddress
* ``` makerAssetData ``` [string]: returns orders with the specified makerAssetData
* ``` takerAssetData ``` [string]: returns orders with the specified takerAssetData
* ``` traderAssetData ``` [string]: returns orders where either makerAssetData or takerAssetData has the value specified
* ``` makerAddress ``` [string]: returns orders with the specified makerAddress
* ``` takerAddress ``` [string]: returns orders with the specified takerAddress
* ``` traderAddress ``` [string]: returns orders where either makerAddress or takerAddress has the value specified
* ``` feeRecipientAddress ``` [string]: returns orders where feeRecipientAddress is feeRecipient address

## POST /order
Submit a signed order to the DEX.

### Sample Payload 
```
{
    "makerAddress": "0x9e56625509c2f60af937f23b7b532600390e8c8b",
    "takerAddress": "0xa2b31dacf30a9c50ca473337c01d8a201ae33e32",
    "feeRecipientAddress": "0xb046140686d052fff581f63f8136cce132e857da",
    "senderAddress": "0xa2b31dacf30a9c50ca473337c01d8a201ae33e32",
    "makerAssetAmount": "10000000000000000",
    "takerAssetAmount": "20000000000000000",
    "makerFee": "100000000000000",
    "takerFee": "200000000000000",
    "expirationTimeSeconds": "1532560590",
    "salt": "1532559225",
    "makerAssetData": "0xf47261b0000000000000000000000000e41d2489571d322189246dafa5ebde1f4699f498",
    "takerAssetData": "0x02571792000000000000000000000000371b13d97f4bf77d724e78c16b7dc74099f40e840000000000000000000000000000000000000000000000000000000000000063",
    "exchangeAddress": "0x12459c951127e0c374ff9105dda097662a027093",
    "signature": "0x012761a3ed31b43c8780e905a260a35faefcc527be7516aa11c0256729b5b351bc33"
}
```

## GET /orderbook
Retrieves the orderbook for a given asset pair.
