const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const prodSchema = new Schema(
  {
    label: { type: String, required: true },
    desc: { type: String, required: true },
    stock:{type: Boolean , required:true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Produit", prodSchema);
