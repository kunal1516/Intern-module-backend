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
module.exports = {

}