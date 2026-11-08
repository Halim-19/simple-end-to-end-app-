const taskService = require('../services/tasks.service')


const getAllTasks = async (req , res)=>{
    try {
        const data = await taskService.getAll()
        return res.send(data)
    } catch (error) {
        return res.status(500).json('no data been found')
    }
}

const getTaskById = async (req, res ) =>{
    
    const id = Number(req.params.id)
    if(isNaN(id)){
        return res.status(400).json({error: 'id must be a number'})
    }

    try {
        // if(!isNaN(id)){ throw new Error("id must be number")}
        const data = await taskService.getById(id)
        if(!data){
            return res.status(404).json({error: 'task not found'})
        }
        res.send(data)
        
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

const createTask = async (req , res) =>{
    const ttl = req.body.ttl
    const desc = req.body.desc
    if(!ttl && !desc ) return res.status(400).json({error: 'task title and describtion are required'})
    
    try {
    const response = await taskService.addTasks(ttl , desc)
    if(!response) res.status(500).json({error: 'error adding the task'})
    res.status(200).json("task created successfully ")

    }catch{
        res.status(500).json({error: 'error adding the task'})
    }
}

const modifyTask = async (req, res ) =>{
    const id = Number(req.params.id)
    if(isNaN(id)){
        return res.status(400).json({error: 'id must be a number'})
        
    }
    const ttl = req.body.ttl
    const desc = req.body.desc
    

    if(!ttl && !desc ) return res.send('no data been modified')
    
    try {
        const data = await taskService.modifyTask(id , ttl , desc)
        if(!data) res.status(404).json({error : "no task found to modify"})
        return res.send(data)
        
    } catch (error) {
        return res.status(404).json({error : "error modifying task "})
        
    }

    

}

const deleteData = async (req, res) => {
    const id = Number(req.params.id)
    if(isNaN(id)){
        return res.status(400).json({error: 'id must be a number'})
    }

    try {
        const data = await taskService.deleteTask(id)
        if(!data) res.status(400).json({error: 'the task not found'})
        return res.status(200).json(data )
    } catch (error) {
        return res.status(400).json({error: 'error deleting task'})
    }
}



module.exports = {getAllTasks , getTaskById , createTask , modifyTask , deleteData}