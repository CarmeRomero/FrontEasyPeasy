import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { IActualizarRol } from "../interfaces/actualizar-rol";
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

export const anularUsuario = async (id: number) => {
  const { data } = await axios.put(
    `http://localhost:3000/usuarios/anular/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateAnularUsuario() {
  const mutation: UseMutationResult<null, Error, number> = useMutation(
    anularUsuario,
    {
      onSuccess: (data) => {
        console.log("usuario anulado", data);
      },
      onError: (error) => {
        console.log("no se pudo anular el usuario", error);
      },
    }
  );

  return mutation;
}

export const obtenerUsuarios = async () => {
  const { data } = await axios.get(`http://localhost:3000/usuarios`, {
    withCredentials: true,
  });
  return data;
};

export function useUsuarios(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["usuarios"], () => obtenerUsuarios(), {
    staleTime: Infinity,
  });
}
export const obtenerRoles = async () => {
  const { data } = await axios.get(`http://localhost:3000/usuarios/roles`, {
    withCredentials: true,
  });
  return data;
};

export function useRoles(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["roles"], () => obtenerRoles(), {
    staleTime: Infinity,
  });
}
export const actualizarRol = async ({ id, rol }: IActualizarRol) => {
  const { data } = await axios.put(
    `http://localhost:3000/usuarios/rol?id=${id}&rol=${rol}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateActualizarRol() {
  const mutation: UseMutationResult<null, Error, IActualizarRol> = useMutation(
    actualizarRol,
    {
      onSuccess: (data) => {
        console.log("Rol actualizado", data);
      },
      onError: (error) => {
        console.log("no se pudo actualizar", error);
      },
    }
  );

  return mutation;
}
