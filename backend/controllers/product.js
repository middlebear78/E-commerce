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

exports.listAll = async (req, res) => {
    try {
        const products = await Product.find({})
            .limit(parseInt(req.params.count || 10))
            .populate("category")
            .populate("subcategories")
            .sort([["createdAt", "desc"]])
            .exec();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndDelete({ slug: req.params.slug }).exec();
        res.json(deleted);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Failed to delete product" });
    }
};
