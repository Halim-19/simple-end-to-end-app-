const fs = require('fs/promises');
const path = require('path');
const jsonFile = path.join(__dirname, '../data/data.json')

const taskService = {
    
    getAll: async () => {
            const fileContent = await fs.readFile(jsonFile, 'utf-8');
            return JSON.parse(fileContent);
    },

    getById: async (id) => {
        const fileContent = await fs.readFile(jsonFile, 'utf-8');
        const data = JSON.parse(fileContent)
        const task = data.filter((task)=>task.id === id)
        if(task.length === 0) return null
        return task;
        
    },

    addTasks : async (ttl, desc) => {
        const allData = await taskService.getAll()
        const newId = allData.length 
        console.log(newId)

        const newTask =  {"id" : newId , "title":ttl , "description":desc}

        allData.push(newTask)
        console.log(allData)
        
        const updatedJsonString = JSON.stringify(allData, null, 2);
        await fs.writeFile(jsonFile , updatedJsonString, 'utf-8')
        
        return newTask
        
    },


    modifyTask : async (id, ttl , desc )=>{
        const allData = await taskService.getAll()
        
        const taskFind = allData.findIndex((task) => task.id === id)
        if(taskFind === -1 ) {
            console.log('task not found')
            return null ;
        } 

        console.log("old : " , allData[taskFind])

        // fallback 
        allData[taskFind].title = ttl || allData[taskFind].title 
        allData[taskFind].description = desc || allData[taskFind].description 

        // write the updated data 
        const updatedJsonString = JSON.stringify(allData, null, 2);
        await fs.writeFile(jsonFile , updatedJsonString, 'utf-8')

        console.log("new" , allData[taskFind])
        return  allData[taskFind]
    },

    deleteTask : async (id) => {
        const allData = await taskService.getAll()
        
        const taskFind = allData.findIndex((task) => task.id === id)
        if(taskFind === -1 ) {
            console.log('id not found')
            return null ;
        }
        
        const newData = allData.filter((task)=> task.id !== id )
        
        const updatedData = JSON.stringify(newData,null ,2 )
        await fs.writeFile(jsonFile , updatedData , 'utf-8')

        return updatedData
    }
    
};


module.exports = taskService;
