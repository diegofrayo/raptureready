var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String },
  channels: [{
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  }]
});


var Category = mongoose.model('Category', CategorySchema);

//export default Category;
module.exports = Category;