import express from 'express';
import Product from '../Models/product';
import Customer from '../Models/customer';
import mongoose from 'mongoose';
let router = express.Router();

router.get('/:id?', function (req, res) {
  var mid = mongoose.Types.ObjectId(req.params.id);
    Product.find({customer:mid})
      .exec(function (err, products) {
        if(err){
          return res.status(500).json({
            title: 'An error while saving the product',
            error: err
          });
        }
        res.status(200).json(products);
      });
});
router.post('/:id?', function (req, res) {
  var mid = mongoose.Types.ObjectId(req.params.id);

  Customer.findById(mid, function(err, customer){
      if(err){
        return res.status(500).json({
          title: 'An error while saving the product',
          error: err
        });
      }

      var product = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_catlog: req.body.product_catlog,
        customer: customer
      });
      product.save(function(err,result){
        if(err){
          return res.status(500).json({
            title: 'An error while saving the product',
            error: err
          });
        }
        console.log(result);
        customer.products.push(result._id);
        customer.save();
        res.status(201).json(result);
      });
  });
});
router.patch('/:id?/:product_id?', function(req,res){
  var mid = mongoose.Types.ObjectId(req.params.product_id);
  Product.findOne({_id:mid}, function (err, product) {
    if(err){
      return res.status(500).json({
        title: 'An error while saving the Customer',
        error: err
      });
    }
    product.product_name = req.body.product_name;
    product.product_price= req.body.product_price;
    product.product_catlog= req.body.product_catlog;
    product.save(function (err, result) {
      if(err){
        return res.status(500).json({
          title: 'An error while saving the Customer',
          error: err
        });
      }
      res.status(200).json({result});
    });
  });
});
router.delete('/:product_id?', function(req,res){
  var mid = mongoose.Types.ObjectId(req.params.product_id);
  Product.findById(mid, function(err, offer){
      if(err){
        return res.status(500).json({
          title: 'An error while saving the Customer',
          error: err
        });
      }
      offer.remove(function(err, result){
        if(err){
            return res.status(500).json({
            title: 'An error while saving the Customer',
            error: err
          });
        }
        res.status(200).json({message:"success", obj: result});
      });

  });
});
export default router;
