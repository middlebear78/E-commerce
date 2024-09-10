const SubCategory = require("../models/subCategory"); // Capitalized to follow common convention for models
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const subCategory = await new SubCategory({
      name,
      slug: slugify(name),
    }).save();
    res.json(subCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Sub Category Failed");
  }
};

exports.list = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({}) // Use capitalized model here
      .sort({ createdAt: -1 })
      .exec();
    res.json(subCategories);
  } catch (err) {
    console.log(err);
    res.status(400).send("Fetch Sub Categories Failed");
  }
};

exports.read = async (req, res) => {
  try {
    let subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec(); // Capitalized model
    res.json(subCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Fetch Sub Category Failed");
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to Update Sub Category");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to Delete Sub Category");
  }
};
