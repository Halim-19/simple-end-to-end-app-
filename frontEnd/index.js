const taskList = document.getElementById('tasks')
const getData = document.getElementById('getData')
const addNew = document.getElementById('addNew')

const databaseUrl = "http://localhost:8800/"

// api calls 

const getAllData = async () =>{
    try {
        const response = await fetch(`${databaseUrl}tasks`)
        const data = await response.json()
        if(!data){
            console.log('error fetching ')
             return null
        }
        return data 
    
    } catch (error) {
        throw new Error('no data been fetched')
    }
}

const AddTask =  async () =>{
    const newTask ={
        ttl: "new task",
        desc:"task added"
    } 


    try {
        const response = await fetch(
            `${databaseUrl}tasks/`,{
                method:'POST',
                headers: {
                  'Content-Type': 'application/json' // Tell the server you are sending JSON
                },
                body:JSON.stringify(newTask)
            }
        )
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json()
        if(!data){
            console.log('error add new task ')
             return null
        }
        return data 
    
    } catch (error) {
        throw new Error('no data been added')
    }
}



// action handller 
getData.addEventListener('click' , async ()=> {
    let data = await getAllData()
    data.forEach((task) => {
    taskList.innerHTML += `
        <h1>${task.title}</h1>
        <p>${task.description}</p>
    `
    });
}) 

addNew.addEventListener('click' , async ()=>{
    await AddTask()
    
})


