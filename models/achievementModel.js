const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var acheivementSchema = new mongoose.Schema(
  {
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
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Acheive", acheivementSchema);
