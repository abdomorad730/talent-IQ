import express from 'express'
import { ENV } from './lib/env.js'
import { serve} from 'inngest/express'
import {inngest, functions} from './lib/inngest.js'
import path from 'path'
import connectDB from './lib/db.js'
import cors from 'cors'

const app = express()

const port = ENV.PORT
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use('/api/inngest',serve({client:inngest, functions}))
app.get('/health', (req, res) => res.send('Hello World!'))
app.get('/books', (req, res) => res.send('Hello!'))





const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    } catch (error) {
        console.error('Error starting the server',error)
    }
}
startServer()