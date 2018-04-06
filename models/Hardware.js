var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var HardwareSchema = new Schema({
  title: {
    type: String,
    required: true,
    // unique: true
  },
  link: {
    type: String,
    required: true,
    // unique: true

  },
  image:{
    type: String,
    required:true,
    // unique: true
  },
  price:{
    type: String,
    required: true
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
    // default: "[]"
  }
});

var Hardware = mongoose.model("Hardware", HardwareSchema);

// Export the Hardware model
module.exports = Hardware;
