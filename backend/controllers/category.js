const Category = require("../models/category");
const slugify = require("slugify");
const sub = require("../models/subCategory");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Category Failed");
  }
};

exports.list = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(400).send("Fetch Categories Failed");
  }
};

exports.read = async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("Fetch Category Failed");
  }
};

exports.update = async (req, res) => {
  const { name } = req.body; // hp to hewlit packard
  try {
    const updated = await Category.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, slug: slugify(name) },
      { new: true } // will send only the json response of the updated category .....
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to Update Category");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to Delete Category");
  }
};

exports.getSubs = async (req, res) => {
  try {
    const parentId = req.params._id
    const subs = await sub.find({ parent_category: parentId });
    console.log("Fetched subs:", subs);
    return res.json(subs);
    
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching subcategories." });
  }
};
