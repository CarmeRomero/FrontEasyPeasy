import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { ITicket } from "../interfaces/ticket";

export const crearTicket = async (ticket: ITicket) => {
  const { data } = await axios.post(`http://localhost:3000/ticket`, ticket, {
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
  const { data } = await axios.get(`http://localhost:3000/ticket`, {
    withCredentials: true,
  });

  return data;
};

export function useTickets(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["ticket"], () => obtenerTickets(), {
    staleTime: Infinity,
  });
}
