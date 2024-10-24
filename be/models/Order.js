const mongoose = require('mongoose');
const Product = require('./Product');
const User = require('./User');
const Schema = mongoose.Schema;
const orderSchema = Schema({
    shipTo: {type: Object, required: true}, // String 이 아닌 Object로 써야 함
    contact: {type: Object, reuied: true}, // Number가 아닌 Object로 써야 함
    totalPrice: {type: Number, reuied: true, default: 0}, // defatul 값 0 넣어줘야 함
    userId: {type: mongoose.ObjectId, ref: User},
    status: {type: String, default: "preparing"}, // default가 "active"가 아닌 "preparing"임
    items: [{
        productId: {type: mongoose.ObjectId, ref: Product, required: true},
        size: {type: String, required: true},
        qty: {type: Number, default: 1, required: true, default: 1},
        price: {type: Number, required: true}
    }]
}, {timestamps: true})
orderSchema.methods.toJSON = function(){
    const obj = this._doc
    delete obj.__v
    delete obj.updateAt
    delete obj.createAt
    return obj
}

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;