const { find } = require('../models/products');
// const products = require('../models/products');
const Product = require('../models/products');



const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price').limit(30);
  res.status(200).json({ msg: products, nbHits: products.length, });
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, limit, page } = req.query;
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

  // console.log(queryObject);
  // let result = await Product.find(queryObject);

  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('created_at');
  }

  if (fields) {
    const fieldsLists = fields.split(',').join(' ');
    result = result.select(fieldsLists);
  }

  const pageSelect = Number(page) || 1;
  const limitSelect = Number(limit) || 10;
  const skip = (pageSelect - 1) * limit;

  result = result.skip(skip).limit(limitSelect);

  const products = await result;
  res.status(200).json({ msg: products, nbHits: products.length, });
}

module.exports = {
  getAllProductsStatic,
  getAllProducts
};