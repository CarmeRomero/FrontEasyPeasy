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
export const obtenerArticulos = async (): Promise<any> => {
  const { data } = await axios.get(`http://localhost:3000/articulos`, {
    withCredentials: true,
  });
  const articulos = data
    ? data?.map((obj: any) => {
        return {
          value: obj.id,
          label: obj.descripcion,
        };
      })
    : [
        {
          value: "16",
          label: "sandia",
        },
      ];

  return articulos;
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

//OBTENER ARTICULO
export const obtenerUnArticulo = async (id: number) => {
  const { data } = await axios.get(`http://localhost:3000/articulos/${id}`, {
    withCredentials: true,
  });
  return data;
};

export function useUnArticulo(id: number): UseQueryResult<any, Error> {
  return useQuery<any, Error>(["articulo", id], () => obtenerUnArticulo(id), {
    staleTime: Infinity,
  });
}
//OBTENER TODOS CON LA MISMA CATEGORIA
export const obtenerArticulosMismaCategoria = async (id_categoria: number) => {
  const { data } = await axios.get(
    `http://localhost:3000/articulos/misma-categoria/${id_categoria}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useArticulosMismaCategoria(
  id_categoria: number
): UseQueryResult<any, Error> {
  return useQuery<any, Error>(
    ["articulosMismaCategoria"],
    () => obtenerArticulosMismaCategoria(id_categoria),
    {
      staleTime: Infinity,
    }
  );
}
//MODIFICAR ARTICULO
export const actualizarArticulo = async (articulo: IArticulo) => {
  const { data } = await axios.put(
    `http://localhost:3000/articulos`, //URL
    // ${id}
    articulo, // OBJETO DEL BODY
    {
      withCredentials: true, //OBJETO DE CONFIGURACiÓN
    }
  );
  return data;
};

export function useMutateActualizarArticulo() {
  const mutation: UseMutationResult<any, Error, any> = useMutation(
    actualizarArticulo,
    {
      onSuccess: (data) => {
        console.log("Artículo actualizado", data);
      },
      onError: (error) => {
        console.log("no se pudo actualizar", error);
      },
    }
  );

  return mutation;
}
