import { showNotification } from "@mantine/notifications";
import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { IActualizarDatosUsuario } from "../interfaces/actualizar-datos.usuario";
import { IActualizarRol } from "../interfaces/actualizar-rol";
import { IUsuario } from "../interfaces/usuario";

//CREAR
export const crearUsuario = async (usuario: IUsuario) => {
  delete usuario?.confirmPassword;
  const { data } = await axios.post(`http://localhost:3000/usuarios`, usuario, {
    withCredentials: true,
  });
  showNotification({
    title: "Usuario creado!",
    message: "Revisá tu email para validar la cuenta!👌",
    color: "green",
    autoClose: 6000,
  });
  return data;
};

// ANULAR USUARIO
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
        showNotification({
          title: "Error!",
          message: "No pudo eliminar el usuario",
          color: "red",
          autoClose: 6000,
        });
        console.log("no se pudo anular el usuario", error);
      },
    }
  );

  return mutation;
}
// OBTENER
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

export const obtenerUnoSolo = async () => {
  const { data } = await axios.get(`http://localhost:3000/usuarios/usuario`, {
    withCredentials: true,
  });
  return data;
};

export function useUnoSolo(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["usuario"], () => obtenerUnoSolo(), {
    staleTime: Infinity,
  });
}
//MODIFICAR USUARIO
export const actualizarUsuario = async (
  actualizarDatosUsuario: IActualizarDatosUsuario
) => {
  const { data } = await axios.put(
    `http://localhost:3000/usuarios`, //URL
    actualizarDatosUsuario, // OBJETO DEL BODY
    {
      withCredentials: true, //OBJETO DE CONFIGURACiÓN
    }
  );
  return data;
};

export function useMutateActualizarUsuario() {
  const mutation: UseMutationResult<any, Error, IActualizarDatosUsuario> =
    useMutation(actualizarUsuario, {
      onSuccess: (data) => {
        showNotification({
          title: "Éxito!",
          message: "Se guardaron los datos correctamente!👌",
          color: "green",
          autoClose: 6000,
        });

        console.log("Usuario actualizado", data);
      },
      onError: (error) => {
        showNotification({
          title: "Error!",
          message: "No pudieron actualizar los datos",
          color: "red",
          autoClose: 6000,
        });
        console.log("no se pudo actualizar", error);
      },
    });

  return mutation;
}

//ROLES
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
        showNotification({
          title: "Éxito!",
          message: "Se guardaron los cambios!👌",
          color: "green",
          autoClose: 6000,
        });
        console.log("Rol actualizado", data);
      },
      onError: (error) => {
        showNotification({
          title: "Error!",
          message: "No se pudieron guardar los cambios",
          color: "red",
          autoClose: 6000,
        });
        console.log("no se pudo actualizar", error);
      },
    }
  );

  return mutation;
}
