import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Gauge, Sparkles, CheckCircle2 } from 'lucide-react';
import { BEAN_PROFILES, BeanProfile } from '../data/coffeeData';

export const BrewLabSection: React.FC = () => {
  const [selectedBeanId, setSelectedBeanId] = useState<string>('bean-yirgacheffe');
  const [dose, setDose] = useState<number>(15);
  const [ratio, setRatio] = useState<number>(15);

  // Timer states
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const selectedBean: BeanProfile =
    BEAN_PROFILES.find((b) => b.id === selectedBeanId) || BEAN_PROFILES[0];

  // Update default ratio when bean changes
  useEffect(() => {
    const defaultRatioNum = parseFloat(selectedBean.recommendedRatio.replace('1:', '')) || 15;
    setRatio(defaultRatioNum);
    setDose(selectedBean.brewingGuide.coffeeGrams || 15);
    resetTimer();
  }, [selectedBeanId]);

  // Total water calculation
  const totalWater = Math.round(dose * ratio);
  const bloomWater = Math.round(dose * 2.6);
  const stage1Water = Math.round(totalWater * 0.6);

  // Timer tick
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  // Format seconds to mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine current active step based on time
  const getCurrentStepIndex = () => {
    if (seconds === 0) return -1;
    if (seconds <= 35) return 0;
    if (seconds <= 75) return 1;
    if (seconds <= 130) return 2;
    return 3;
  };

  const currentStep = getCurrentStepIndex();

  return (
    <section id="brew-lab" className="py-16 lg:py-24 border-b border-[#EAE3D2] bg-[#F7F3EB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#8C6D46] font-medium flex items-center gap-2">
            <span>POUR-OVER EXTRACTION SCIENCE</span>
            <span aria-hidden="true">·</span>
            <span>職人手沖萃取指南</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#2C2523] tracking-tight">
            單品豆單與手沖萃取實驗室
          </h2>
          <p className="text-sm text-[#665952] max-w-2xl">
            精品咖啡的魅力在於風味的可重現性。選擇您喜愛的產區生豆，利用計算機調整粉水比，並跟隨計時器進行分段注水，品味每一次萃取的澄澈滋味。
          </p>
        </div>

        {/* Bean Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BEAN_PROFILES.map((bean) => {
            const isSelected = bean.id === selectedBeanId;
            return (
              <button
                key={bean.id}
                type="button"
                onClick={() => setSelectedBeanId(bean.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#8C6D46] shadow-sm ring-1 ring-[#8C6D46]'
                    : 'bg-white/80 border-[#EAE3D2] hover:bg-white hover:border-[#D4C3A3]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8C6D46] font-mono font-medium">{bean.origin}</span>
                    <span className="font-mono text-[#2C2523] font-bold">
                      SCA {bean.cuppingScore}分
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#2C2523] leading-snug">
                    {bean.name}
                  </h4>
                  <div className="text-xs text-[#7C6E65] flex flex-wrap gap-1 pt-1">
                    {bean.flavors.slice(0, 3).map((f, i) => (
                      <span key={f}>
                        {f}
                        {i < 2 && <span className="text-[#C4B5A2] mx-0.5">·</span>}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                  <span className="text-[#8C7D73]">{bean.roastLevel}</span>
                  <span className="font-mono font-semibold text-[#2C2523] tabular-nums">
                    NT${bean.pricePerCup}/杯
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Lab Dashboard: 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bean Deep Dive & Param Sliders */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE3D2] p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#F0EAE1] pb-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium">
                <span>{selectedBean.region}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedBean.altitude}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedBean.variety}</span>
              </div>
              <h3 className="text-2xl font-serif-display font-semibold text-[#2C2523]">
                {selectedBean.name}
              </h3>
              <p className="text-xs text-[#8C7D73] font-mono">{selectedBean.enName}</p>
              <p className="text-xs sm:text-sm text-[#5C504A] leading-relaxed pt-2">
                {selectedBean.description}
              </p>
            </div>

            {/* Brewing specs grid */}
            <div className="grid grid-cols-3 gap-4 text-xs bg-[#FAF7F2] p-4 rounded-xl border border-[#EFE9DC]">
              <div className="space-y-1">
                <div className="text-[#8C7D73] flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>建議水溫</span>
                </div>
                <div className="font-mono font-bold text-sm text-[#2C2523]">
                  {selectedBean.brewingGuide.waterTemp}°C
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[#8C7D73] flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>研磨刻度</span>
                </div>
                <div className="font-medium text-xs text-[#2C2523] truncate">
                  {selectedBean.brewingGuide.grindSize.split(' ')[0]}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[#8C7D73] flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>萃取總時長</span>
                </div>
                <div className="font-mono font-bold text-sm text-[#2C2523]">
                  {selectedBean.brewingGuide.totalTime}
                </div>
              </div>
            </div>

            {/* Interactive Calculator Sliders */}
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#2C2523]">
                  粉水比參數計算器 (Brew Ratio Calculator)
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setDose(15);
                    setRatio(15);
                  }}
                  className="text-xs text-[#8C6D46] hover:underline"
                >
                  重設基準值
                </button>
              </div>

              {/* Dose Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#5C504A]">咖啡粉重 (Coffee Dose)</span>
                  <span className="font-mono font-bold text-[#2C2523] tabular-nums">{dose} g</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="22"
                  step="1"
                  value={dose}
                  onChange={(e) => setDose(Number(e.target.value))}
                  className="w-full accent-[#2C2523] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#A8988C] font-mono">
                  <span>12g (個人品飲)</span>
                  <span>15g (黃金比例)</span>
                  <span>22g (雙人分享)</span>
                </div>
              </div>

              {/* Ratio Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#5C504A]">粉水比 (Water-to-Coffee Ratio)</span>
                  <span className="font-mono font-bold text-[#2C2523] tabular-nums">1:{ratio}</span>
                </div>
                <input
                  type="range"
                  min="13"
                  max="17"
                  step="0.5"
                  value={ratio}
                  onChange={(e) => setRatio(Number(e.target.value))}
                  className="w-full accent-[#2C2523] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#A8988C] font-mono">
                  <span>1:13 (厚實醇度)</span>
                  <span>1:15 (酸甜平衡)</span>
                  <span>1:17 (輕盈清爽)</span>
                </div>
              </div>

              {/* Dynamic Calculation Output Summary */}
              <div className="p-4 rounded-xl bg-[#2C2523] text-white flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#C4B5A2]">目標總注水量 Target Water</div>
                  <div className="text-2xl font-mono font-bold text-white tabular-nums">
                    {totalWater} ml / g
                  </div>
                </div>
                <div className="text-right text-xs space-y-1">
                  <div className="text-[#DFD3BE]">
                    悶蒸水量：<span className="font-mono font-bold">{bloomWater}g</span>
                  </div>
                  <div className="text-[#DFD3BE]">
                    兩段注水：各約 <span className="font-mono font-bold">{Math.round((totalWater - bloomWater) / 2)}g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Step-by-Step Pour Timer */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EAE3D2] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-4">
              <div>
                <h4 className="text-base font-semibold text-[#2C2523]">
                  分段注水計時器 (Pour Timer)
                </h4>
                <p className="text-xs text-[#8C7D73]">依據當前計算之分段目標注水</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTimer}
                  className={`p-2.5 rounded-full text-white transition-all ${
                    isActive ? 'bg-[#9E3E2F] hover:bg-[#B34535]' : 'bg-[#2C2523] hover:bg-[#433935]'
                  }`}
                  aria-label={isActive ? '暫停計時' : '開始手沖計時'}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="p-2.5 rounded-full border border-[#DFD3BE] text-[#5C504A] hover:bg-[#F4ECE0] transition-colors"
                  aria-label="重設計時"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Big Timer Display */}
            <div className="text-center py-4 bg-[#FAF7F2] rounded-xl border border-[#EFE9DC]">
              <div className="text-5xl font-mono font-bold text-[#2C2523] tracking-wider tabular-nums">
                {formatTime(seconds)}
              </div>
              <div className="text-xs text-[#8C6D46] mt-2 font-medium">
                {currentStep === -1 && '按下播放鍵開始悶蒸計時'}
                {currentStep === 0 && '悶蒸中：均勻濕潤粉層釋放花香氣'}
                {currentStep === 1 && '第一段注水：細水流中心繞圈萃取酸質'}
                {currentStep === 2 && '第二段注水：均勻繞圈提升甜感餘韻'}
                {currentStep === 3 && '滴濾收尾完成，移開濾杯享用！'}
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-3">
              {[
                {
                  id: 0,
                  time: '0:00 - 0:35',
                  title: '第一步：低溫悶蒸 (Bloom)',
                  waterTarget: `${bloomWater}g`,
                  desc: '自中心由內向外注水，靜候30秒排氣膨脹。',
                },
                {
                  id: 1,
                  time: '0:35 - 1:15',
                  title: '第二步：中心注水 (First Pour)',
                  waterTarget: `${stage1Water}g`,
                  desc: '穩定細水流繞圈，水位維持濾杯約6分滿。',
                },
                {
                  id: 2,
                  time: '1:15 - 2:00',
                  title: '第三步：收尾注水 (Final Pour)',
                  waterTarget: `${totalWater}g`,
                  desc: '輕柔注水至目標刻度，帶出圓潤甜感。',
                },
              ].map((step) => {
                const isCurrent = currentStep === step.id;
                const isPassed = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className={`p-3.5 rounded-xl border transition-all text-xs ${
                      isCurrent
                        ? 'bg-[#FBF6EE] border-[#8C6D46] shadow-xs'
                        : isPassed
                        ? 'bg-white border-[#E0D8CB] opacity-75'
                        : 'bg-white border-[#EAE3D2]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#2C2523] flex items-center gap-1.5">
                        {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {step.title}
                      </span>
                      <span className="font-mono font-bold text-[#8C6D46] tabular-nums">
                        目標 {step.waterTarget}
                      </span>
                    </div>
                    <div className="text-[#8C7D73] font-mono text-[11px] mb-1">{step.time}</div>
                    <p className="text-[#665952]">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
