const { find } = require('../models/products');
const products = require('../models/products');
const Product = require('../models/products');



const getAllProductsStatic = async (req, res) => {
  const search = 'ab';


  const products = await Product.find({
    name: { $regex: search, $options: 'i' },
  });
  res.status(200).json({ msg: products, nbHits: products.length, });
}

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (name) {
    // queryObject.name = name;
    queryObject.name = { $regex: name, $options: 'i' };
  }

  console.log(queryObject);
  const products = await Product.find(queryObject);

  res.status(200).json({ msg: products, nbHits: products.length, });
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
};