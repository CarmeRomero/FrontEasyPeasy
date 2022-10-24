import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { IFormaPago } from "../interfaces/registrar-forma-pago";

export const crearFormaPago = async (formaPago: IFormaPago) => {
  const { data } = await axios.post(
    `http://localhost:3000/formas-pago`,
    formaPago,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateFormaPago() {
  const mutation: UseMutationResult<IFormaPago, Error, IFormaPago> =
    useMutation(crearFormaPago, {
      onSuccess: (data) => {
        console.log("crearFormaPago mutation success", data);
      },
      onError: (error) => {
        console.log("crearFormaPago mutation error", error);
      },
    });
  return mutation;
}

export const obtenerFormaPago = async () => {
  const { data } = await axios.get(`http://localhost:3000/formas-pago`, {
    withCredentials: true,
  });
  return data;
};

export function useFormasPago(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["forma-pago"], () => obtenerFormaPago(), {
    staleTime: Infinity,
  });
}

export const anularFormaPago = async (id: number) => {
  const { data } = await axios.put(
    `http://localhost:3000/pedidos/anular/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateAnularFormaPago() {
  const mutation: UseMutationResult<null, Error, number> = useMutation(
    anularFormaPago,
    {
      onSuccess: (data) => {
        console.log("Forma de pago anulada", data);
      },
      onError: (error) => {
        console.log("no se pudo anular la forma de pago", error);
      },
    }
  );
  return mutation;
}
