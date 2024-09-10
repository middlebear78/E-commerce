const subCategory = require("../models/subCategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const subCategory = await new subCategory({
      name,
      slug: slugify(name),
    }).save();
    res.json(subCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create sub Category Failed");
  }
};

exports.list = async (req, res) => {
  try {
    const subCategories = await subCategory
      .find({})
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
    let subCategory = await subCategory
      .findOne({ slug: req.params.slug })
      .exec();
    res.json(subCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Fetch Sub Category Failed");
  }
};

exports.update = async (req, res) => {
  const { name } = req.body; // hp to hewlit packard
  try {
    const updated = await subCategory
      .findOneAndUpdate(
        {
          slug: req.params.slug,
        },
        { name, slug: slugify(name) },
        { new: true } // will send only the json response of the updated category .....
      )
      .exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    err.status(400).send("Failed to Update Sub Category");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await subCategory
      .findOneAndDelete({
        slug: req.params.slug,
      })
      .exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    err.status(400).send("Failed to Delete sub Category");
  }
};
