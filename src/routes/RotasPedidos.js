import { Router } from "express";
import { CreateOrder, DeleteOrder, Getorders, UpdateOrder, CancelOrder, EditOrder } from "../controller/PedidosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";



const router = Router();

router.post("/criarpedido", authMiddleware, CreateOrder)
router.delete("/deletarpedido/:id", authMiddleware, DeleteOrder)
router.patch("/cancelarpedido/:id", authMiddleware, CancelOrder)
router.patch("/atualizarstatus/:id", authMiddleware, UpdateOrder)
router.get("/getpedidos", authMiddleware, Getorders)
router.patch("/editarpedidos/:id", authMiddleware, EditOrder)

export default router