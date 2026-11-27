import prisma from "../prisma/prismaClient.js";
import * as pedidosService from "../services/PedidosService.js";

export async function CreateOrder(req, res) {
  const pedido = await pedidosService.CreateOrder({
    categoria: req.body.categoria,
    nomecliente: req.body.nomecliente,
    marca: req.body.marca,
    modelo: req.body.modelo,
    problemainformado: req.body.problemainformado,
    observacoes: req.body.observacoes,
    userId: req.user.id,
  });

  return res.status(201).json(pedido);
}

export async function UpdateOrder(req, res) {
  const update = await pedidosService.UpdateOrder(req.params.id, req.user.id);
  return res.status(200).json(update);
}

export async function DeleteOrder(req, res) {
  await pedidosService.DeleteOrder(req.params.id, req.user.id);
  return res.status(200).json({
    message: "Pedido deletado com sucesso !",
  });
}

export async function CancelOrder(req, res) {
  await pedidosService.CancelOrder(req.params.id, req.params.id);
  return res.status(200).json({
    message: "Pedido cancelado com sucesso !",
  });
}

export async function Getorders(req, res) {
  const pedidos = await pedidosService.Getorders(req.user.id);
  return res.status(200).json(pedidos);
}

export async function EditOrder(req, res) {
  const pedidos = await pedidosService.EditOrder(
    req.params.id,
    req.user.id,
    req.body,
  );
  return res.status(200).json("Pedido editado com sucesso !");
}
