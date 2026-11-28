import { AppError } from "../../Errors/AppError.js";
import prisma from "../prisma/prismaClient.js";

export async function CreateOrder({
  categoria,
  marca,
  modelo,
  problemainformado,
  observacoes,
  nomecliente,
  userId, 
}) {


  const Pedidos = await prisma.Pedidos.create({
    data: {
      categoria,
      marca,
      modelo,
      problemainformado,
      observacoes,
      nomecliente,
      usuario: {
        connect: {
          id: userId
        },
      },
    },
  });
  return Pedidos
}

export async function UpdateOrder(id, userId) {
  const status = {
    EM_ANALISE_TECNICA: "VALIDADO",
    VALIDADO: "EM_REPARO",
    EM_REPARO: "AGUARDANDO_PAGAMENTO",
    AGUARDANDO_PAGAMENTO: "PAGO",
    PAGO: "FINALIZADO",
  };

  const Pedidos = await prisma.Pedidos.findFirst({
    where: {
      id,
      userId
    },
  });

  if(!Pedidos){
    throw new AppError("Pedido não encontrado", 404)
  }
  const novostatus = status[Pedidos.status];

  if(!novostatus){
    throw new AppError("Não foi possivel avançar o status desse pedido.", 409)
  }

  const updatestatus = await prisma.Pedidos.update({
    where: {
      id,
    },
    data: {
      status: novostatus,
    },
  });
  return updatestatus
}

export async function DeleteOrder(id, userId) {
  const verify = await prisma.Pedidos.findFirst({
    where: {
      id,
      userId
    }
  })

  if(!verify){
    throw new AppError("Pedido não encontrado", 404)
  }

  const Pedidos = await prisma.Pedidos.delete({
    where: {
      id
    }
  });
}

export async function CancelOrder(id, userId){

  const verify = await prisma.Pedidos.findFirst({
    where: {
      id,
      userId
    }
  })

  if(!verify){
    throw new AppError("Pedido não encontrado", 404)
  }

  const Cancel = await prisma.Pedidos.update({
    where: {
      id
    },
    data: {
      status: "CANCELADO"
    }
  })
  return Cancel
}

export async function EditOrder(id, userId, dados){
  const verify = await prisma.Pedidos.findFirst({
    where: {
      id,
      userId
    }
  })

  if(!verify){
    throw new AppError("Pedido não encontrado", 404)
  }

  const update = await prisma.Pedidos.update({
    where: {
      id
    },
    data: {
      categoria: dados.categoria,
      nomecliente: dados.nomecliente,
      marca: dados.marca,
      modelo: dados.modelo,
      problemainformado: dados.problemainformado,
      observacoes: dados.observacoes
    }
  })
}

export async function Getorders(userId) {
  const pedidos = await prisma.Pedidos.findMany({
    where: {
      userId
    }
  });
  return pedidos
}
