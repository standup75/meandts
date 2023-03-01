require("rootpath")();
const runner = require("../lib/runner");
const parallel = require("../lib/parallel");
const Product = require("src/models/product");
const Mockup = require("src/models/mockup");

const categoryMap = {
  mugs: "Mug",
  hoodies: "Hoodie",
  tshirts: "T-shirt",
  sweatshirts: "Long Sleeve T-shirt",
  tanks: "Tank Top",
};

runner(async () => {
  const products = await Product.find({ published: true }).exec();
  const mockups = await Mockup.find({ published: true }).exec();
  for (const product of products) {
    let [sex, category] = product.category.split("en ");
    if (!category) {
      category = sex;
      sex = null;
    } else {
      sex = `${sex.toLowerCase()}en`;
    }
    let elligibleMockups = mockups.filter((m) => categoryMap[m.category] === category);
    if (sex) {
      elligibleMockups = elligibleMockups.filter((m) => m.sex.includes(sex));
    }
    product.mockups = elligibleMockups;
    await parallel.addPromise(product.save());
  }
  await parallel.flush();
});
