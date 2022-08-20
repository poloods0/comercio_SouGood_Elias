import mongoose from 'mongoose';
import { User } from '../schemas/User';
import { UserPostRequest } from '../types/user';

const createUser = async (request: UserPostRequest) => {
  /*
  Crea un usuario a partir de los datos obtenidos del body en formato json.
  El request sigue la estructura de UserRequest.post.
  */
  try {
    const user = new User(request);
    await user.save();
    return user;
  } catch (err: any) {
   if (err.code === 11000) throw new Error("El usuario ya existe.");
   if (err == mongoose.Error.ValidationError) throw new Error("Datos de usuario inválidos.");
   throw err;
  }
};

const removeUsers = async () => {
  try {
    await User.deleteMany({});
    return "sucess";
  } catch (err: any) {
    throw err;
  }
};

module.exports = {
  createUser,
  removeUsers,
};
