import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { IArticulo } from "../interfaces/articulo";

export const crearArticulo = async (articulo: IArticulo) => {
  const { data } = await axios.post(
    `http://localhost:3000/articulos`,
    articulo,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateArticulo() {
  const mutation: UseMutationResult<IArticulo, Error, IArticulo> = useMutation(
    crearArticulo,
    {
      onSuccess: (data) => {
        console.log("crearArticulo mutation success", data);
      },
      onError: (error) => {
        console.log("crearArticulo mutation error", error);
      },
    }
  );
  return mutation;
}

// OBTENER
export const obtenerArticulos = async () => {
  const { data } = await axios.get(`http://localhost:3000/articulos`, {
    withCredentials: true,
  });
  return data;
};

export function useArticulos(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["articulos"], () => obtenerArticulos(), {
    staleTime: Infinity,
  });
}
