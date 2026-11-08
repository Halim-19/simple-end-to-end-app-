const app = require('./src/app')
require('dotenv').config()



const PORT = process.env.PORT
app.listen(PORT, ()=>{console.log(`App running on  ${PORT}`)})