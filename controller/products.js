const { find } = require('../models/products');
const products = require('../models/products');
const Product = require('../models/products');



const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    name: 'vase table',
  });
  res.status(200).json({ msg: products, nbHits: products.length, });
}

const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query);
  console.log(req.query);
  res.status(200).json({ msg: products, nbHits: products.length, });
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
};