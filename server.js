import express from "express";
import cors from "cors";
import RotasPedidos from "./src/routes/RotasPedidos.js";
import RotasUser from "./src/routes/RotasUser.js";
import { ErrorHandler } from "./src/middlewares/ErrorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", RotasUser);
app.use("/pedidos", RotasPedidos);

app.use(ErrorHandler);

app.listen(3030, () => {
  console.log("Servidor rodando na porta 3030");
});