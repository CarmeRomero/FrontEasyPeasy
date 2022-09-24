export interface IArticulo{
        codigo: string;
        id_categoria: number | null;
        descripcion:string;
        precio_venta: number | null;
        estado_alta : boolean;
}