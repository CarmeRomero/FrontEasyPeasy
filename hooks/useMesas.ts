import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { showNotification } from "@mantine/notifications";
import { CircleCheck } from "tabler-icons-react";

// OBTENER
export const obtenerMesas = async (): Promise<any> => {
  const { data } = await axios.get(`http://localhost:3000/mesas`, {
    withCredentials: true,
  });

  return data;
};

export function useMesas(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["mesas"], () => obtenerMesas(), {
    staleTime: Infinity,
  });
}

// TRAE UNA MESA POR EL ID
export const obtenerUnaMesa = async (id: number) => {
  const { data } = await axios.get(`http://localhost:3000/mesas/${id}`, {
    withCredentials: true,
  });
  return data;
};

export function useUnaMesa(id: number): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["pedidos", id], () => obtenerUnaMesa(id), {
    staleTime: Infinity,
  });
}

export const agregarUnaMesa = async (mesa: any) => {
  const { data } = await axios.post(`http://localhost:3000/mesas`, mesa, {
    withCredentials: true,
  });
  return data;
};

export function useMutateMesa() {
  const mutation: UseMutationResult<any, Error, any> = useMutation(
    agregarUnaMesa,
    {
      onSuccess: (data) => {
        showNotification({
          id: "exito",
          autoClose: true,
          title: "Mesa creada",
          message: "Ya se puede usar 👌",
        });
        // console.log("mesa mutation success", data);
      },
      onError: (error) => {
        showNotification({
          autoClose: true,
          color: "red",
          title: "No se pudo crear la mesa",
          message: "Se produjo un error al crear la mesa",
        });
        console.log("mesa mutation error", error);
      },
    }
  );

  return mutation;
}

export const modificarUnaMesa = async (mesaModificar: any) => {
  const { data } = await axios.put(
    `http://localhost:3000/mesas/dimension-posicion`,
    mesaModificar,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateModificarMesa() {
  const mutation: UseMutationResult<any, Error, any> = useMutation(
    modificarUnaMesa,
    {
      onSuccess: (data) => {
        showNotification({
          // icon:<CircleCheck />,
          title: "La mesa fue actualizada!",
          message: "Ya se puede usar 👌",
          color: "green",
          autoClose: 6000,
        });
        console.log("mesa mutation success", data);
      },
      onError: (error) => {
        console.log("mesa mutation error", error);
      },
    }
  );

  return mutation;
}

export const anularMesa = async (id: number) => {
  const { data } = await axios.put(`http://localhost:3000/mesas/anular/${id}`, {
    withCredentials: true,
  });
  return data;
};

export function useMutateAnularMesa() {
  const mutation: UseMutationResult<any, Error, any> = useMutation(anularMesa, {
    onSuccess: (data) => {
      showNotification({
        // icon:<CircleCheck />,
        title: "Éxito!",
        message: "La mesa fue eliminada!👌",
        color: "green",
        autoClose: 6000,
      });
      console.log("mesa mutation success", data);
    },
    onError: (error) => {
      console.log("mesa mutation error", error);
    },
  });

  return mutation;
}
