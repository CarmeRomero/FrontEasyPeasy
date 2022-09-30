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
//ELIMINAR ARTICULO
export const anularArticulo = async (id: number) => {
  const { data } = await axios.put(
    `http://localhost:3000/articulos/anular/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateAnularArticulo() {
  const mutation: UseMutationResult<null, Error, number> = useMutation(
    anularArticulo,
    {
      onSuccess: (data) => {
        console.log("Artículo anulado", data);
      },
      onError: (error) => {
        console.log("no se pudo anular el artículo", error);
      },
    }
  );
  return mutation;
}
