"use client";

import { CounterDisplay } from "@/components/CounterDisplay";
import { SushiControls } from "@/components/SushiControls";
import { SushiStats } from "@/components/SushiStats";
import { TouchArea } from "@/components/TouchArea";
import { useSushiCounter } from "@/hooks/useSushiCounter";

export default function HomePage() {
  const {
    sushiCount,
    bestRecord,
    lastSushiTime,
    history,
    phrase,
    hasNewRecord,
    showPopAnimation,
    floatingSushiId,
    handleAddSushi,
    handleRemoveSushi,
    handleReset,
    clearHistory
  } = useSushiCounter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ffe4dc] via-[#fff4ee] to-[#fffdfb] p-4 sm:p-8">
      <div className="mx-auto grid w-full max-w-3xl gap-5">
        <CounterDisplay
          sushiCount={sushiCount}
          showPopAnimation={showPopAnimation}
          floatingSushiId={floatingSushiId}
        />

        <TouchArea onAdd={() => handleAddSushi(1)} />

        <SushiControls onAdd={handleAddSushi} onRemove={handleRemoveSushi} onReset={handleReset} />

        <SushiStats
          sushiCount={sushiCount}
          bestRecord={bestRecord}
          phrase={phrase}
          hasNewRecord={hasNewRecord}
          lastSushiTime={lastSushiTime}
          history={history}
          onClearHistory={clearHistory}
        />
      </div>
    </main>
  );
}
