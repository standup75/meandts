const mongoose = require("mongoose");
const base = require("./base");

const mockupSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  smartMockupId: { type: String, required: true },
  url: { type: String, required: true },
  published: { type: Boolean, default: true },
  height: Number,
  width: Number,
  sex: {type: [String], default: ['men', 'women']},
  category: String,
});

mockupSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
  return next();
});
mockupSchema.statics.publicFields = [
  "createdAt",
  "updatedAt",
  "smartMockupId",
  "url",
  "published",
  "width",
  "height",
  "category",
  "sex",
];
mockupSchema.statics.names = {
  singular: "mockup",
  plural: "mockups",
};
mockupSchema.statics.categories = [
  "hoodies",
  "mugs",
  "other",
  "sweatshirts",
  "tanks",
  "tshirts",
];
const Mockup = base(mockupSchema);
module.exports = Mockup;
