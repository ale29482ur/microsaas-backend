import * as userService from "../services/UserService.js";

export async function CreateUser(req, res) {
  const user = await userService.CreateUser(req.body);
}

export async function LoginUser(req, res) {
  const token = await userService.LoginUser(req.body);
  return res.status(201).json({ token });
}

export async function mudarInfos(req, res) {
  await userService.mudarInfos(
    req.user.id,
    req.body.Novonome,
    req.body.Novotelefone,
    req.body.Novocargo,
  );
  return res.status(201).json({ message: "Informações alteradas com sucesso" });
}

export async function MudarSenha(req, res) {
  await userService.MudarSenha(req.body.senha, req.body.novaSenha, req.user.id);
  return res.status(201).json({ message: "Senha alterada com sucesso" });
}

export async function mudarEmail(req, res) {
  await userService.mudarEmail(req.body.novoemail, req.body.senha, req.user.id);
  return res.status(201).json({ message: "Email alterado com sucesso !" });
}

export async function DeleteUser(req, res) {
  await userService.DeleteUser(req.user.id);
  return res.status(200).json({
    message: "Usuário deletado",
  });
}

export async function Getuser(req, res) {
  const users = await userService.getUserById(req.user.id);
  return res.status(200).json(users);
}
