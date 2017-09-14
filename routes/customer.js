import express from 'express';
import Customer from '../Models/customer';
import mongoose from 'mongoose';
let router = express.Router();

router.get('/', function (req, res){
  Customer.find().exec(function (err, customers) {
      if(err){
        return res.status(500).json({
          title: 'An error while saving the product',
          error: err
        });
      }
      res.json(customers);
    });
});

router.post('/', function (req, res) {
  let customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    country: req.body.country,
  });
  customer.save(function(err,result){
    if(err){
      return res.status(500).json({
        title: 'An error while saving the Customer',
        error: err
      });
    }
    res.status(201).json({
      message: 'Customer Saved',
      obj: result
    });
  });
});

router.patch('/:id?', function (req, res) {
  var mid = mongoose.Types.ObjectId(req.params.id);
  Customer.findOne({_id:mid}, function (err, customer) {
    if(err){
      return res.status(500).json({
        title: 'An error while saving the Customer',
        error: err
      });
    }
    customer.firstName = req.body.firstName;
    customer.lastName= req.body.lastName;
    customer.mobile= req.body.mobile;
    customer.email= req.body.email;
    customer.country= req.body.country;
    customer.save(function (err, result) {
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

router.delete('/:id?', function (req, res) {
  var mid = mongoose.Types.ObjectId(req.params.id);
  Customer.findOneAndRemove({_id:mid}, function(err, offer){
      if(err){
        return res.status(500).json({
          title: 'An error while saving the Customer',
          error: err
        });
      }
      res.status(200).json({message:"success", obj: offer});
  });
});
export default router;
