import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;
const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  mobile: {type:String, required:true},
  email: {type:String, required:true, unique:true},
  country: {type:String, required:true},
  products:[{type: Schema.Types.ObjectId, ref: 'Products'}]
});

schema.plugin(mongooseUniqueValidator);

export default mongoose.model('Customers', schema);
