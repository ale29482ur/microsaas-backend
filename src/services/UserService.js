import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function CreateUser({ nome, telefone, cargo, email, senha }) {

   const emailNormalizado = email.trim().toLowerCase();

  const emailexistente = await prisma.Users.findUnique({
    where: {
      email
    }
  })

  if(emailexistente){
    throw new Error("Email já cadastrado.")
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

export async function DeleteUser(userId) {

  const verify = await prisma.Users.findUnique({
    where: {
      id: userId
    }
  })

  if(!verify){
    throw new Error("Usuário não encontrado")
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
    throw new Error("Usuário não encontrado")
  }

  const compararSenha = await bcrypt.compare(
    senha,
    user.senha
  )

  if(!compararSenha){
    throw new Error("Senha atual incorreta")
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
    throw new Error("Usuário não encontrado")
  }

  const compararsenha = await bcrypt.compare(
    senha,
    users.senha
  )

  if(!compararsenha){
    throw new Error("Senha incorreta")
  } 

  const findemail = await prisma.Users.findUnique({
    where: {
      email: novoEmail
    }
  })

  if(findemail){
    throw new Error("Email incorreto")
  }

  const update = await prisma.Users.update({
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
    throw new Error("Usuário não encontrado")
  }

  const update = await prisma.Users.update({
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

export async function editarPedidos(categoria, nomecliente, marca, modelo, problemainformado, observacoes){
  
}
