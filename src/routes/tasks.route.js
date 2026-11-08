const express = require('express')
const router  = express.Router()
const { getAllTasks, getTaskById, createTask , modifyTask,deleteData} = require('../controllers/tasks.controller') 

router.get('/',getAllTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id' , modifyTask)
router.delete('/:id' , deleteData)


module.exports = router