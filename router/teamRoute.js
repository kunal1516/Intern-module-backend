const express = require('express')
const router = express.Router()
const {addTeam, getTeam, getAll, deleteTeam, updateTeam, dashboard}=require('../controller/teamCtrl')
const { saveTeamImage } = require('../middleware/uploadImages')

router.post('/add' , saveTeamImage,addTeam)
router.get('/:id',getTeam)
router.get('/',getAll)
router.get('/teams/count',dashboard)
router.delete('/:id',deleteTeam)
router.put('/:id', saveTeamImage, updateTeam)

module.exports=router;