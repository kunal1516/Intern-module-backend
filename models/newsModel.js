const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("News", newsSchema);
