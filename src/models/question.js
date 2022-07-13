const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question = new Schema({
    question: { type: String },
    tittle: { type: String },
    idTittle: { type: String },
    field: { type: String },
    answer1: { type: String },
    answer2: { type: String },
    answer3: { type: String },
    answer4: { type: String },

}, {
    timestamps: true,
})

module.exports = mongoose.model('questions', question);

