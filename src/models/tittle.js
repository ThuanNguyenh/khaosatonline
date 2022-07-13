const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const tittle = new Schema(
  {
    countQuestion: { type: Number, default: 0 },
    countRank: { type: Number, default: 0 },
    idField: { type: String },
    thumbnail: { type: String, default: "https://product.hstatic.net/1000238589/product/g-khao-sat-tren-google-bieu-mau-thumb_da4d3591f2bd4a3fb758b87ca46e139e_4116754e02f549afba3dd1f2f70f47fb.jpg"},
    tittle: { type: String },
    field: { type: String },
    slug: { type: String, slug: "tittle", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tittles", tittle);



