import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
  
    if(!authHeader || !authHeader.startsWith("Bearer")){
      return res.status(401).json({message: "Autenticação necessária"})
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verify;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token expirado ou inválido" });
  }
}
