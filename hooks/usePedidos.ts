import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { Id } from "tabler-icons-react";
import { IPedido } from "../interfaces/registrarPedido";

const crearPedido = async (pedido: IPedido) => {
  const { data } = await axios.post(`http://localhost:3000/pedidos`, pedido, {
    withCredentials: true,
  });
  return data;
};

export function useMutateCrearPedido() {
  const mutation: UseMutationResult<IPedido, Error, IPedido> = useMutation(
    crearPedido,
    {
      onSuccess: (data) => {
        console.log("crearPedido mutation success", data);
      },
      onError: (error) => {
        console.log("crearPedido mutation error", error);
      },
    }
  );

  return mutation;
}
//TRAE LOS PEDIDOS QUE PERTENECEN A UN USUARIO
export const obtenerPedidosUnUsuario = async () => {
  const { data } = await axios.get(`http://localhost:3000/pedidos`, {
    withCredentials: true,
  });
  return data;
};

export function usePedidosDelUsuario(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["pedidos"], () => obtenerPedidosUnUsuario(), {
    staleTime: Infinity,
  });
}
// TRAE UN PEDIDO POR EL ID
export const obtenerUnPedido = async (id: number) => {
  const { data } = await axios.get(`http://localhost:3000/pedidos/${id}`, {
    withCredentials: true,
  });
  return data;
};

export function usePedido(id: number): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["pedidos", id], () => obtenerUnPedido(id), {
    staleTime: Infinity,
  });
}
