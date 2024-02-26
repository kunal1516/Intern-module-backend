const Contact = require('../models/contactModel')
const asyncHandler = require('express-async-handler')

//adding contact

const addContact = asyncHandler (async ( req, res) => {
    const { name , email, comment} = req.body
    try {
   
    const add = new Contact ({
        name, email, comment
    })
    const finalContact = await add.save()
    res.json(finalContact)

  } catch (error) {
    throw new Error(error)
  }
})

// update contact

const updateContact = asyncHandler (async (req,res) => {
    const {id} = req.params
    const { name , email, comment} = req.body
    try {
        const update = await Contact.findByIdAndUpdate(id , {
            name , email, comment
        } , {new : true})
        const finalUpdate = await update.save()
        res.json(finalUpdate)
    } catch (error) {
        throw new Error(error)
    }
})

//get all contacts

const getallContact = asyncHandler(async (req, res) => {
    try {
        const gets = await Contact.find()
        res.json(gets)
    } catch (error) {
        throw new Error(error)
    }
})
// get a  single contact
const getContact = asyncHandler(async ( req, res) => {
    const { id } = req.params
    try {
        const get = await Contact.findById( id ) 
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})

// delete a contact 

const deleteContact = asyncHandler ( async ( req, res) => {
    const {id} = req.params
    try {
        const deleted = await Contact.findByIdAndDelete(id)
        res.json({
            success:true,
            message : "deleted succesfully!",
            contact :  deleted} )
    } catch (error) {
        throw new Error(error)
    }
})
 
module.exports = {
 addContact,
 updateContact, 
 getContact,
 getallContact,
 deleteContact
}