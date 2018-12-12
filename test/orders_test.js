const Order = require('../src/app/models/order')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const should = chai.should()
chai.use(chaiHttp)

const agent = chai.request.agent(app)

const order = {
    exchangeAddress: 'test',
    senderAddress: 'test',
    makerAssetData: 'test',
    takerAssetData: 'test',
    traderAssetData: 'test',
    makerAddress: 'test',
    takerAddress: 'test',
    traderAddress: 'test',
    feeRecipientAddress: 'test'
}

const url = 'http://localhost:3000'

before(done => {
    agent
        .post('login')
        .send({ username: 'testone', password: 'password'})
        .end(function(error, response) {
            done()
        })
})

describe('Orders', () => {
    it('should create valid attibutes at POST /posts', done => {
        Order.findOneAndRemove(order, function() {
            Order.find(function(error,orders){
                var orderCount = orders.count

                chai
                    .request(url)
                    .post('/orders/new')
                    .send(order)
                    .then(response => {
                        Order.find(function(error, orders) {
                            postCount.should.be.equal(orders.length + 1)
                            response.should.have.status(200)
                            return done()
                        })
                    })
                    .catch(error => {
                        return done(error)
                    })
                return done()
            })
        })
    })
})
