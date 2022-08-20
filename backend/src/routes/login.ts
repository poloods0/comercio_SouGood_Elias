import { Router, Response, Request } from 'express';

const LoginController = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  const { message, user } = await LoginController.loginUser(req.body);
  if (user == null || user == undefined) return res.status(400).json({ error: message });

  const token = LoginController.generateToken(user)!;

  return res.status(200).json({token, role: user.role, message});
});

module.exports = loginRouter;
