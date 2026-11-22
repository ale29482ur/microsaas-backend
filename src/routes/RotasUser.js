import { Router } from "express";
import { CreateUser, DeleteUser, Getuser, LoginUser, mudarEmail, mudarInfos, MudarSenha} from "../controller/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/Validate.js";
import { CreateUserSchema } from "../../schemas/CreateUser.js";
import { LoginUserSchema } from "../../schemas/LoginUser.js";
import { ChangePassword } from "../../schemas/ChangePassword.js";




const router = Router();
 
router.post("/",validate(CreateUserSchema), CreateUser)
router.post("/login", validate(LoginUserSchema), LoginUser)
router.post("/mudarsenha", validate(ChangePassword) authMiddleware, MudarSenha)
router.post("/mudaremail", authMiddleware, mudarEmail)
router.post("/mudarinfos", authMiddleware, mudarInfos)
router.delete("/deletaruser", authMiddleware, DeleteUser)
router.get("/getuser", authMiddleware, Getuser)

export default router