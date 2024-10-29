const uuid = require('uuid/v1');
const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    const mappedProducts = products.map((product) => {
      // product.imageUrl = `${req.protocol}://${req.get('host')}/images/${product.Image}`;
      return product;
    });
    res.status(200).json(mappedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Database error!' });
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found!' });
    }
    // product.imageUrl = `${req.protocol}://${req.get('host')}/images/${product.Image}`;
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Database error!' });
  }
};

exports.orderProducts = async (req, res, next) => {
  if (
    !req.body.contact ||
    !req.body.contact.firstName ||
    !req.body.contact.lastName ||
    !req.body.contact.address ||
    !req.body.contact.city ||
    !req.body.contact.email ||
    !req.body.products
  ) {
    return res.status(400).json({ error: 'Bad request!' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    req.body.contact.firstName.length < 2 ||
    /[^a-zA-Z]/.test(req.body.contact.firstName) ||
    req.body.contact.lastName.length < 2 ||
    /[^a-zA-Z]/.test(req.body.contact.lastName) ||
    req.body.contact.address.length < 10 ||
    req.body.contact.city.length < 3 ||
    /[^a-zA-Z]/.test(req.body.contact.city) ||
    !emailRegex.test(req.body.contact.email)
  ) {
    return res.status(400).json({ error: 'Invalid contact information!' });
  }

  const queries = req.body.products.map(async (productId) => {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`Product not found: ${productId}`);
      }
      product.image = `${req.protocol}://${req.get('host')}/images/${product.image}`;
      return product;
    } catch (error) {
      throw new Error('Database error!');
    }
  });

  try {
    const products = await Promise.all(queries);
    const totalAmount = products.reduce((total, product) => {
      return total + product.declinaisons[0].prix; // Assuming the first declinaison is the selected one
    }, 0);
    const orderId = uuid();
    res.status(201).json({
      contact: req.body.contact,
      products,
      totalAmount,
      orderId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
