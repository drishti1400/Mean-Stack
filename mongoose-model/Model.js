var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    id: Number,
    prod_name: String,
    prod_desc: String,
    prod_price: Number,
    updated_at: Date
});

module.exports = mongoose.model('Products',  ProductSchema);