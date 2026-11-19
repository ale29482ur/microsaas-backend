import { Router } from "express";
import { CreateUser, DeleteUser, Getuser, LoginUser, mudarEmail, mudarInfos, MudarSenha} from "../controller/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";




const router = Router();
 
router.post("/", CreateUser)
router.post("/login", LoginUser)
router.post("/mudarsenha", authMiddleware, MudarSenha)
router.post("/mudaremail", authMiddleware, mudarEmail)
router.post("/mudarinfos", authMiddleware, mudarInfos)
router.delete("/deletaruser", authMiddleware, DeleteUser)
router.get("/getuser", authMiddleware, Getuser)

export default router