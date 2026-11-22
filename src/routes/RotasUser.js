import { Router } from "express";
import { CreateUser, DeleteUser, Getuser, LoginUser, mudarEmail, mudarInfos, MudarSenha} from "../controller/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/Validate.js";
import { CreateUserSchema } from "../../schemas/Users/CreateUser.js";
import { LoginUserSchema } from "../../schemas/Users/LoginUser.js";
import { ChangePasswordSchema } from "../../schemas/Users/ChangePassword.js";
import { ChangeEmailSchema } from "../../schemas/Users/ChangeEmail.js";
import { ChangeInfosSchema } from "../../schemas/Users/ChangeInfos.js";


const router = Router();
 
router.post("/",validate(CreateUserSchema), CreateUser)
router.post("/login", validate(LoginUserSchema), LoginUser)
router.post("/mudarsenha", validate(ChangePasswordSchema), authMiddleware, MudarSenha)
router.post("/mudaremail", validate(ChangeEmailSchema), authMiddleware, mudarEmail)
router.post("/mudarinfos", validate(ChangeInfosSchema), authMiddleware, mudarInfos)
router.delete("/deletaruser", authMiddleware, DeleteUser)
router.get("/getuser", authMiddleware, Getuser)

export default router