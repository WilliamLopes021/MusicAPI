import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(404).json({ error: "Token não enviado." });
    return;
  }

  const [bearer, token] = authorization.split(" ");

  if (!token) {
    res.status(404).json({ error: "Token não identificado." });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (e) {
    const decoded = jwt.decode(token);

    if (decoded?.type) {
      res.status(500).json({ error: "Código expirado." });
    }

    res.status(500).json({ error: e });
  }
}
