import prisma from "../prisma/prismaClient.js";

export async function CreateOrder({
  categoria,
  marca,
  modelo,
  problemainformado,
  observacoes,
  nomecliente,
  status,
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
      status,
      usuario: {
        connect: {
          id: userId
        },
      },
    },
  });
  return Pedidos
}

export async function UpdateOrder(id) {
  const status = {
    EM_ANALISE_TECNICA: "VALIDADO",
    VALIDADO: "EM_REPARO",
    EM_REPARO: "AGUARDANDO_PAGAMENTO",
    AGUARDANDO_PAGAMENTO: "PAGO",
    PAGO: "FINALIZADO",
  };

  const Pedidos = await prisma.Pedidos.findUnique({
    where: {
      id,
    },
  });

  if(!Pedidos){
    throw new Error("Pedido não encontrado")
  }
  const novostatus = status[Pedidos.status];

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

export async function DeleteOrder(id) {
  const Pedidos = await prisma.Pedidos.delete({
    where: {
      id,
    },
  });
}

export async function Getorders() {
  const pedidos = await prisma.Pedidos.findMany();
  return pedidos
}
