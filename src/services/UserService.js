import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function CreateUser({ nome, telefone, email, senha }) {
  const senhaHash = await bcrypt.hash(senha, 10);

  const user = await prisma.Users.create({
    data: {
      nome,
      telefone,
      email,
      senha: senhaHash,
    },
  });

  return user;
}

export async function LoginUser({email, senha}) {
  //prisma procura um objeto que contenha esse email, e guarda ele inteiro na variavel find
  const find = await prisma.Users.findUnique({
    where: {
      email,
    },
  });
  if (!find) {
    throw new Error("Email ou senha não encontrados");
  }
  const verificar_senha = await bcrypt.compare(senha, find.senha);
  if (!verificar_senha) {
    throw new Error("Email ou senha não encontrados");
  }

  const token = jwt.sign(
    {id: find.id},
    process.env.JWT_SECRET,
    {expiresIn: "5H"}
  )
  return token
}

export async function DeleteUser(id) {
  await prisma.Users.delete({
    where: {
      id,
    },
  });
}

export async function getUserById(userId) {
  const users = await prisma.Users.findUnique({
    where:{
      id: userId
    },
    include: {
      pedidos: true
    }
  })
  
  return users
}
