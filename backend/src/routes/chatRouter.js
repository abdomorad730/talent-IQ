import { Router } from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoute } from "../middleware/ProtectRoute.js";

const chatRouter = Router()
chatRouter.get ('/token',protectRoute, getStreamToken)
export default chatRouter
