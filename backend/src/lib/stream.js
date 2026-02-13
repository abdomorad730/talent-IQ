import {StreamChat} from 'stream-chat'
import { ENV } from './env.js'
const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_SECRET_KEY
if (!apiKey || !apiSecret) {
    throw new Error('Stream API key and secret are required')
}
export const streamClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData)
        console.log(`User ${userData.id} upserted to Stream`, userData)
    } catch (error) {
        console.error('Error upserting user to Stream:', error)
    }
}
export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId)
        console.log(`User with ID ${userId} deleted from Stream`)
    } catch (error) {
        console.error('Error deleting user from Stream:', error)
    }
}