import React from 'react';
import { Sparkles, Heart, ShieldCheck, Flame } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 lg:py-24 border-b border-[#EAE3D2] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#8C6D46] font-medium flex items-center justify-center gap-2">
            <span>OUR CRAFT & PHILOSOPHY</span>
            <span aria-hidden="true">·</span>
            <span>澄光工藝與初衷</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#2C2523] tracking-tight">
            在台北的林蔭巷弄，點亮一杯澄澈的日常
          </h2>
          <p className="text-sm sm:text-base text-[#665952] leading-relaxed">
            「澄光（Kissa Lumière）」誕生於對老派喫茶店溫暖人情與現代精品咖啡科學的雙重敬意。我們相信，一杯好咖啡不該只是高深莫測的風味術語，而是能安撫疲憊心神的一縷暖陽。
          </p>
        </div>

        {/* 3 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#EAE3D2] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DFD3BE] flex items-center justify-center text-[#8C6D46]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-display font-semibold text-[#2C2523]">
                01. 友善產地與直接貿易
              </h3>
              <p className="text-xs sm:text-sm text-[#665952] leading-relaxed">
                我們長期與衣索比亞、哥倫比亞及巴拿馬優質微型小農合作，以高於公平貿易收購價，支持莊園進行水資源保育與永續耕作。
              </p>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#ECE3D4] border border-[#DFD3BE]">
              <img
                src="/src/assets/images/product_pour_over_coffee_1793167600922.jpg"
                alt="手沖咖啡萃取細節"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#EAE3D2] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DFD3BE] flex items-center justify-center text-[#8C6D46]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-display font-semibold text-[#2C2523]">
                02. 日本直火慢焙機工藝
              </h3>
              <p className="text-xs sm:text-sm text-[#665952] leading-relaxed">
                引進日本富士珈機（Fuji Royal）直火型烘焙機，慢火穿透豆芯，賦予咖啡豆乾淨清揚花果香氣與難以取代的甘甜醇厚尾韻。
              </p>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#ECE3D4] border border-[#DFD3BE]">
              <img
                src="/src/assets/images/product_latte_art_ceramic_1793167602038.jpg"
                alt="陶瓷杯中的拉花拿鐵"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#EAE3D2] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DFD3BE] flex items-center justify-center text-[#8C6D46]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-display font-semibold text-[#2C2523]">
                03. 當日手作法式洋菓子
              </h3>
              <p className="text-xs sm:text-sm text-[#665952] leading-relaxed">
                每日清晨由烘焙師揉捏麵團，選用法國伊斯尼發酵奶油、馬達加斯加香草莢，現烤香脆可麗露與流心巴斯克，與咖啡相得益彰。
              </p>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#ECE3D4] border border-[#DFD3BE]">
              <img
                src="/src/assets/images/product_artisan_matcha_pastry_1793167601170.jpg"
                alt="手作可麗露與巴斯克焦香乳酪"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
