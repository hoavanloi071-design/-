import React from 'react';
import { ArrowDownRight, Clock, MapPin, Coffee, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu, onBookTable }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid Hero: Content Left, Cinematic Media Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Quiet unboxed kicker */}
              <div className="text-xs uppercase tracking-widest text-[#8C6D46] font-medium flex items-center gap-2">
                <span>TAIPEI SPECIALTY ROASTERY</span>
                <span aria-hidden="true">·</span>
                <span>SINCE 2021</span>
                <span aria-hidden="true">·</span>
                <span>青田街自家烘焙</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-medium tracking-tight text-[#2C2523] leading-[1.15] text-balance">
                從產地莊園，<br />
                到清晨的第一杯澄澈。
              </h1>

              {/* Subtitle / Philosophy */}
              <p className="text-base sm:text-lg text-[#61544D] leading-relaxed max-w-xl font-light">
                在日光斑駁的青田街老宅裡，我們堅持小量直火烘焙與水質控溫。每一杯手沖，都是咖啡農人一整季風土與職人晨間注水的私密對話。
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 bg-[#2C2523] text-[#FBF9F5] rounded-full text-sm font-medium hover:bg-[#433935] active:scale-95 transition-all shadow-sm flex items-center gap-2"
              >
                <span>探索當季菜單點餐</span>
                <ArrowDownRight className="w-4 h-4 text-[#D4C3A3]" />
              </button>
              <button
                onClick={onBookTable}
                className="px-6 py-3.5 bg-[#EFE9DC] text-[#3D322B] rounded-full text-sm font-medium hover:bg-[#E4DAC7] active:scale-95 transition-all border border-[#DFD3BE]"
              >
                預約席位體驗
              </button>
            </div>

            {/* Key trust & visit metadata strip */}
            <div className="pt-6 border-t border-[#EAE3D2] grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#6B5E57]">
              <div>
                <div className="font-semibold text-[#2C2523] flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>營業時間</span>
                </div>
                <p>每日 08:30 – 20:30</p>
                <p className="text-[#8C6D46]">最後點餐 20:00</p>
              </div>

              <div>
                <div className="font-semibold text-[#2C2523] flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>門市位置</span>
                </div>
                <p>台北市大安區青田街12巷4號</p>
                <p className="text-[#8C6D46]">東門站 5 號出口步行 6 分鐘</p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="font-semibold text-[#2C2523] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>空間設施</span>
                </div>
                <p>全席插座 · 高速 WiFi</p>
                <p className="text-[#8C6D46]">天井花園寵物友善</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[360px] sm:h-[460px] lg:h-full rounded-2xl overflow-hidden border border-[#EAE3D2] bg-[#EFE9DC] shadow-sm">
              <img
                src="/src/assets/images/hero_artisan_coffee_shop_1793167600303.jpg"
                alt="澄光珈琲店內溫潤木質吧台與陽光天井風景"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              {/* Subtle caption bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
                <div className="font-light">
                  <span className="font-serif-display font-medium text-sm text-white">青田店空間風景</span>
                  <span className="mx-2 text-white/60">·</span>
                  <span>陽光、老木料與研磨聲</span>
                </div>
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded text-[11px] text-white">
                  席位即時開放
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
