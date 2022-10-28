import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";

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
        console.log("mesa mutation success", data);
      },
      onError: (error) => {
        console.log("mesa mutation error", error);
      },
    }
  );

  return mutation;
}
