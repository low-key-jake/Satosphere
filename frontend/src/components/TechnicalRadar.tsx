import React from 'react';
import { Sliders, Activity, BarChart2 } from 'lucide-react';

interface TechnicalRadarProps {
  factors: {
    trend: number;
    momentum: number;
    volatility: number;
    volume: number;
  };
  reasons: string[];
  featureImportances: Record<string, number>;
  modelName?: string;
}

export const TechnicalRadar: React.FC<TechnicalRadarProps> = ({ factors, reasons, featureImportances, modelName }) => {
  const topFeatures = Object.entries(featureImportances || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const maxImp = Math.max(...topFeatures.map(f => f[1]), 0.1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
      {/* Left: Quantitative Factors Breakdown */}
      <div className="lg:col-span-6 glass-panel p-8 sm:p-10 rounded-[36px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-5 h-5 text-[#ff00ff]" />
            <h3 className="text-xl font-bold font-mono tracking-tight text-white uppercase text-sm">
              Quantitative Factor Weights
            </h3>
          </div>
          <p className="text-xs text-white/90 mb-6">
            Multi-factor scoring breakdown evaluated against 200 EMA regimes, Wilder RSI, MACD divergence, and volume confirmation.
          </p>

          <div className="space-y-4">
            {/* Trend */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-white">Trend Factor (200 EMA + 9/21 Alignment)</span>
                <span className={`font-bold ${factors.trend >= 0 ? 'text-[#00ff73]' : 'text-[#b87175]'}`}>
                  {factors.trend > 0 ? `+${factors.trend}` : factors.trend} / 35
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${factors.trend >= 0 ? 'bg-[#00ff73]' : 'bg-[#b87175]'}`}
                  style={{ width: `${Math.min(100, Math.max(10, (Math.abs(factors.trend) / 35) * 100))}%` }}
                />
              </div>
            </div>

            {/* Momentum */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-white">Momentum Factor (RSI 14 + MACD Histogram)</span>
                <span className={`font-bold ${factors.momentum >= 0 ? 'text-[#00ff73]' : 'text-[#b87175]'}`}>
                  {factors.momentum > 0 ? `+${factors.momentum}` : factors.momentum} / 30
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${factors.momentum >= 0 ? 'bg-[#00ff73]' : 'bg-[#b87175]'}`}
                  style={{ width: `${Math.min(100, Math.max(10, (Math.abs(factors.momentum) / 30) * 100))}%` }}
                />
              </div>
            </div>

            {/* Volatility */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-white">Volatility Factor (Bollinger Bands %B)</span>
                <span className={`font-bold ${factors.volatility >= 0 ? 'text-[#00ff73]' : 'text-[#b87175]'}`}>
                  {factors.volatility > 0 ? `+${factors.volatility}` : factors.volatility} / 20
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${factors.volatility >= 0 ? 'bg-[#00ff73]' : 'bg-[#b87175]'}`}
                  style={{ width: `${Math.min(100, Math.max(10, (Math.abs(factors.volatility) / 20) * 100))}%` }}
                />
              </div>
            </div>

            {/* Volume */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <span className="text-white">Volume Confirmation (OBV + 20-MA Surge)</span>
                <span className={`font-bold ${factors.volume >= 0 ? 'text-[#00ff73]' : 'text-[#b87175]'}`}>
                  {factors.volume > 0 ? `+${factors.volume}` : factors.volume} / 15
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${factors.volume >= 0 ? 'bg-[#00ff73]' : 'bg-[#b87175]'}`}
                  style={{ width: `${Math.min(100, Math.max(10, (Math.abs(factors.volume) / 15) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quant Factor Bullet Reasons */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <span className="text-[11px] font-mono text-white/80 uppercase tracking-widest block mb-2">
            STRATEGY OBSERVATIONS
          </span>
          <ul className="space-y-1.5 text-xs text-white/80">
            {reasons.slice(0, 3).map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <Activity className="w-3.5 h-3.5 text-[#ff00ff] shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: Machine Learning Feature Importance Bar Chart */}
      <div className="lg:col-span-6 glass-panel p-8 sm:p-10 rounded-[36px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
               <BarChart2 className="w-5 h-5 text-[#ff00ff]" />
              <h3 className="text-xl font-bold font-mono tracking-tight text-white uppercase text-sm">
                ML FEATURE IMPORTANCE
              </h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4a6080]/10 text-[#ff00ff] border border-[#4a6080]/20">
              Gini Importance
            </span>
          </div>
          <p className="text-xs text-white/90 mb-6">
             {modelName || 'Random Forest'} — Ranked predictive weight of engineered indicators utilized by tree split decisions.
          </p>

          <div className="space-y-3.5">
            {topFeatures.length > 0 ? (
              topFeatures.map(([feat, imp]) => {
                const featLabel = feat
                  .replace('ret_', 'Return Lag ')
                  .replace('rsi_norm', 'Wilder RSI Divergence')
                  .replace('macd_norm', 'MACD Normalized Momentum')
                  .replace('macd_hist_norm', 'MACD Histogram Delta')
                  .replace('bb_pct_b', 'Bollinger Band %B Mean Reversion')
                  .replace('bb_width', 'Bollinger Squeeze Bandwidth')
                  .replace('ema_spread_fast', 'EMA 9 / 21 Golden Spread')
                  .replace('ema_spread_slow', 'EMA 50 / 200 Macro Trend')
                  .replace('dist_ema21', 'Distance from 21 EMA')
                  .replace('dist_ema200', 'Distance from 200 EMA')
                  .replace('atr_norm', 'ATR Volatility Ratio')
                  .replace('vol_ratio', 'Volume 20-MA Surge Ratio');

                const pct = (imp / maxImp) * 100;

                return (
                  <div key={feat}>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-white/80">{featLabel}</span>
                      <span className="text-[#ff00ff] font-semibold">{(imp * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-[#4a6080] to-[#6a5a90] transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-white/50 text-xs py-8 flex items-center justify-center italic border border-white/5 rounded-xl bg-white/5">
                Waiting for model data...
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-white/80">
          Features continuously updated on new 1-hour candle completions.
        </div>
      </div>
    </div>
  );
};

