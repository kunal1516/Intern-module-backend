const express = require('express')
const router = express.Router()
const {addTeam, getTeam, getAllTeam, deleteTeam, updateTeam, dashboard , pagination}=require('../controller/teamCtrl')
const { saveTeamImage } = require('../middleware/uploadImages')

router.post('/add' , saveTeamImage,addTeam)
router.get('/:id',getTeam)
router.get('/',getAllTeam)
router.get('/teams/count',dashboard)
router.get('/page', pagination);
router.delete('/:id',deleteTeam)
router.put('/:id', saveTeamImage, updateTeam)

module.exports=router;