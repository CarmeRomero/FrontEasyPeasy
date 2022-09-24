import axios from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { IArticulo } from "../interfaces/articulo";

export const crearArticulo = async (articulo: IArticulo) => {
    
    const { data } = await axios.post(`http://localhost:3000/articulos`, articulo, {
      withCredentials: true,
    });
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
    
  )
  return mutation;
};