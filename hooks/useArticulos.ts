import { showNotification } from "@mantine/notifications";
import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { IArticulo } from "../interfaces/articulo";
import { IPrueba } from "../interfaces/prueba";

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
        showNotification({
          // icon:<CircleCheck />,
          title: "Éxito!",
          message: "El artículo se creó correctamente!👌",
          color: "green",
          autoClose: 6000,
        });
        console.log("crearArticulo mutation success", data);
      },
      onError: (error) => {
        showNotification({
          title: "Error!",
          message: "No se pudo generar al intentar crear el artículo",
          color: "red",
          autoClose: 6000,
        });
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
//MODIFICAR ARTICULO CON  2 PARAMETROS
// export const actualizarArticulo = async ({ id, articulo }: IPrueba) => {
//   const { data } = await axios.put(
//     `http://localhost:3000/articulos/${id}`, //URL
//     // ${id}
//     articulo, // OBJETO DEL BODY
//     {
//       withCredentials: true, //OBJETO DE CONFIGURACiÓN
//     }
//   );
//   return data;
// };

// export function useMutateActualizarArticulo({ id, articulo }: IPrueba) {
//   const mutation: UseMutationResult<any, Error, any> = useMutation(
//     actualizarArticulo, id,
//     {
//       onSuccess: (data) => {
//         console.log("Artículo actualizado", data);
//       },
//       onError: (error) => {
//         console.log("no se pudo actualizar", error);
//       },
//     }
//   );

//   return mutation;
// }

//SIN MUTATE
export const actualizarArticulo = async (id: number, articulo: IArticulo) => {
  console.log(articulo, id);
  const { data } = await axios.put(
    `http://localhost:3000/articulos/${id}`,
    articulo,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const obtenerArticulosMasConsumidos = async (): Promise<any> => {
  const { data } = await axios.get(
    `http://localhost:3000/articulos/mas-consumidos`,
    {
      withCredentials: true,
    }
  );

  return data;
};

export function useArticulosMasConsumidos(): UseQueryResult<any, Error> {
  return useQuery<any, Error>(
    ["articulos"],
    () => obtenerArticulosMasConsumidos(),
    {
      staleTime: Infinity,
    }
  );
}
