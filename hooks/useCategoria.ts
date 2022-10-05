import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { ICategorias } from "../interfaces/categoria";

export const crearCategoria = async (categorias: ICategorias) => {
  const { data } = await axios.post(
    `http://localhost:3000/categorias`,
    categorias,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateCategoria() {
  const mutation: UseMutationResult<ICategorias, Error, ICategorias> =
    useMutation(crearCategoria, {
      onSuccess: (data) => {
        console.log("crearCategoria mutation success", data);
      },
      onError: (error) => {
        console.log("crearCategoria mutation error", error);
      },
    });
  return mutation;
}

export const obtenerCategorias = async () => {
  const { data } = await axios.get(`http://localhost:3000/categorias`, {
    withCredentials: true,
  });
  return data;
};

export function useCategorias(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["categoria"], () => obtenerCategorias(), {
    staleTime: Infinity,
  });
}

// ELIMINAR CATEGORIA
export const eliminarCategoria = async (id: number) => {
  const { data } = await axios.delete(
    `http://localhost:3000/categorias/${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateCategoriaEliminar() {
  const mutation: UseMutationResult<any, Error, number> = useMutation(
    eliminarCategoria,
    {
      onSuccess: (data) => {
        console.log("crearCategoria mutation success", data);
      },
      onError: (error) => {
        console.log("crearCategoria mutation error", error);
      },
    }
  );
  return mutation;
}
