const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const tittle = new Schema(
  {
    countQuestion: { type: Number, default: 0 },
    countRank: { type: Number, default: 0 },
    idField: { type: String },
    thumbnail: { type: String },
    tittle: { type: String },
    field: { type: String },
    slug: { type: String, slug: "userName", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tittles", tittle);
