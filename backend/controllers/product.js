const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product Failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.read = async (req, res) => {
  try {
    const products = await Product.find({}); 
    res.status(200).json(products); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" }); 
  }
};
