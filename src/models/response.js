const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const response = new Schema({
    res: { type: Object },
    ans: { type: Object },
    idQuestion: { type: String },
    idUser: { type: String },
    question: { type: Array },
}, {
    timestamps: true,
})

module.exports = mongoose.model('responses', response);

