const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question = new Schema({
    question: { type: String },
    tittle: { type: String },
    idTittle: { type: String },
    field: { type: String },
    answer: {type: Array}
}, {
    timestamps: true,
})

module.exports = mongoose.model('questions', question);

