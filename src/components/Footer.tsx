import React from 'react';
import { MapPin, Phone, Mail, Clock, Wifi, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C2523] text-[#DFD3BE] pt-16 pb-12 border-t border-[#3D3430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Introduction */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xl font-serif-display font-bold text-white tracking-wide">
              澄光珈琲
            </h3>
            <div className="text-xs text-[#A8988C] font-mono">KISSA LUMIÈRE ROASTERS</div>
            <p className="text-xs text-[#C4B5A2] leading-relaxed">
              自家直火慢烘、國際精品單品豆、職人義式咖啡與手工洋菓子。在老宅綠意與日光晨影裡，為您萃取一杯澄澈溫潤。
            </p>
          </div>

          {/* Business Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-semibold text-white font-serif-display">
              營業時間 Hours
            </h4>
            <div className="space-y-1 text-[#C4B5A2]">
              <div className="flex justify-between py-1 border-b border-[#3E3430]">
                <span>週一至週五</span>
                <span className="font-mono text-white">08:30 – 20:30</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#3E3430]">
                <span>週六與週日</span>
                <span className="font-mono text-white">08:30 – 21:00</span>
              </div>
              <p className="text-[11px] text-[#A8988C] pt-1">
                * 每日烘焙豆出爐時間為上午 10:30
              </p>
            </div>
          </div>

          {/* Location & Transport */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-semibold text-white font-serif-display">
              門市交通 Location
            </h4>
            <div className="space-y-2 text-[#C4B5A2]">
              <p className="text-white">台北市大安區青田街 12 巷 4 號 1 樓</p>
              <p className="text-[11px] text-[#A8988C]">
                · 捷運東門站 5 號出口步行約 6 分鐘<br />
                · 捷運大安森林公園站 2 號出口步行約 8 分鐘<br />
                · 周邊設有青田停車場與大安森林公園地下停車場
              </p>
            </div>
          </div>

          {/* Contact & Amenities */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-semibold text-white font-serif-display">
              空間設施 Amenities
            </h4>
            <div className="space-y-1.5 text-[#C4B5A2]">
              <div className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-[#C49A52]" />
                <span>全席高速 Wi-Fi (Lumiere_Guest)</span>
              </div>
              <p className="text-[11px] text-[#A8988C]">
                全店大部分席位附設 110V 插座<br />
                戶外天井席位寵物友善（需繫牽繩）<br />
                門市電話：(02) 2391-8840
              </p>
            </div>
          </div>
        </div>

        {/* Clean copyright line */}
        <div className="pt-8 border-t border-[#3E3430] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7D73] gap-4">
          <p>© 2026 澄光珈琲 Kissa Lumière. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>自家烘焙所</span>
            <span>手沖單品咖啡</span>
            <span>席位線上預約</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
