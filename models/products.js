const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provide'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be provide'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ['marcos', 'liddy', 'ikea', 'caressa'],
      message: '{VALUE} is not supported',
    }
    // enum: ['Ikea', 'IndexF', 'SBF', 'OTOP'],
  },
})

module.exports = mongoose.model('Product', productSchema);