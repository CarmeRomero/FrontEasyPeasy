import { useArticulos } from "../../hooks/useArticulos";
import { ModificarArticulosMozo } from "./ModificarArticulosMozo";
import { useEffect, useState } from "react";

interface Props {
  idPedido: number;
}

export const Padre = ({ idPedido }: Props) => {
  const [articulosHard, setArticulosHard] = useState([]);

  const { data, isLoading } = useArticulos();

  useEffect(() => {
    setArticulosHard(data);
  }, [data]);

  return (
    <>
      {isLoading && (
        <ModificarArticulosMozo idPedido={idPedido} art={articulosHard} />
      )}
    </>
  );
};
