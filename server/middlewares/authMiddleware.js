import jwt from "jsonwebtoken"

export default async(req, resp, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return resp.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return resp
      .status(401)
      .send({
        message: "Auth failed",
        success: false
      })
  }
};