const crypto = require("crypto");
const Product = require("src/models/product");
const base = require("./base");

module.exports = base(Product, {
  async index(req, res) {
    res
      .status(200)
      .json({ products: await Product.find().populate('mockups').sort({ priority: -1 }).exec() });
  },
  async buildPreview(req, res) {
    if (req.body.imageUrl) {
      const previewUrl = await Product.getPreviewUrl(
        req.params.productId,
        req.params.colorHex,
        req.body.imageUrl,
        req.body.sizePercent || 50
      );
      if (previewUrl) {
        res.status(200).json({ src: previewUrl });
      } else {
        res.sendStatus(500);
      }
      return;
    }
    res.sendStatus(200);
  },
  // see https://github.com/codeartists/codeartists-com/blob/master/How-to-upload-files-to-Amazon-S3-from-client-side-web-app.md
  signS3Put(req, res) {
    const objectName = req.query.s3ObjectName.replace(/^\/+/, "");
    const mimeType = req.query.s3ObjectType;
    const expires = parseInt(new Date().getTime() / 1000, 10) + 100;
    const amzHeaders = "x-amz-acl:public-read";
    const signer = crypto.createHmac("sha1", process.env.AWS_SECRET_KEY);
    const stringToSign = `PUT\n\n${mimeType}\n${expires}\n${amzHeaders}\n/${process.env.AWS_BUCKET_NAME}/${objectName}`;
    const sig = encodeURIComponent(
      signer.update(stringToSign).digest("base64")
    );
    const s3Url = `https://s3-${process.env.AWS_BUCKET_ZONE}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${objectName}`;
    let url = `${s3Url}?AWSAccessKeyId=${process.env.AWS_ACCESS_KEY}&Expires=${expires}&Signature=${sig}`;
    if (!req.query.noEncoding) {
      url = encodeURIComponent(url);
    }
    res.status(201).json({ url });
  },
});
