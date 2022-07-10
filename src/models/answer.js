const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answer = new Schema({
    idQuestion: { type: String },
    idUser : { type: Object },
    reply: {type: String},
}, {
    timestamps: true,
})

module.exports = mongoose.model('answers', answer);

