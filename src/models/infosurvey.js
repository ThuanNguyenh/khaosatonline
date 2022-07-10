const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infosurvey = new Schema({
    tittle: { type: String },
    field: { type: String },
    question : { type: Object },
    countQuestion: {type: Number, default: 0},
    totalRank: {type: Number, default: 0}
}, {
    timestamps: true,
})

module.exports = mongoose.model('infosurveys', infosurvey);

// c1
// {
//     cau hoi 1: [],
//     cau hoi 2: [],

// }

