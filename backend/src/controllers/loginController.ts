import { User } from '../schemas/User';
import { LoginResponse, UserData } from '../types/login';
import { LoginBody } from '../types/auth';

const jwt = require('jsonwebtoken')

const loginResponse = (message: string, user?: UserData): LoginResponse => {
  return { message, user };
}

const loginUser = async (request: LoginBody): Promise<LoginResponse> => {
  let message = "success";

  // Validacion de la existencia del usuario
  const user = await User.findOne({ email: request.email });
  if (!user) return loginResponse("Usuario no encontrado.");

  // Validacion de la contrasena
  const passwordIsCorrect = await user.validatePassword(request.password);
  if (!passwordIsCorrect) return loginResponse("Contraseña inválida.");

  const userData: UserData = {
    email: user.email,
    role: user.role,
  };

  return loginResponse(message, userData);
};

const generateToken = (user: UserData): string => {
  const token: string = jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    process.env.TOKEN
  );

  return token;

};

module.exports = {
  loginUser,
  generateToken,
}


