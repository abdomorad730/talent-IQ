import { streamClient } from "../lib/stream.js"

export const getStreamToken = async (req, res) => {
    try {
        const token = streamClient.createToken(req.user.clerkId)
        res.json({ token, userId: req.user.clerkId ,userName: req.user.name, userImage: req.user.imageProfile })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}