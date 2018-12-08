## BEW Final Project 
JWT Authenticated Web API for a Trustless Token Trading Orderbook.

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
