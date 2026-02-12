import mongoose from 'mongoose'
import { ENV } from './env.js'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URL)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB