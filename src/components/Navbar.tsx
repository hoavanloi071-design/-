import React from 'react';
import { ShoppingBag, Coffee, Sparkles, Volume2, VolumeX, Menu as MenuIcon, X } from 'lucide-react';
import { cafeAudio } from '../utils/audioAmbiance';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenLoyalty: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenLoyalty,
  onNavigate,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleAmbiance = () => {
    const playing = cafeAudio.toggle();
    setIsAudioPlaying(playing);
  };

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EAE3D2] transition-colors">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="text-xl sm:text-2xl font-serif-display font-bold tracking-tight text-[#2C2523] whitespace-nowrap shrink-0 hover:text-[#7A583A] transition-colors flex items-center gap-2"
        >
          <span className="text-[#8C6D46]">澄光珈琲</span>
          <span className="text-sm font-sans font-light tracking-widest text-[#7C6E65] hidden sm:inline">KISSA LUMIÈRE</span>
        </a>

        {/* Zone 2: 4-5 Nav links, single line text */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C504A]">
          <button
            onClick={() => handleNavClick('menu')}
            className="hover:text-[#2C2523] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            旬季菜單
          </button>
          <button
            onClick={() => handleNavClick('brew-lab')}
            className="hover:text-[#2C2523] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            手沖實驗室
          </button>
          <button
            onClick={() => handleNavClick('reservation')}
            className="hover:text-[#2C2523] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            席位預約
          </button>
          <button
            onClick={() => handleNavClick('story')}
            className="hover:text-[#2C2523] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            店鋪物語
          </button>
          <button
            onClick={onOpenLoyalty}
            className="hover:text-[#8C6D46] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C49A52]" />
            <span>珈琲集點卡</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Cart Drawer & quick ambiance toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleAmbiance}
            title={isAudioPlaying ? '暫停雨聲環境音' : '播放咖啡館雨聲環境音'}
            aria-label="Toggle cafe ambiance audio"
            className={`p-2.5 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
              isAudioPlaying
                ? 'bg-[#EADDC9] text-[#4A3828] border-[#D4C3A3]'
                : 'bg-white/80 text-[#7C6E65] border-[#E8DEC8] hover:bg-[#F4EFE6]'
            }`}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse text-[#8C6D46]" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden xl:inline text-xs font-mono">
              {isAudioPlaying ? '雨日咖啡廳音效' : '環境音'}
            </span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View Cart"
            className="relative flex items-center gap-2.5 px-4 py-2.5 bg-[#2C2523] text-[#FBF9F5] rounded-full hover:bg-[#433935] active:scale-95 transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#D6C2A5]" />
            <span className="text-sm font-medium whitespace-nowrap">點餐單</span>
            {cartCount > 0 ? (
              <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#C49A52] text-[#1E1714] rounded-full tabular-nums">
                {cartCount} · NT${cartTotal}
              </span>
            ) : (
              <span className="text-xs text-[#A6978C] font-mono">0</span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A3E39] hover:text-[#1A1614]"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE3D2] bg-[#FBF9F5] px-4 py-4 space-y-3 shadow-lg">
          <button
            onClick={() => handleNavClick('menu')}
            className="block w-full text-left py-2 text-base font-medium text-[#2C2523] border-b border-[#F0EAE1]"
          >
            旬季菜單 Menu
          </button>
          <button
            onClick={() => handleNavClick('brew-lab')}
            className="block w-full text-left py-2 text-base font-medium text-[#2C2523] border-b border-[#F0EAE1]"
          >
            手沖實驗室 Brew Lab
          </button>
          <button
            onClick={() => handleNavClick('reservation')}
            className="block w-full text-left py-2 text-base font-medium text-[#2C2523] border-b border-[#F0EAE1]"
          >
            席位預約 Reservations
          </button>
          <button
            onClick={() => handleNavClick('story')}
            className="block w-full text-left py-2 text-base font-medium text-[#2C2523] border-b border-[#F0EAE1]"
          >
            店鋪物語 Story
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLoyalty();
            }}
            className="block w-full text-left py-2 text-base font-medium text-[#8C6D46]"
          >
            珈琲集點卡 Rewards
          </button>
        </div>
      )}
    </header>
  );
};
