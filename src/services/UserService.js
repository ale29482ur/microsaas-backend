import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../Errors/AppError.js";

export async function CreateUser({ nome, telefone, cargo, email, senha }) {

  const emailNormalizado = email.trim().toLowerCase();

  const emailexistente = await prisma.Users.findUnique({
    where: {
      email
    }
  })

  if(emailexistente){
    throw new AppError("Email já cadastrado.", 409)
  }

  const TelefoneExistente = await prisma.Users.findUnique({
    where: {
      telefone
    }
  })

  if(TelefoneExistente){
    throw new AppError("Telefone já cadastrado.", 409)
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const user = await prisma.Users.create({
    data: {
      nome,
      telefone,
      cargo,
      email: emailNormalizado,
      senha: senhaHash,
    },
    select: {
      id: true,
      nome: true,
      telefone: true,
      cargo: true,
      email: true,
      createdat: true
    }
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
    throw new AppError("Email ou senha não encontrados", 401);
  }
  const verificar_senha = await bcrypt.compare(senha, find.senha);
  if (!verificar_senha) {
    throw new AppError("Email ou senha não encontrados", 401);
  }

  const token = jwt.sign(
    {id: find.id},
    process.env.JWT_SECRET,
    {expiresIn: "5H"}
  )
  return token
}

export async function DeleteUser(userId) {

  const verify = await prisma.Users.findUnique({
    where: {
      id: userId
    }
  })

  if(!verify){
    throw new AppError("Usuário não encontrado", 404)
  }

  await prisma.Users.delete({
    where: {
      id: userId
    }
  });
}

export async function MudarSenha(senha, novaSenha, userId){
  const user = await prisma.Users.findUnique({
    where: {
      id: userId
    }
  })
  if(!user){
    throw new AppError("Usuário não encontrado", 404)
  }

  const compararSenha = await bcrypt.compare(
    senha,
    user.senha
  )

  if(!compararSenha){
    throw new AppError("Senha atual incorreta", 401)
  }

  const novasenhaHash = await bcrypt.hash(
    novaSenha,
    10
  )
  await prisma.Users.update({
    where: {
      id: userId,
    },
    data: {
      senha: novasenhaHash
    }
  })
}

export async function mudarEmail(novoEmail, senha, userId){
  const users = await prisma.Users.findUnique({
    where: {
      id: userId
    }
  })
  if(!users){
    throw new AppError("Usuário não encontrado", 404)
  }

  const compararsenha = await bcrypt.compare(
    senha,
    users.senha
  )

  if(!compararsenha){
    throw new AppError("Senha incorreta", 401)
  } 

  const findemail = await prisma.Users.findUnique({
    where: {
      email: novoEmail
    }
  })

  if(findemail){
    throw new AppError("Email já cadastrado", 409)
  }

  
  await prisma.Users.update({
    where: {
      id: userId
    },
    data: {
      email: novoEmail
    }
  })
}

export async function mudarInfos(userId, Novonome, Novotelefone, Novocargo){

  const verify = await prisma.Users.findUnique({
    where: {
      id: userId
    }
  })

  if(!verify){
    throw new AppError("Usuário não encontrado", 404)
  }

  await prisma.Users.update({
    where: {
      id: userId
    },
    data: {
      nome: Novonome,
      telefone: Novotelefone,
      cargo: Novocargo
    }
  })
}

export async function getUserById(userId) {
  const users = await prisma.Users.findUnique({
    where:{
      id: userId
    },
     select: {
      id: true,
      nome: true,
      telefone: true,
      cargo: true,
      email: true,
      createdat: true,
      pedidos: true
    }
  })
  
  return users
}

