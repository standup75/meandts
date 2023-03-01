const base = require("./base");
const braintree = require("braintree");
const Order = require("src/models/order");
const Product = require("src/models/product");
const http = require("src/lib/http");
const utils = require("src/lib/utils");

const gateway = braintree.connect({
  environment:
    process.env.BRAINTREE_SANDBOX === "true"
      ? braintree.Environment.Sandbox
      : braintree.Environment.Production,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const shippingCosts = {
  international: {
    "International Priority": {
      first: 11.99,
      addl: 4,
    },
  },
  domestic: {
    Economy: {
      first: 5.99,
      addl: 2,
    },
    Ground: {
      first: 11,
      addl: 2,
    },
    "2 Day": {
      first: 20,
      addl: 3,
    },
    "Standard Overnight": {
      first: 25,
      addl: 4,
    },
  },
};

module.exports = base(Order, {
  async getToken(req, res) {
    let clientToken;
    try {
      clientToken = await gateway.clientToken.generate();
    } catch (err) {
      throw new Error(`Braintree error: ${err.message}`);
    }
    res.status(201).json(clientToken);
  },
  async create(req, res) {
    if (!req.body.amount || !req.body.nonce) {
      throw new Error(`amount and paymentMethodNonce required`);
    }
    const amount = Math.round(parseFloat(req.body.amount) * 100) / 100;
    try {
      const braintreeResponse = await gateway.transaction.sale({
        amount,
        paymentMethodNonce: req.body.nonce,
        options: { submitForSettlement: true },
      });
      if (braintreeResponse.success) {
        const order = new Order();
        order.assign(req.body);
        order.product = await Product.findById(req.body.productId).exec();
        await order.save();
        // https://customcat-beta.mylocker.net/api/v1/#order2
        const customCatResponse = await http.post(
          `${process.env.CUSTOM_CAT_URL}/order/${order.orderId}`,
          {
            api_key: process.env.CUSTOM_CAT_API_KEY,
            order_id: order.orderId,
            shipping_first_name: order.firstName,
            shipping_last_name: order.lastName,
            shipping_email: order.email,
            shipping_phone: order.phone,
            shipping_address1: order.address,
            shipping_city: order.city,
            shipping_state: order.state,
            shipping_zip: order.zipCode,
            shipping_country: order.country,
            shipping_method: order.shippingId,
            seller_name: "Me & T's",
            seller_phone: "646-400-8475",
            seller_address1: "627 North Rossmore Avenue #404",
            seller_city: "Los Angeles",
            seller_state: "California",
            seller_zip: "90004",
            seller_country: "USA",
            items: [
              {
                quantity: order.quantity,
                catalog_sku: order.skuId,
                design_url: order.designUrl,
                mockup_url: order.previewUrl,
                preset_id: 2,
              },
            ],
            sandbox: process.env.CUSTOM_CAT_SANDBOX === "true",
          }
        );
        if (customCatResponse.status === 400) {
          let message;
          if (customCatResponse.statusText.indexOf("30720") > -1) {
            message = "Out of stock, sorry. Please try another product";
          } else {
            message = customCatResponse.statusText;
            console.log(customCatResponse);
          }
          res.status(400).json({ message });
        } else {
          const message = await customCatResponse.json();
          console.log("order created ===>", message);
          await utils.sendEmail({
            email: order.email,
            name: `${order.firstName} ${order.lastName}`,
            orderId: order.orderId,
            previewUrl: order.previewUrl,
          });
          res.status(201).json({ success: true, order });
        }
      } else {
        console.error("Braintree error 1", braintreeResponse);
        throw new Error(braintreeResponse);
      }
    } catch (err) {
      console.error("Braintree error 2", err);
      throw new Error(`Braintree error. Invalid address format`);
    }
  },
  async shippingCosts(req, res) {
    const result = [];
    const shippingOptions = await http.get(
      `${process.env.CUSTOM_CAT_URL}/shipping?api_key=${process.env.CUSTOM_CAT_API_KEY}&country_code=${req.query.country}`
    );
    for (shippingOption of shippingOptions) {
      const key = req.query.country === "US" ? "domestic" : "international";
      const cost = shippingCosts[key][shippingOption.SHIPPING_NAME];
      result.push({
        label: shippingOption.SHIPPING_NAME,
        shippingId: shippingOption.SHIPPING_ID,
        cost: cost.first,
        addl: cost.addl,
      });
    }
    res.status(200).json(result);
  },
  async status(req, res) {
    const order = await Order.findById(req.params.orderId).exec();
    const status = await http.get(
      `${process.env.CUSTOM_CAT_URL}/order/status/${order.orderId}?api_key=${process.env.CUSTOM_CAT_API_KEY}`
    );
    console.log("--->", status);
    res.status(200).json(status);
  },
});
