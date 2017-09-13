import mongoose from 'mongoose';
require ('mongoose-double')(mongoose);


const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;
const schema = new Schema({
  product_name: {type: String, required: true},
  product_price: {type:SchemaTypes.Double, required:true},
  product_catlog: {type: String, required:true},
  customer: {type: SchemaTypes.ObjectId, ref:'Customers'}
});

exports default mongoose.model('Products', schema);