import React, { useState } from 'react';
import { X, Plus, Minus, Check, Coffee } from 'lucide-react';
import { MenuItem, CustomizedOrderItem } from '../data/coffeeData';

interface CustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (customizedItem: CustomizedOrderItem) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [temp, setTemp] = useState<'hot' | 'iced' | 'less_ice'>('hot');
  const [size, setSize] = useState<'regular' | 'large'>('regular');
  const [milk, setMilk] = useState<'regular' | 'oat' | 'almond' | 'none'>('regular');
  const [sweetness, setSweetness] = useState<'regular' | 'half' | 'low' | 'zero'>('zero');
  const [extraShot, setExtraShot] = useState(false);
  const [extraCream, setExtraCream] = useState(false);
  const [specialNote, setSpecialNote] = useState('');

  // Calculate pricing
  const basePrice = item.price;
  const sizeCost = size === 'large' ? 20 : 0;
  const milkCost = (milk === 'oat' || milk === 'almond') ? 20 : 0;
  const shotCost = extraShot ? 30 : 0;
  const creamCost = extraCream ? 25 : 0;
  const singleItemPrice = basePrice + sizeCost + milkCost + shotCost + creamCost;
  const totalPrice = singleItemPrice * quantity;

  const handleConfirm = () => {
    const customized: CustomizedOrderItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      item,
      quantity,
      temp,
      size,
      milk: item.canCustomizeMilk ? milk : 'none',
      sweetness: item.canCustomizeSweetness ? sweetness : 'zero',
      extraShot: item.canAddShot ? extraShot : false,
      extraCream,
      specialNote: specialNote.trim(),
      itemTotal: totalPrice,
    };
    onAddToCart(customized);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FBF9F5] rounded-2xl border border-[#DFD5C6] shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="關閉客製化視窗"
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B5E57] hover:bg-[#EFE7D8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Item Header */}
        <div className="flex gap-4 items-start pr-8">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#ECE3D4] shrink-0 border border-[#DFD3BE]">
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8C6D46] font-medium mb-1">
              {item.category === 'pourover' ? '手沖產區特選' : item.category === 'espresso' ? '職人義式' : item.category === 'coldbrew' ? '慢萃冷萃' : item.category === 'tea_latte' ? '特調茶飲' : '當日甜點'}
            </div>
            <h3 className="text-xl font-serif-display font-semibold text-[#2C2523]">
              {item.name}
            </h3>
            <div className="text-xs text-[#7C6E65] mt-0.5">{item.enName}</div>
            <div className="mt-2 text-base font-medium font-mono text-[#2C2523] tabular-nums">
              NT${item.price}
            </div>
          </div>
        </div>

        {/* Item Description & Notes */}
        <p className="text-xs sm:text-sm text-[#665952] leading-relaxed border-t border-[#ECE3D4] pt-3">
          {item.description}
        </p>

        {/* Tasting Notes */}
        {item.tastingNotes.length > 0 && (
          <div className="text-xs text-[#7C6E65] flex flex-wrap items-center gap-1.5">
            <span className="font-medium text-[#2C2523]">風味調性：</span>
            {item.tastingNotes.map((note, idx) => (
              <span key={note} className="flex items-center">
                <span>{note}</span>
                {idx < item.tastingNotes.length - 1 && <span className="mx-1 text-[#A8988C]">·</span>}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-5 pt-2 border-t border-[#ECE3D4]">
          {/* Temperature option (if customizable) */}
          {item.canCustomizeTemp && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E39]">
                溫度選擇 Temperature
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTemp('hot')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                    temp === 'hot'
                      ? 'bg-[#2C2523] text-white border-[#2C2523] shadow-sm'
                      : 'bg-white text-[#574943] border-[#DFD3BE] hover:bg-[#F4ECE0]'
                  }`}
                >
                  熱飲 Hot (推薦)
                </button>
                <button
                  type="button"
                  onClick={() => setTemp('iced')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                    temp === 'iced'
                      ? 'bg-[#2C2523] text-white border-[#2C2523] shadow-sm'
                      : 'bg-white text-[#574943] border-[#DFD3BE] hover:bg-[#F4ECE0]'
                  }`}
                >
                  正常冰 Regular Ice
                </button>
                <button
                  type="button"
                  onClick={() => setTemp('less_ice')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                    temp === 'less_ice'
                      ? 'bg-[#2C2523] text-white border-[#2C2523] shadow-sm'
                      : 'bg-white text-[#574943] border-[#DFD3BE] hover:bg-[#F4ECE0]'
                  }`}
                >
                  微冰 / 去冰 Less Ice
                </button>
              </div>
            </div>
          )}

          {/* Cup Size */}
          {item.category !== 'bakery' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E39]">
                飲品容量 Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSize('regular')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                    size === 'regular'
                      ? 'bg-[#2C2523] text-white border-[#2C2523]'
                      : 'bg-white text-[#574943] border-[#DFD3BE] hover:bg-[#F4ECE0]'
                  }`}
                >
                  標準杯 (360ml)
                </button>
                <button
                  type="button"
                  onClick={() => setSize('large')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                    size === 'large'
                      ? 'bg-[#2C2523] text-white border-[#2C2523]'
                      : 'bg-white text-[#574943] border-[#DFD3BE] hover:bg-[#F4ECE0]'
                  }`}
                >
                  大杯 (480ml) +NT$20
                </button>
              </div>
            </div>
          )}

          {/* Milk Options */}
          {item.canCustomizeMilk && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E39]">
                乳品選擇 Milk Choice
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMilk('regular')}
                  className={`py-2 px-2.5 text-xs font-medium rounded-lg border transition-all text-center ${
                    milk === 'regular'
                      ? 'bg-[#2C2523] text-white border-[#2C2523]'
                      : 'bg-white text-[#574943] border-[#DFD3BE] hover:bg-[#F4ECE0]'
                  }`}
                >
                  初鹿小農生乳
                </button>
                <button
                  type="button"
                  onClick={() => setMilk('oat')}
                  className={`py-2 px-2.5 text-xs font-medium rounded-lg border transition-all text-center ${
                    milk === 'oat'
                      ? 'bg-[#2C2523] text-white border-[#2C2523]'
                      : 'bg-white text-[#574943] border-[#DFD3BE] hover:bg-[#F4ECE0]'
                  }`}
                >
                  OATLY燕麥奶 (+20)
                </button>
                <button
                  type="button"
                  onClick={() => setMilk('almond')}
                  className={`py-2 px-2.5 text-xs font-medium rounded-lg border transition-all text-center ${
                    milk === 'almond'
                      ? 'bg-[#2C2523] text-white border-[#2C2523]'
                      : 'bg-white text-[#574943] border-[#DFD3BE] hover:bg-[#F4ECE0]'
                  }`}
                >
                  杏仁厚堅果奶 (+20)
                </button>
              </div>
            </div>
          )}

          {/* Sweetness */}
          {item.canCustomizeSweetness && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E39]">
                甜度調整 Sweetness
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'zero', label: '無糖 0%' },
                  { id: 'low', label: '微糖 30%' },
                  { id: 'half', label: '半糖 50%' },
                  { id: 'regular', label: '正常 100%' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSweetness(s.id as 'zero' | 'low' | 'half' | 'regular')}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all text-center ${
                      sweetness === s.id
                        ? 'bg-[#2C2523] text-white border-[#2C2523]'
                        : 'bg-white text-[#574943] border-[#DFD3BE] hover:bg-[#F4ECE0]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-on options */}
          {(item.canAddShot || item.category === 'coldbrew' || item.category === 'tea_latte') && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E39]">
                職人風味加點 Add-ons
              </label>
              <div className="space-y-2">
                {item.canAddShot && (
                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-[#DFD3BE] bg-white text-xs cursor-pointer hover:bg-[#F4ECE0]">
                    <span className="text-[#3A2F2A] font-medium">追加一份單品短萃濃縮 (+Extra Shot)</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#8C6D46]">+NT$30</span>
                      <input
                        type="checkbox"
                        checked={extraShot}
                        onChange={(e) => setExtraShot(e.target.checked)}
                        className="rounded border-[#C4B5A2] text-[#2C2523] focus:ring-0"
                      />
                    </div>
                  </label>
                )}
                <label className="flex items-center justify-between p-2.5 rounded-lg border border-[#DFD3BE] bg-white text-xs cursor-pointer hover:bg-[#F4ECE0]">
                  <span className="text-[#3A2F2A] font-medium">手工海鹽焦糖厚奶蓋 (+Sea Salt Foam)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#8C6D46]">+NT$25</span>
                    <input
                      type="checkbox"
                      checked={extraCream}
                      onChange={(e) => setExtraCream(e.target.checked)}
                      className="rounded border-[#C4B5A2] text-[#2C2523] focus:ring-0"
                    />
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Special Note */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3E39]">
              客製備註 Special Request
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="例：自備環保杯折NT$5、紙袋包裝、奶泡厚一點..."
              className="w-full px-3 py-2 text-xs bg-white border border-[#DFD3BE] rounded-lg focus:outline-none focus:border-[#2C2523]"
            />
          </div>
        </div>

        {/* Footer: Quantity + Add Button */}
        <div className="pt-4 border-t border-[#ECE3D4] flex items-center justify-between gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center border border-[#DFD3BE] rounded-lg bg-white overflow-hidden shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-[#4A3E39] hover:bg-[#F4ECE0] transition-colors"
              aria-label="減少數量"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-2 text-xs font-mono font-bold text-[#2C2523] tabular-nums min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-[#4A3E39] hover:bg-[#F4ECE0] transition-colors"
              aria-label="增加數量"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 px-6 bg-[#2C2523] text-white rounded-lg text-sm font-medium hover:bg-[#433935] active:scale-[0.98] transition-all flex items-center justify-between shadow-sm"
          >
            <span>加入點餐單</span>
            <span className="font-mono font-bold tabular-nums">NT${totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
