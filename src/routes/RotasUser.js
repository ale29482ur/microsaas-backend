import { Router } from "express";
import { CreateUser, DeleteUser, Getuser, LoginUser} from "../controller/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";



const router = Router();
 
router.post("/", CreateUser)
router.post("/login", LoginUser)
router.delete("/:id", DeleteUser)
router.get("/getuser", authMiddleware, Getuser)

export default router