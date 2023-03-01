require("rootpath")();
const fs = require("fs");
const runner = require("../lib/runner");
const Product = require("src/models/product");
const Mockup = require("src/models/mockup");
const log = require("../lib/log");
const testImageUrl =
  "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-15/67595653_161056318380836_918695717469511172_n.jpg?_nc_cat=107&_nc_sid=8ae9d6&_nc_oc=AQnPdcTJt5aYpiYfIF9kSfSp4uok4OW3LQE_gCN5SRySsLkhl_K2rxHIFyhyyWc_SBg&_nc_ht=scontent-iad3-1.cdninstagram.com&oh=45d21646ce19f96d5ee423ac99cc80b3&oe=5EF67F82";
const imageSize = "auto 50%";
const outputFile = `bin/data/previews_${imageSize}.html`;

runner(async () => {
  const products = await Product.find({ published: true })
    .populate("mockups")
    .exec();
  let categoryCount = 0;
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      categoryCount++;
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});
  const urls = [];
  let index = 1;
  for (const category in productsByCategory) {
    const product = productsByCategory[category][0];
    for (const mockup of product.mockups) {
      urls.push(
        await product.getPreviewUrl("#ffffff", testImageUrl, imageSize, mockup)
      );
    }
    log.writeTmp(`Category ${index++}/${categoryCount}`);
  }
  fs.writeFileSync(
    outputFile,
    `<html>\n<body><h1>image_size: ${imageSize}</h1>\n${urls.map(
      (url) => `<img src="${url}"/>\n`
    ).join()}</body>\n</html>\n`
  );
});
