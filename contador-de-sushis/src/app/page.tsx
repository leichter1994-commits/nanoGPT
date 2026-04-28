"use client";

import { useState } from "react";
import { CounterDisplay } from "@/components/CounterDisplay";
import { ResetModal } from "@/components/ResetModal";
import { SushiControls } from "@/components/SushiControls";
import { SushiStats } from "@/components/SushiStats";
import { TouchArea } from "@/components/TouchArea";
import { useSushiCounter } from "@/hooks/useSushiCounter";

export default function HomePage() {
  const [modalReinicioAbierto, setModalReinicioAbierto] = useState(false);

  const {
    contadorSushis,
    mejorRecord,
    ultimoSushiISO,
    historialSushis,
    frase,
    rompisteRecord,
    hidratoOk,
    animarNumero,
    eventoFlotante,
    sumarSushis,
    restarSushi,
    reiniciarContador,
    borrarHistorial
  } = useSushiCounter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ffe4dc] via-[#fff5ef] to-[#fffdfb] p-4 sm:p-8">
      <div className="mx-auto grid w-full max-w-3xl gap-5">
        {!hidratoOk ? (
          <section className="rounded-[28px] bg-white/95 p-10 text-center shadow-soft">
            <p className="text-sm font-semibold text-soy/70">Cargando tu contador...</p>
          </section>
        ) : (
          <>
            <CounterDisplay
              contadorSushis={contadorSushis}
              animarNumero={animarNumero}
              eventoFlotante={eventoFlotante}
            />

            <TouchArea onSumar={() => sumarSushis(1)} />

            <SushiControls
              onSumar={sumarSushis}
              onRestar={restarSushi}
              onPedirReinicio={() => setModalReinicioAbierto(true)}
            />

            <SushiStats
              contadorSushis={contadorSushis}
              mejorRecord={mejorRecord}
              frase={frase}
              rompisteRecord={rompisteRecord}
              ultimoSushiISO={ultimoSushiISO}
              historialSushis={historialSushis}
              onBorrarHistorial={borrarHistorial}
            />
          </>
        )}
      </div>

      <ResetModal
        abierto={modalReinicioAbierto}
        onCancelar={() => setModalReinicioAbierto(false)}
        onConfirmar={() => {
          reiniciarContador();
          setModalReinicioAbierto(false);
        }}
      />
    </main>
  );
}
