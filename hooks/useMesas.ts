import axios from "axios";
import { AnyARecord } from "dns";
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
