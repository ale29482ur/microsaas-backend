import prisma from "../prisma/prismaClient.js";
import * as pedidosService from "../services/PedidosService.js";

export async function CreateOrder(req, res) {
  try {
    const pedido = await pedidosService.CreateOrder(
      {
        ...req.body,
        userId: req.user.id
      }
    );
    return res.status(201).json(pedido);
  } catch(error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function UpdateOrder(req, res) {
  try {
    await pedidosService.UpdateOrder(req.params.id);
    return res.status(201).json({
      message: "Pedido atualizado com sucesso",
    });
  } catch(error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function DeleteOrder(req, res) {
  try {
    await pedidosService.DeleteOrder(req.params.id);
    return res.status(201).json({
      message: "Pedido deletado com sucesso !",
    });
  } catch(error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function Getorders(req, res) {
  try {
    const pedidos = await pedidosService.Getorders(req.body);
    return res.status(201).json(pedidos);
  } catch(error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
