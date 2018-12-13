## BEW 1.2 Fall 2018 Final Project
<strong>OkayRelay</strong> is a trustless token trading orderbook API.
* [http://api.okayrelay.com/](http://api.okayrelay.com/)

## Terminology:
* An ```orderbook``` is a list of buy or sell orders sorted by price and timestamp.
* A ```relayer``` is any party or entity which hosts an off-chain orderbook.

## OkayRelay Overview
We hosts an off-chain orderbook which provides a way for users to add, remove and update this orderbook through an API (and a GUI in the future). We help traders discover counter-parties and ferry cryptographically signed orders betwen them. Once two parties agree on the terms of an order, the order is settled directly on the Ethereum blockchain via the 0x protocol smart contracts.

# API Documentation - V 1.0 - 12 December 2018
* [https://diop.github.io/orderbook-api/](https://diop.github.io/orderbook-api/)

## 0x protocol 2.0.0 specification
[https://github.com/0xProject/0x-protocol-specification/blob/master/v2/v2-specification.md](https://github.com/0xProject/0x-protocol-specification/blob/master/v2/v2-specification.md)

## HTTP ENDPOINT
```
http://api.okayrelay.com/
```

## WEBSOCKET ENDPOINT
```
wss://api.okayrelay.com/
```

## Order Specific Parameters:

* ``` exchangeAddress ``` [string]: returns orders created for this exchange address
* ``` senderAddress ``` [string]: returns orders with the specified senderAddress
* ``` makerAssetData ``` [string]: returns orders with the specified makerAssetData
* ``` takerAssetData ``` [string]: returns orders with the specified takerAssetData
* ``` traderAssetData ``` [string]: returns orders where either makerAssetData or takerAssetData has the value specified
* ``` makerAddress ``` [string]: returns orders with the specified makerAddress
* ``` takerAddress ``` [string]: returns orders with the specified takerAddress
* ``` traderAddress ``` [string]: returns orders where either makerAddress or takerAddress has the value specified
* ``` feeRecipientAddress ``` [string]: returns orders where feeRecipientAddress is feeRecipient address

## POST /login
```
curl -X POST http://api.okayrelay.com/login -i -u foo:bar -d "access_token=API_ACCESS_TOKEN"
```

## POST /sign-up
```
curl -X POST http://api.okayrelay.com/sign-up -i -d "username=foo&password=bar&access_token=API_ACCESS_TOKEN"
```

## GET /orders
Retrieves a list of orders given query parameters.

## GET /orders/:id
Retrieve a single order by Id.

## POST /orders/new
Add a new order to the orderbook.

## PUT /orders/:id
Update an order by order Id.

## DELETE /orders/:id
Remove an order by order Id

## GET /orderbook
Retrieves the orderbook for a given asset pair.

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

### Sample Relayer Registry Information:
```
"19d099da-775b-4fd0-9b1e-f622d8db9019": {
    "name": "Okay Relay",
    "homepage_url": "https://okayrelay.com",
    "app_url": "https://app.okayrelay.com",
    "header_img": "okayrelayheader.png",
    "logo_img": "okayrelaylogo.png",
    "networks": [
        {
            "networkId": 1,
            "sra_http_endpoint": "https://api.okayrelay.com/0x/v2/",
            "sra_ws_endpoint": "ws://api.okayrelay.com/0x/v2/",
            "static_order_fields": {
                "fee_recipient_addresses": ["0x1111111111111111111111111111111111111111"]
            }
        }
    ]
}
```

© Copyright 2018 Fodé Diop, Computer Science Student at Make School - MIT License
