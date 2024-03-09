const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

//adding contact

const addContact = asyncHandler(async (req, res) => {
  const { name, email, comment } = req.body;
  try {
    const add = new Contact({
      name,
      email,
      comment,
    });
    const finalContact = await add.save();
    res.json(finalContact);
  } catch (error) {
    throw new Error(error);
  }
});

// update contact

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, comment } = req.body;
  try {
    const update = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        email,
        comment,
      },
      { new: true }
    );
    const finalUpdate = await update.save();
    res.json(finalUpdate);
  } catch (error) {
    throw new Error(error);
  }
});

//get all contacts

const getallContact = asyncHandler(async (req, res) => {
  try {
    const gets = await Contact.find();
    res.send(gets);
  } catch (error) {
    throw new Error(error);
  }
});
// get a  single contact
const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const get = await Contact.findById(id);
    res.send(get);
  } catch (error) {
    throw new Error(error);
  }
});

// delete a contact

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Contact.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "deleted succesfully!",
      contact: deleted,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//dashboard
const dashboard = asyncHandler(async (req, res) => {
  try {
    const totalContactCount = await Contact.countDocuments();
    res.send({ count: totalContactCount });
  } catch (error) {
    // Handle errors
    console.error("Error getting sign-ups count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const pagination = asyncHandler(async (req,res)=> {
  try{
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const contactCount = await Contact.countDocuments();
    if (skip >= contactCount) throw new Error("This Page does not exists");
  }
  console.log(page, limit, skip);
  
  const contact = await query;
  res.json(contact);
  } catch (err){
    res.status(500).json({message:err.message});
  }
  });

module.exports = {
  addContact,
  updateContact,
  getContact,
  getallContact,
  deleteContact,
  dashboard,
  pagination
};
