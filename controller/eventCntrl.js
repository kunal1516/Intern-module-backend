const Event = require("../models/eventModel");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

const addEvent = asyncHandler(async (req, res) => {
  try {
    const { title, description, startDate, endDate, location } = req.body;
    const url = req.protocol + "://" + req.get("host");
    const newEvent = new Event({
      title,
      description,
      startDate,
      endDate,
      location,
      image: url + "/public/" + req.file.filename,
    });
    const finalEvent = await newEvent.save();
    res.status(200).json({
      success: true,
      message: "Event added successfully",
      event: finalEvent,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error(error.message);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
});
//get all events

const getallEvent = asyncHandler(async (req, res) => {
  try {
    const gets = await Event.find();
    res.json(gets);
  } catch (error) {
    throw new Error(error);
  }
});
// get a  single event
const getEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const get = await Event.findById(id);
    res.json(get);
  } catch (error) {
    throw new Error(error);
  }
});

// delete a event

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Event.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "deleted succesfully!",
      event: deleted,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update an event

const updateEvent = asyncHandler(async (req, res) => {
  try {
    const { title, description, startDate, endDate, location } = req.body;
    const { id } = req.params;
    const existingEvent = await Event.findById(id);

    if (!existingEvent) {
      res.json("Event not found");
    }
    existingEvent.title = title;
    existingEvent.description = description;
    existingEvent.startDate = startDate;
    existingEvent.endDate = endDate;
    existingEvent.location = location;

    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      existingEvent.image = url + "/public/" + req.file.filename;
    }
    const updatedEvent = await existingEvent.save();
    // res.json(updatedEvent)
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      news: updatedEvent,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
      res.json("internal server error");
    }
  }
});

//dashboard
const dashboard = asyncHandler(async (req, res) => {
  try {
    const totalEventCount = await Event.countDocuments();
    res.json({ count: totalEventCount });
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
    const eventCount = await Event.countDocuments();
    if (skip >= eventCount) throw new Error("This Page does not exists");
  }
  console.log(page, limit, skip);
  
  const event = await query;
  res.json(event);
  } catch (err){
    res.status(500).json({message:err.message});
  }
  });

module.exports = {
  addEvent,
  getEvent,
  getallEvent,
  deleteEvent,
  updateEvent,
  dashboard,
  pagination
};
