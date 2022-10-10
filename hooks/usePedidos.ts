import axios from "axios";
import { useMutation, UseMutationResult } from "react-query";
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
