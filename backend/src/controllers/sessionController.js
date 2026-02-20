import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export const createSession = async (req, res) => {
    try {
        const { problem, difficulty } = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;
        if (!problem || !difficulty) {
            return res.status(400).json({ message: 'Problem and difficulty are required' });
        }
        const callId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(7);
        const session = await Session.create({ problem, difficulty, host: userId, callId });
        await streamClient.video.call('default', callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: {
                    sessionId: session._id.toString(),
                    problem,
                    difficulty,
                }
            }
        })
        const channal = chatClient.channel('messaging', session._id.toString(), {
            name: `${problem} Session`,
            members: [clerkId],
            created_by_id: clerkId,
        })
        await channal.create()
        res.status(201).json({ message: 'Session created successfully', session });

    } catch (error) {
        console.error('Error creating session:', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getActiveSession = async (req, res) => {
    try {
        const sessions = await Session.findOne({ status: 'active' })
            .populate('host', 'name email imageProfile')
            .populate('participant', 'name email imageProfile')
            .sort({ createdAt: -1 })
            .limit(20)
        res.status(200).json({ message: 'Active session fetched successfully', sessions });

    } catch (error) {
        console.error('Error fetching active session:', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getMyRecentSessions = async (req, res) => {
    try {
        const userId = req.user._id;
        const sessions = await Session.find({ $or: [{ host: userId }, { participant: userId }], status: 'completed' })
            .populate('host', 'name email imageProfile')
            .populate('participant', 'name email imageProfile')
            .sort({ createdAt: -1 }).limit(20)
        res.status(200).json({ message: 'My recent sessions fetched successfully', sessions });

    } catch (error) {
        console.error('Error fetching my recent sessions:', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getSessionById = async (req, res) => {
    try {
        const sessionId = req.params.id;
        const session = await Session.findById(sessionId)
            .populate('host', 'name email imageProfile clerkId')
            .populate('participant', 'name email imageProfile clerkId')
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json({ message: 'Session fetched successfully', session });

    } catch (error) {
        console.error('Error fetching session by ID:', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const joinSession = async (req, res) => {
    try {
        const sessionId = req.params.id;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        if (session.status === 'completed') {
            return res.status(400).json({ message: 'Cannot join a completed session' });
        }
        if (session.host.toString() === userId.toString()) {
            return res.status(400).json({ message: 'Host cannot join their own session as participant' });
        }
        if (session.participant) {
            return res.status(409).json({ message: 'Session already has a participant' });
        }
        session.participant = userId;
        await session.save();
        const channal = chatClient.channel('messaging', session.callId)
        channal.addMembers([clerkId])
        res.status(200).json({ message: 'Session joined successfully', session });
    } catch (error) {
        console.error('Error joining session:', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const endSession = async (req, res) => {
    try {
        const sessionId = req.params.id;
        const userId = req.user._id;
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Only the host can end the session' });
        }
        if (session.status === 'completed') {
            return res.status(400).json({ message: 'Session is already completed' });
        }

        const call = streamClient.video.call('default', session.callId)
        await call.delete({ hard: true })

        const channal = chatClient.channel('messaging', session.callId)
        await channal.delete()

        session.status = 'completed';
        await session.save();
        
        res.status(200).json({ message: 'Session ended successfully' });
    } catch (error) {
        console.error('Error ending session:', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}
