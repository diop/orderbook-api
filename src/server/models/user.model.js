const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserSchema  = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    password: { type: String, select: false },
    username: { type: String, required: true},
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

UserSchema.pre('save', function(next) {
    const now = new Date()
    this.updateAt = now
    if (!this.createdAt) {
        this.createdAt = now
    }

    const user = this
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(user.password, salt, (error, hash) => {
            user.password = hash
            next()
        })
    })
})

// Need to use function to enable this.password to work.
UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (error, isMatch) => {
        done(error, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)
