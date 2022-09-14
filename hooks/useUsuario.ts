import axios from "axios";
import { IUsuario } from "../interfaces/usuario";

export const crearUsuario = async (usuario: IUsuario) => {
  delete usuario?.confirmPassword;
  const { data } = await axios.post(`http://localhost:3000/usuarios`, usuario, {
    withCredentials: true,
  });
  return data;
};

// export function useMutateCliente() {
//   const mutation: UseMutationResult<IUsuario, Error, IUsuario> = useMutation(
//     crearUsuario,
//     {
//       onSuccess: (data) => {
//         console.log("crearCliente mutation success", data);
//       },
//       onError: (error) => {
//         console.log("crearCliente mutation error", error);
//       },
//     }
//   );

//   return mutation;
// }
