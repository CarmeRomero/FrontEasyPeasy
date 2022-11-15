import { showNotification } from "@mantine/notifications";
import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { ICobro } from "../interfaces/cobro";
import { ITicket } from "../interfaces/ticket";

export const crearTicket = async (ticket: ITicket) => {
  const { data } = await axios.post(`http://localhost:3000/tickets`, ticket, {
    withCredentials: true,
  });
  return data;
};

export function useMutateTicket() {
  const mutation: UseMutationResult<ITicket, Error, ITicket> = useMutation(
    crearTicket,
    {
      onSuccess: (data) => {
        showNotification({
          title: "Éxito!",
          message: "El ticket fue generado correctamente!👌",
          color: "green",
          autoClose: 6000,
        });
        console.log("crearTicket mutation success", data);
      },
      onError: (error) => {
        showNotification({
          title: "Error!",
          message: "No se pudo generar el ticket",
          color: "red",
          autoClose: 6000,
        });
        console.log("crearTicket mutation error", error);
      },
    }
  );
  return mutation;
}

// OBTENER
export const obtenerTickets = async () => {
  const { data } = await axios.get(
    `http://localhost:3000/tickets/listado-tickets`,
    {
      withCredentials: true,
    }
  );

  return data;
};

export function useTickets(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["ticket"], () => obtenerTickets(), {
    staleTime: Infinity,
  });
}
export const obtenerUnTicket = async (id: number) => {
  const { data } = await axios.get(`http://localhost:3000/tickets/${id}`, {
    withCredentials: true,
  });

  return data;
};

export function useUnTicket(id: number): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["ticket", id], () => obtenerUnTicket(id), {
    staleTime: Infinity,
  });
}

// actualizar
export const actualizarTicket = async (id: number, formaPago: ICobro) => {
  console.log(formaPago, id);
  const { data } = await axios.put(
    `http://localhost:3000/tickets/actualizar/${id}`,
    formaPago,
    {
      withCredentials: true,
    }
  );
  return data;
};

// REPORTES
// REPORTE 1 ADMIN: TRAER FORMAS DE PAGO MAS UTILIZADAS
export const obtenerTicketsPagados = async () => {
  const { data } = await axios.get(
    `http://localhost:3000/tickets/tickets-pagados`,
    {
      withCredentials: true,
    }
  );

  return data;
};

export function useTicketsPagados(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["ticket"], () => obtenerTicketsPagados(), {
    staleTime: Infinity,
  });
}

// export const obtenerTicketFecha = async (desde: Date, hasta: Date) => {
//   fetch(
//     `http://localhost:3000/tickets/listado-tickets/desdeHasta?desde=${desde.toJSON()}&hasta=${hasta.toJSON()}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       return data;
//     });
// };

export const obtenerTicketsDesdeHasta = async (desde: Date, hasta: Date) => {
  console.log(desde.toJSON());
  console.log(hasta.toJSON());

  const { data } = await axios.get(
    `http://localhost:3000/tickets/listado-tickets/desdeHasta?desde=${desde.toJSON()}&hasta=${hasta.toJSON()}`,

    {
      withCredentials: true,
    }
  );

  return data;
};

export function useTicketsDesdeHasta(
  desde: Date,
  hasta: Date
): UseQueryResult<any, Error> {
  return useQuery<any, Error>(
    ["ticket"],
    () => obtenerTicketsDesdeHasta(desde, hasta),
    {
      staleTime: Infinity,
    }
  );
}
