const mongoose = require("mongoose");
const base = require("./base");
const fetch = require("node-fetch");

const productSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  category: String,
  name: String,
  inStock: Boolean,
  description: [String],
  published: Boolean,
  minCost: String,
  maxCost: String,
  colors: [
    {
      hex: String,
      name: String,
      frontUrl: String,
      backUrl: String,
      inStock: Boolean,
      skus: [
        {
          cost: Number,
          size: String,
          skuId: String,
          inStock: Boolean,
        },
      ],
    },
  ],
  priority: Number,
  printSize: Number,
  mockups: [
    { type: mongoose.Schema.Types.ObjectId, ref: "mockups", required: true },
  ],
});

productSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
  return next();
});
productSchema.statics.publicFields = [
  "mockups",
  "category",
  "name",
  "priority",
  "printSize",
  "colors",
  "published",
  "description",
  "minCost",
  "maxCost",
  "inStock",
];
productSchema.statics.names = {
  singular: "product",
  plural: "products",
};
productSchema.statics.getPreviewUrl = async (
  productId,
  colorHex,
  imageUrl,
  sizePercent
) => {
  const product = await Product.findOne({ _id: productId })
    .populate("mockups")
    .exec();
  if (product) {
    const mockup =
      product.mockups[Math.floor(Math.random() * product.mockups.length)];
    return await product.getPreviewUrl(colorHex, imageUrl, `auto ${sizePercent}%`, mockup)
  }
}

productSchema.methods.getPreviewUrl = async function (colorHex, imageUrl, imageSize, mockup) {
  const body = {
    image_url: imageUrl,
    width: "medium",
    image_size: imageSize,
    image_position: "center center",
  };
  if (colorHex) {
    body.object_color = colorHex;
  }
  let response = await fetch(
    `https://public-api.smartmockups.com/v1/mockups/${mockup.smartMockupId}`,
    {
      method: "POST",
      headers: {
        "x-api-key": process.env.SMARTMOCKUP_API_KEY,
      },
      body: JSON.stringify(body),
    }
  );
  response = await response.json();
  return response.src;
}

const Product = base(productSchema);
module.exports = Product;
