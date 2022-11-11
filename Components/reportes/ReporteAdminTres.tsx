import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useFormasPago } from "../../hooks/useFormasPago";
import { prepareServerlessUrl } from "next/dist/server/base-server";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      // data: labelsDatos.map(() => 5),
      data: labels.map(() => 5),
      // data: [1, 2, 3, 4, 5, 6, 7],

      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => 5),
      // data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function ReporteAdminTres() {
  const { data: DataFormasPago } = useFormasPago();
  const [formasPago, setFormasPago] = useState([]);

  const labelsDatos = DataFormasPago
    ? DataFormasPago?.map(({ descripcion }: any) => ({
        label: descripcion,
      }))
    : [];

  useEffect(() => {
    setFormasPago([]);
    labelsDatos.map((item: any) => {
      console.log(formasPago);
      const formPagoOb = { descripcion: "" };
      // const nuevoArreglo: any = [...formasPago, item.label];
      // setFormasPago(nuevoArreglo);
      setFormasPago((prev) => ({
        ...prev,
        descripcion: [...formasPago, item.label],
      }));
    });
  }, []);

  console.log(formasPago);

  return (
    <Bar
      style={{
        maxWidth: "800px",
        maxHeight: "800px",
        justifyContent: "center",
        alignContent: "center",
        marginLeft: "100px",
      }}
      options={options}
      data={data}
    />
  );
}
