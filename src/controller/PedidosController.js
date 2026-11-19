import prisma from "../prisma/prismaClient.js";
import * as pedidosService from "../services/PedidosService.js";

export async function CreateOrder(req, res) {
  try {
    const pedido = await pedidosService.CreateOrder({  
      
      categoria: req.body.categoria,
      nomecliente: req.body.nomecliente,
      marca: req.body.marca,
      modelo: req.body.modelo,
      problemainformado: req.body.problemainformado,
      observacoes: req.body.observacoes,
      userId: req.user.id,});

    return res.status(201).json(pedido);
  } catch(error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function UpdateOrder(req, res) {
  try {
    const update = await pedidosService.UpdateOrder(req.params.id, req.user.id);
    return res.status(200).json(update)
  } catch(error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function DeleteOrder(req, res) {
  try {
    await pedidosService.DeleteOrder(req.params.id, req.user.id);
    return res.status(200).json({
      message: "Pedido deletado com sucesso !",
    });
  } catch(error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export async function CancelOrder(req, res){
  try{
    await pedidosService.CancelOrder(req.params.id, req.params.id)
    return res.status(200).json({
      message:"Pedido cancelado com sucesso !"
    })
  } catch(error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export async function Getorders(req, res) {
  try {
    const pedidos = await pedidosService.Getorders(req.user.id);
    return res.status(200).json(pedidos);
  } catch(error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function EditOrder(req, res) {
  try {
    const pedidos = await pedidosService.EditOrder(req.params.id, req.user.id, req.body)
    return res.status(200).json("Pedido editado com sucesso !")
  } catch(error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
