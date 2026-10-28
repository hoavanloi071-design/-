import React from 'react';
import { X, Sparkles, Coffee, Gift, Check } from 'lucide-react';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  stamps: number;
  onAddStamp: () => void;
  onRedeem: () => void;
}

export const LoyaltyModal: React.FC<LoyaltyModalProps> = ({
  isOpen,
  onClose,
  stamps,
  onAddStamp,
  onRedeem,
}) => {
  if (!isOpen) return null;

  const maxStamps = 8;
  const isRewardReady = stamps >= maxStamps;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#FBF9F5] rounded-2xl border border-[#DFD3BE] shadow-2xl p-6 sm:p-8 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7C6E65] hover:bg-[#EFE7D8] transition-colors"
          aria-label="關閉集點卡"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#8C6D46] font-medium flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C49A52]" />
            <span>KISSA LUMIÈRE REWARDS</span>
          </div>
          <h3 className="text-2xl font-serif-display font-semibold text-[#2C2523]">
            澄光珈琲 旅人集點卡
          </h3>
          <p className="text-xs text-[#665952]">
            每消費一杯手沖或義式飲品累積 1 點，滿 8 點即可獲贈「職人手沖單品咖啡」或「經典法式洋菓子」乙份。
          </p>
        </div>

        {/* Digital Stamp Grid: 8 Slots */}
        <div className="bg-white p-5 rounded-xl border border-[#EAE3D2] space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: maxStamps }).map((_, index) => {
              const isStamped = index < stamps;
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all ${
                    isStamped
                      ? 'bg-[#F4ECE0] border-[#8C6D46] text-[#8C6D46] shadow-xs'
                      : 'bg-[#FAF7F2] border-dashed border-[#DFD3BE] text-[#A8988C]'
                  }`}
                >
                  {isStamped ? (
                    <div className="text-center animate-in zoom-in-50 duration-200">
                      <Coffee className="w-5 h-5 mx-auto" />
                      <span className="text-[10px] font-mono font-bold mt-0.5 block">
                        #{index + 1}
                      </span>
                    </div>
                  ) : (
                    <span className="font-mono text-xs font-medium text-[#C4B5A2]">
                      {index + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#F0EAE1]">
            <span className="text-[#6B5E57]">
              目前進度：<strong className="text-[#2C2523] font-mono">{stamps}</strong> / {maxStamps} 點
            </span>
            <span className="text-[#8C6D46] font-medium">
              {isRewardReady ? '恭喜已達成！可立即兌換' : `再集 ${maxStamps - stamps} 點兌換好禮`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {isRewardReady ? (
            <button
              type="button"
              onClick={onRedeem}
              className="w-full py-3 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Gift className="w-4 h-4" />
              <span>兌換好禮 (扣抵 8 點兌換單品咖啡券)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onAddStamp}
              className="w-full py-2.5 bg-[#EFE9DC] text-[#3D322B] rounded-lg text-xs font-medium hover:bg-[#E4DAC7] border border-[#DFD3BE] transition-colors flex items-center justify-center gap-1.5"
            >
              <Coffee className="w-4 h-4 text-[#8C6D46]" />
              <span>模擬消費集點 (+1 點)</span>
            </button>
          )}

          <p className="text-[11px] text-[#8C7D73] text-center pt-1">
            * 點數永久有效，適用於店內自取及內用點單
          </p>
        </div>
      </div>
    </div>
  );
};
