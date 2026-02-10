import express, { json } from 'express'
import { ENV } from './lib/env.js'
import path from 'path'

const app = express()

const port = ENV.PORT
const __dirname=path.resolve()

app.get('/health', (req, res) => res.send('Hello World!'))
app.get('', (req, res) => res.send('Hello!'))



/*if (ENV.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`))