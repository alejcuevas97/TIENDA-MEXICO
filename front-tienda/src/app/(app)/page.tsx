"use client";

import React from "react";

type FilaVenta = {
  mes: string;
  ventas: number;
  variacionPorcentaje: number;
  tendencia: "sube" | "baja" | "igual";
  escala: number;
};

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Datos de ejemplo frontend; luego backend puede enviarlos.
const VENTAS_MENSUALES = [
  12000, 13500, 11000, 14500, 15000, 14200, 16000, 15800, 17000, 16500, 18000,
  19000,
];

function construirFilas(ventas: number[]): FilaVenta[] {
  return MESES.map((mes, index) => {
    const actual = ventas[index] ?? 0;
    const anterior = index > 0 ? ventas[index - 1] : actual;
    const diferencia = actual - anterior;

    const variacionPorcentaje =
      index === 0 || anterior === 0 ? 0 : (diferencia / anterior) * 100;

    const tendencia: FilaVenta["tendencia"] =
      diferencia > 0 ? "sube" : diferencia < 0 ? "baja" : "igual";

    // Escala visual 0-100 basada en magnitud de variación
    const escala = Math.min(Math.abs(variacionPorcentaje), 100);

    return {
      mes,
      ventas: actual,
      variacionPorcentaje,
      tendencia,
      escala,
    };
  });
}

export default function Home() {
  const anioActual = new Date().getFullYear();
  const filas = construirFilas(VENTAS_MENSUALES);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <section className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Escala de Ventas - {anioActual}
          </h1>
          <p className="text-slate-600 mt-1">Tabla del mes.</p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="px-4 py-3 text-left">Mes</th>
                <th className="px-4 py-3 text-right">Ventas</th>
                <th className="px-4 py-3 text-right">Variacion</th>
                <th className="px-4 py-3 text-left">Tendencia</th>
                <th className="px-4 py-3 text-left">Escala</th>
              </tr>
            </thead>

            <tbody>
              {filas.map((fila) => {
                const color =
                  fila.tendencia === "sube"
                    ? "bg-emerald-500"
                    : fila.tendencia === "baja"
                      ? "bg-rose-500"
                      : "bg-slate-400";

                const textoTendencia =
                  fila.tendencia === "sube"
                    ? "Sube"
                    : fila.tendencia === "baja"
                      ? "Baja"
                      : "Sin cambio";

                return (
                  <tr key={fila.mes} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {fila.mes}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      ${fila.ventas.toLocaleString("es-MX")}
                    </td>
                    <td
                      className={
                        "px-4 py-3 text-right font-semibold " +
                        (fila.variacionPorcentaje > 0
                          ? "text-emerald-700"
                          : fila.variacionPorcentaje < 0
                            ? "text-rose-700"
                            : "text-slate-600")
                      }
                    >
                      {fila.variacionPorcentaje > 0 ? "+" : ""}
                      {fila.variacionPorcentaje.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {textoTendencia}
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-3 w-full rounded-full bg-slate-200">
                        <div
                          className={"h-3 rounded-full transition-all " + color}
                          style={{ width: `${fila.escala}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
