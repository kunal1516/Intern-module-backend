const adminIntern = require('../models/InternModel')
const asyncHandler = require('express-async-handler')

// adding a intern from admin side

const addAdminIntern = asyncHandler(async (req, res) => {
    const {fullName , email, contactNo, collegeName, selectField, selectYear, domainName} = req.body
    try {
        const addingIntern = new adminIntern({
            fullName , email, contactNo, collegeName, selectField, selectYear, domainName
        })
        const finalAddedInterns = await addingIntern.save()
        res.status(202).send(finalAddedInterns)
    } catch (error) {
        res.status(501).send(error)
    }
})

// update  a intern from admin side

const updateAdminIntern = asyncHandler(async (req, res) => {
    const {id} = req.params
    const {fullName , email, contactNo, collegeName, selectField, selectYear, domainName} = req.body
    try { 
        const updateIntern = await adminIntern.findByIdAndUpdate(id, {
            fullName , email, contactNo, collegeName, selectField, selectYear, domainName
        },
        {new : true})
        const updatedIntern = await updateIntern.save()
        res.status(202).send(updatedIntern)
    } catch (error) {
        res.status(501).send(error)
    }
})

const deleteAdminIntern = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const deletedIntern = await adminIntern.findByIdAndDelete(id)
        res.status(202).send( {message: "deleted succefully!",deletedIntern})
    } catch (error) {
        res.status(501).send(error)
    }
})

const getAdminIntern = asyncHandler(async(req, res) => {
    const {id} = req.params
    try {
        const getIntern = await adminIntern.findById(id)
        res.status(202).send( getIntern)
    } catch (error) {
        res.status(501).send(error)
    }
})

const getAllAdminInterns = asyncHandler(async(req, res) =>{
    try {
        const getAllIntern = await adminIntern.find()
        res.send(202).status( getAllIntern)
    } catch (error) {
        res.send(501).send(error)
    }
})

module.exports = {addAdminIntern, updateAdminIntern , deleteAdminIntern, getAdminIntern, getAllAdminInterns}
