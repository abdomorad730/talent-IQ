import express from 'express'
import { ENV } from './lib/env.js'
import { serve} from 'inngest/express'
import {inngest, functions} from './lib/inngest.js'
import { clerkMiddleware } from '@clerk/express'
import connectDB from './lib/db.js'
import cors from 'cors'
import { protectRoute } from './middleware/ProtectRoute.js'
import chatRouter from './routes/chatRouter.js'

const app = express()

const port = ENV.PORT
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(clerkMiddleware())

app.get('/', (req, res) => {
    res.json({ status: 'ok' })
})
app.use('/api/inngest',serve({client:inngest, functions}))
app.use('/api/chat', protectRoute, chatRouter)    




const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    } catch (error) {
        console.error('Error starting the server',error)
    }
}
startServer()