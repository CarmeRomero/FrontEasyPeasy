import { IArticulo } from "./articulo";

export interface IPrueba {
  id: number;
  articulo: IArticulo;
}

// const [pruebita, setPruebita] = useState();
// if(pruebita != undefined)
// const { mutate, error, isLoading } = useMutateActualizarArticulo(pruebita);

// const handleSubmit = (values: any) => {
//     const prueba: IPrueba = {
//       id: id,
//       articulo: {
//         codigo: values.codigo,
//         id_categoria: parseInt(values.id_categoria),
//         descripcion: values.descripcion,
//         precio_venta: values.precio_venta,
//         estado_alta: values.estado_alta,
//       },
//     };
//     if(prueba== null){
//       setPruebita(prueba);
//     }
//     mutate(pruebita, {
//       onSuccess: () => {
//         refetch();
//       },
//     });
//   }
