import { showNotification } from "@mantine/notifications";
import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { IModificarPedido } from "../interfaces/modificar-pedido";
import { IPedidoDelTicket } from "../interfaces/pedidoDelTicket";
import { IPedido } from "../interfaces/registrarPedido";

const crearPedido = async (pedido: IPedido) => {
  console.log(pedido);
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
        showNotification({
          // icon:<CircleCheck />,
          title: "Éxito!",
          message: "El pedido se creó correctamente!👌",
          color: "green",
          autoClose: 6000,
        });
        console.log("crearPedido mutation success", data);
      },
      onError: (error) => {
        showNotification({
          title: "Error!",
          message: "Se produjo un error al intentar crear el pedido",
          color: "red",
          autoClose: 6000,
        });
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

export function usePedido(id: number): UseQueryResult<IPedido, Error> {
  return useQuery<IPedido, Error>(["pedidos", id], () => obtenerUnPedido(id), {
    staleTime: Infinity,
  });
}

//Pedido por mesa
export const obtenerPedidoDeUnaMesa = async (id: number) => {
  const { data } = await axios.get(
    `http://localhost:3000/pedidos/pedido-mesa/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function usePedidoMesa(id: number): UseQueryResult<any, Error> {
  return useQuery<any, Error>(
    ["pedidosMesa", id],
    () => obtenerPedidoDeUnaMesa(id),
    {
      staleTime: Infinity,
    }
  );
}

/// MODIFICAR PEDIDO
// const modificarPedido = async (pedido: IModificarPedido) => {
//   const { data } = await axios.put(`http://localhost:3000/pedidos`, pedido, {
//     withCredentials: true,
//   });
//   return data;
// };

// export function useMutateModificarPedido() {
//   const mutation: UseMutationResult<IModificarPedido, Error, IModificarPedido> =
//     useMutation(modificarPedido, {
//       onSuccess: (data) => {
//         console.log("modificarPedido mutation success", data);
//       },
//       onError: (error) => {
//         console.log("modificarPedido mutation error", error);
//       },
//     });

//   return mutation;
// }

//SIN MUTATE
export const actualizarPedido = async (
  id: number,
  pedido: IModificarPedido
) => {
  const { data } = await axios.put(
    `http://localhost:3000/pedidos/${id}`,
    pedido,
    {
      withCredentials: true,
    }
  );
  showNotification({
    title: "Éxito!",
    message: "Los cambios fueron guardados correctamente!👌",
    color: "green",
    autoClose: 6000,
  });

  return data;
};

//ELIMINAR PEDIDO (CAMBIO DE ESTADO A ELIMINADO)
export const anularPedido = async (id: number) => {
  const { data } = await axios.put(
    `http://localhost:3000/pedidos/anular/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateAnularPedido() {
  const mutation: UseMutationResult<null, Error, number> = useMutation(
    anularPedido,
    {
      onSuccess: (data) => {
        console.log("Pedido anulado", data);
      },
      onError: (error) => {
        console.log("no se pudo anular el pedido", error);
      },
    }
  );
  return mutation;
}
