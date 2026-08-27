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

export async function DeleteUser(req, res) {
  try {
    await userService.DeleteUser(req.params.id);

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
