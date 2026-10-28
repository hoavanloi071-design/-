import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { BrewLabSection } from './components/BrewLabSection';
import { ReservationSection } from './components/ReservationSection';
import { StorySection } from './components/StorySection';
import { CartDrawer } from './components/CartDrawer';
import { CustomizationModal } from './components/CustomizationModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { Footer } from './components/Footer';
import { MenuItem, CustomizedOrderItem } from './data/coffeeData';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CustomizedOrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('kissa_lumiere_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [stamps, setStamps] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kissa_lumiere_stamps');
      return saved ? Number(saved) : 3; // Start with 3 welcoming stamps
    } catch {
      return 3;
    }
  });

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kissa_lumiere_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Sync stamps to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kissa_lumiere_stamps', stamps.toString());
    } catch {
      // ignore
    }
  }, [stamps]);

  // Toast timer
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAddToCart = (customizedItem: CustomizedOrderItem) => {
    setCartItems((prev) => [...prev, customizedItem]);
    setToastMessage(`已將「${customizedItem.item.name}」加入點餐單`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => {
        if (it.cartItemId === cartItemId) {
          const singlePrice = it.itemTotal / it.quantity;
          return {
            ...it,
            quantity: newQty,
            itemTotal: singlePrice * newQty,
          };
        }
        return it;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (itemCount: number) => {
    setStamps((prev) => Math.min(8, prev + itemCount));
    setToastMessage(`訂單成立！已為您累積 ${itemCount} 點珈琲點數 ✨`);
  };

  const handleAddStampManual = () => {
    setStamps((prev) => Math.min(8, prev + 1));
  };

  const handleRedeemReward = () => {
    setStamps((prev) => Math.max(0, prev - 8));
    setToastMessage('恭喜兌換成功！飲品抵用券已存入您的取餐訂單');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, it) => acc + it.itemTotal, 0);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2523] flex flex-col font-sans selection:bg-[#EAE2D2] selection:text-[#2C2523]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C2523] text-[#FBF9F5] px-4 py-3 rounded-xl shadow-lg border border-[#4A3E39] text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-[#D4C3A3] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reservation')}
        />

        {/* 2. Menu & Customization */}
        <MenuSection onSelectItem={(item) => setSelectedMenuItem(item)} />

        {/* 3. Specialty Pour-Over Lab & Ratio Calculator */}
        <BrewLabSection />

        {/* 4. Seat Reservations */}
        <ReservationSection />

        {/* 5. Brand Craftsmanship & Philosophy */}
        <StorySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CustomizationModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
      />

      <LoyaltyModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        stamps={stamps}
        onAddStamp={handleAddStampManual}
        onRedeem={handleRedeemReward}
      />
    </div>
  );
}
