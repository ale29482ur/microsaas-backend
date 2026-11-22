import { Router } from "express";
import { CreateUser, DeleteUser, Getuser, LoginUser, mudarEmail, mudarInfos, MudarSenha} from "../controller/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/Validate.js";
import { CreateUserSchema } from "../../schemas/CreateUser.js";
import { LoginUserSchema } from "../../schemas/LoginUser.js";
import { ChangePasswordSchema } from "../../schemas/ChangePassword.js";
import { ChangeEmailSchema } from "../../schemas/ChangeEmail.js";


const router = Router();
 
router.post("/",validate(CreateUserSchema), CreateUser)
router.post("/login", validate(LoginUserSchema), LoginUser)
router.post("/mudarsenha", validate(ChangePasswordSchema), authMiddleware, MudarSenha)
router.post("/mudaremail", validate(ChangeEmailSchema), authMiddleware, mudarEmail)
router.post("/mudarinfos", authMiddleware, mudarInfos)
router.delete("/deletaruser", authMiddleware, DeleteUser)
router.get("/getuser", authMiddleware, Getuser)

export default router