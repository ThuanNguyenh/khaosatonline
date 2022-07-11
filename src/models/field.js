const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const field = new Schema({
    field: { type: String },

}, {
    timestamps: true,
})

module.exports = mongoose.model('fields', field);

