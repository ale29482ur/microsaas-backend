import { Router } from "express";
import { CreateOrder, DeleteOrder, Getorders, UpdateOrder, CancelOrder, EditOrder } from "../controller/PedidosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { CreateOrderSchema } from "../../schemas/Orders/CreateOrderSchema.js";
import { EditOrderSchema } from "../../schemas/Orders/EditOrderSchema.js";
import { validate } from "../middlewares/Validate.js";



const router = Router();

router.post("/criarpedido", validate(CreateOrderSchema), authMiddleware, CreateOrder)
router.delete("/deletarpedido/:id", authMiddleware, DeleteOrder)
router.patch("/cancelarpedido/:id", authMiddleware, CancelOrder)
router.patch("/atualizarstatus/:id", authMiddleware, UpdateOrder)
router.get("/getpedidos", authMiddleware, Getorders)
router.patch("/editarpedidos/:id", validate(EditOrderSchema), authMiddleware, EditOrder)

export default router