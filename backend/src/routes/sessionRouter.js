import { Router } from "express";
import { protectRoute } from "../middleware/ProtectRoute.js";
import { createSession, endSession, getActiveSession, getMyRecentSessions, getSessionById, joinSession } from "../controllers/sessionController.js";

const sessionRouter = Router()
sessionRouter.post('/',protectRoute,createSession)
sessionRouter.get('/active',protectRoute,getActiveSession)
sessionRouter.get('/my-recent-sessions',protectRoute,getMyRecentSessions)
sessionRouter.get('/:id',protectRoute,getSessionById)
sessionRouter.post('/:id/join',protectRoute,joinSession)
sessionRouter.post('/:id/end',protectRoute,endSession)




export default sessionRouter