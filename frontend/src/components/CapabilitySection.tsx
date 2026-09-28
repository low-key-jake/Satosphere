import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CapabilitySectionProps {
  onOpenLiveChart: () => void;
  onOpenNews: () => void;
}

export const CapabilitySection: React.FC<CapabilitySectionProps> = ({
  onOpenLiveChart,
  onOpenNews
}) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 flex flex-col justify-between min-h-[80vh]">
      {/* Top Row: Left Badge + Right Intro Copy */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        {/* Left Badge */}
        <div className="inline-flex items-center border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.15em] text-white drop-shadow-md">
          Insight On Demand
        </div>

        {/* Right Copy */}
        <p className="max-w-sm sm:text-right text-lg sm:text-xl leading-relaxed text-white drop-shadow-md font-sans">
          Our AI doesn't just respond — it interprets, sharpens, and delivers the signal you need.
        </p>
      </div>

      {/* Bottom Area: Left Copy & CTAs + Right Frosted Capability Panel */}
      <div className="mt-12 flex flex-col md:flex-row items-end justify-between gap-12 lg:gap-16">
        {/* Left Column */}
        <div className="max-w-xl">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg font-sans">
            Learn to see <br />
            brilliantly.
          </h2>

          <p className="mt-6 max-w-md text-sm sm:text-base text-white/80 drop-shadow-md leading-relaxed font-sans">
            From the first sketch to the final render, Satosphere turns raw intent into decisions your team can act on — quietly, precisely, at speed.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenLiveChart}
              className="rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black hover:bg-white/85 flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
            >
              <span>Run the demo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenNews}
              className="rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
            >
              Free consultation
            </button>
          </div>
        </div>

        {/* Right — Frosted Capability Panel */}
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 sm:px-6 shadow-2xl">
          {/* Item 01 */}
          <div className="flex gap-5 py-5 border-b border-white/15 group cursor-pointer transition-colors">
            <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5">
              01
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-white">
                  Real-time vision
                </h3>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Reads context as it happens and surfaces what matters before you ask.
              </p>
            </div>
          </div>

          {/* Item 02 */}
          <div className="flex gap-5 py-5 border-b border-white/15 group cursor-pointer transition-colors">
            <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5">
              02
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-white">
                  Layered insight
                </h3>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Moves from rough outline to sharp output without losing the thread.
              </p>
            </div>
          </div>

          {/* Item 03 */}
          <div className="flex gap-5 py-5 group cursor-pointer transition-colors">
            <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5">
              03
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-white">
                  Adaptive speed
                </h3>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                Learns your cadence and tightens every pass as you work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
