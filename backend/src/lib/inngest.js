import {Inngest} from 'inngest'
import connectDB from './db.js'
import User from '../models/Users.js'
import e from 'express'
export const inngest = new Inngest({ name: "Talant-IQ " });
const syncUser = inngest.createFunction(
    {id:'sync-user'},
    {event:'clerk/user.created'},
    async ({event, step}) => {
        await connectDB()
        const {id, email_addresses, first_name, last_name, image_url} = event.data
        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address || '',
            name: `${first_name} ${last_name}`.trim(),
            imageProfile: image_url || ''
        }
        const userExists = await User.findOne({clerkId: id})

        if(!userExists){
            await User.create(newUser)
            console.log('User created:', newUser)
        } else {
            console.log('User already exists:', newUser)
        }   
    }
)
const deletedUser = inngest.createFunction(
    {id:'deleted-user'},
    {event:'clerk/user.deleted'},
    async ({event, step}) => {
        await connectDB()
        const {id} = event.data
       
        await User.deleteOne({clerkId: id})
    }
)
export const functions =[syncUser , deletedUser]