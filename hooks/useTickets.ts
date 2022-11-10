import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { Id } from "tabler-icons-react";
import { ICobro } from "../interfaces/cobro";
// import { IActualizarFormaPago } from "../interfaces/cobro";

import { IFormaPago } from "../interfaces/registrar-forma-pago";
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
        console.log("crearTicket mutation success", data);
      },
      onError: (error) => {
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
