import express from 'express'
import { ENV } from './lib/env.js'

const app = express()

const port = ENV.PORT

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))