import mongoose from 'mongoose';
require ('mongoose-double')(mongoose);
import Customer from './customer';

const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;
const schema = new Schema({
  product_name: {type: String, required: true},
  product_price: {type:SchemaTypes.Double, required:true},
  product_catlog: {type: String, required:true},
  customer: {type: SchemaTypes.ObjectId, ref:'Customers'}
});

schema.post('remove', function(product){
  Customer.findById(product.customer, function (err, customer) {
      if(err){console.log(err);}
      customer.products.pull(product);
      customer.save();
  });
});
export default mongoose.model('Products', schema);
