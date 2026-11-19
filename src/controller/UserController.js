import * as userService from "../services/UserService.js";

export async function CreateUser(req, res) {
  try {
    const user = await userService.CreateUser(req.body);

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function LoginUser(req, res) {
  try {
    const token = await userService.LoginUser(req.body);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function mudarInfos(req, res){
  try{
    await userService.mudarInfos(
      req.user.id,
      req.body.Novonome,
      req.body.Novotelefone,
      req.body.Novocargo
    )
    return res.status(201).json({message:"Informações alteradas com sucesso"})
  } catch(error){
    return res.status(500).json({message: "Erro ao mudar informações"})
  }
} 

export async function MudarSenha(req, res) {
  try{
    await userService.MudarSenha(
      req.body.senha,
      req.body.novaSenha,
      req.user.id
    )
    return res.status(201).json({message:"Senha alterada com sucesso"})
  } catch (error) {
    return res.status(500).json({message: "Erro na mudança de senha."})
  }
}

  export async function mudarEmail(req, res){
    try{
      await userService.mudarEmail(
        req.body.novoemail,
        req.body.senha,
        req.user.id
      )
      return res.status(201).json({message:"Email alterado com sucesso !"})
    } catch (error){
    return res.status(500).json({message: "Erro ao alterar o email !"})
  }
}
 
export async function DeleteUser(req, res) {
  try {
    await userService.DeleteUser(req.user.id);

    return res.status(200).json({
      message: "Usuário deletado",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function Getuser(req, res) {
  try {
    const users = await userService.getUserById(req.user.id);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Erro na requisição" });
  }
}
