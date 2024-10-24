const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productSchema = Schema({
    sku: {type: String, required: true, unique: true},
    name: {type: String, reuired: true},
    image: {type: String, required: true},
    category: {type: Array, required: true},
    description: {type: String, required: true},
    price: {type: Number, reuired: true},
    stock: {type: Object, reuired: true},
    status: {type: String, default: "active"},
    isDelete: {type: Boolean, default: false}
}, {timestamps: true})
productSchema.methods.toJSON = function(){
    const obj = this._doc
    delete obj.__v
    delete obj.updateAt
    delete obj.createAt
    return obj
}

const Product = mongoose.model("Product", productSchema);
module.exports = Product;