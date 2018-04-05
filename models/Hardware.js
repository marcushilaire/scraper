var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var HardwareSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  image:{
    type: String,
    required:true
  },
  price:{
    type: String,
    required: true
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Hardware = mongoose.model("Hardware", HardwareSchema);

// Export the Hardware model
module.exports = Hardware;
