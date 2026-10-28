import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, Coffee, ArrowRight, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import { CustomizedOrderItem } from '../data/coffeeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CustomizedOrderItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (itemCount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  const [orderType, setOrderType] = useState<'dine_in' | 'takeout'>('dine_in');
  const [tableNumber, setTableNumber] = useState<string>('3');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [ecoCup, setEcoCup] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    items: CustomizedOrderItem[];
    total: number;
    table: string;
    type: 'dine_in' | 'takeout';
    statusStep: number;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.itemTotal, 0);
  const ecoDiscount = ecoCup ? items.length * 5 : 0;
  const finalTotal = Math.max(0, subtotal - ecoDiscount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const order = {
        orderId: `KL-${Math.floor(100 + Math.random() * 900)}`,
        items: [...items],
        total: finalTotal,
        table: tableNumber,
        type: orderType,
        statusStep: 1, // 1: Order received, 2: Grinding, 3: Brewing, 4: Ready
      };
      setCompletedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(items.reduce((s, it) => s + it.quantity, 0));
      onClearCart();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] border-l border-[#DFD3BE] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#EAE3D2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#8C6D46]" />
              <h3 className="text-lg font-serif-display font-semibold text-[#2C2523]">
                點餐單 (Your Order)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7C6E65] hover:bg-[#EFE7D8] rounded-full transition-colors"
              aria-label="關閉點餐清單"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {completedOrder ? (
              /* Simulated Barista Brewing Tracker */
              <div className="space-y-6 text-center py-4">
                <div className="w-14 h-14 bg-[#F2ECDD] text-[#8C6D46] rounded-full flex items-center justify-center mx-auto">
                  <Coffee className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#8C6D46] font-semibold">
                    ORDER IN PREPARATION
                  </span>
                  <h4 className="text-2xl font-serif-display font-bold text-[#2C2523] mt-1">
                    訂單已成立 #{completedOrder.orderId}
                  </h4>
                  <p className="text-xs text-[#7C6E65] mt-1">
                    {completedOrder.type === 'dine_in'
                      ? `內用席 桌號 ${completedOrder.table} · 咖啡師現點現萃`
                      : '外帶自取 · 預計 8 - 12 分鐘後至櫃檯取餐'}
                  </p>
                </div>

                {/* Live Brewing Progress Steps */}
                <div className="bg-white p-4 rounded-xl border border-[#DFD3BE] text-left space-y-3">
                  <div className="text-xs font-semibold text-[#2C2523] pb-2 border-b border-[#F0EAE1]">
                    吧台萃取進度 (Live Barista Status)
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2.5 text-[#2C2523]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-medium">1. 訂單已確認</div>
                        <div className="text-[11px] text-[#8C7D73]">工單已傳送至沖煮吧台</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-[#2C2523]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-medium">2. 產區單品豆秤量與研磨中</div>
                        <div className="text-[11px] text-[#8C7D73]">小富士刻度現磨，保留完整香氣</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-[#8C6D46]">
                      <div className="w-4 h-4 rounded-full border-2 border-[#8C6D46] border-t-transparent animate-spin shrink-0" />
                      <div>
                        <div className="font-medium">3. 92°C 溫控手沖注水與拉花蒸奶中</div>
                        <div className="text-[11px] text-[#8C7D73]">分段悶蒸中，請稍候片刻</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EAE3D2] text-xs text-left space-y-2">
                  <div className="font-medium text-[#2C2523]">訂單品項摘要：</div>
                  {completedOrder.items.map((it) => (
                    <div key={it.cartItemId} className="flex justify-between text-[#6B5E57]">
                      <span>
                        {it.item.name} x {it.quantity}
                      </span>
                      <span className="font-mono tabular-nums">NT${it.itemTotal}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#DFD3BE] flex justify-between font-bold text-[#2C2523]">
                    <span>合計金額</span>
                    <span className="font-mono tabular-nums">NT${completedOrder.total}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCompletedOrder(null);
                    onClose();
                  }}
                  className="w-full py-3 bg-[#2C2523] text-white rounded-lg text-xs font-medium hover:bg-[#433935]"
                >
                  返回店鋪首頁
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <Coffee className="w-10 h-10 text-[#C4B5A2] mx-auto" />
                <h4 className="text-base font-semibold text-[#2C2523]">點餐單尚無品項</h4>
                <p className="text-xs text-[#7C6E65] max-w-xs mx-auto">
                  瀏覽我們的旬季手沖豆單與洋菓子，挑選您的第一杯美好風味。
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Order Type Toggle */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#EFE9DC] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setOrderType('dine_in')}
                      className={`py-2 text-xs font-medium rounded-md transition-all ${
                        orderType === 'dine_in'
                          ? 'bg-white text-[#2C2523] shadow-xs'
                          : 'text-[#6B5E57] hover:text-[#2C2523]'
                      }`}
                    >
                      內用席 Dine-in
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('takeout')}
                      className={`py-2 text-xs font-medium rounded-md transition-all ${
                        orderType === 'takeout'
                          ? 'bg-white text-[#2C2523] shadow-xs'
                          : 'text-[#6B5E57] hover:text-[#2C2523]'
                      }`}
                    >
                      外帶自取 Takeout
                    </button>
                  </div>

                  {orderType === 'dine_in' && (
                    <div className="flex items-center justify-between text-xs pt-1 px-1">
                      <span className="text-[#6B5E57]">選擇您的內用桌號：</span>
                      <select
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="px-2.5 py-1 bg-white border border-[#DFD3BE] rounded text-xs font-mono font-medium"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                          <option key={num} value={num}>
                            桌號 #{num}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.cartItemId}
                      className="p-4 bg-white rounded-xl border border-[#EAE3D2] space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-semibold text-[#2C2523]">
                            {cartItem.item.name}
                          </h4>
                          <div className="text-xs text-[#8C7D73] font-mono">
                            {cartItem.item.enName}
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(cartItem.cartItemId)}
                          className="text-[#A8988C] hover:text-rose-600 p-1"
                          aria-label="移除此品項"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization pills/tags */}
                      <div className="text-[11px] text-[#7C6E65] space-y-0.5">
                        <div className="flex flex-wrap gap-x-2">
                          <span>
                            {cartItem.temp === 'hot'
                              ? '熱飲 Hot'
                              : cartItem.temp === 'iced'
                              ? '正常冰'
                              : '微冰/去冰'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{cartItem.size === 'large' ? '大杯 480ml' : '中杯 360ml'}</span>
                          {cartItem.milk !== 'none' && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>
                                {cartItem.milk === 'oat'
                                  ? 'OATLY燕麥奶'
                                  : cartItem.milk === 'almond'
                                  ? '杏仁堅果奶'
                                  : '初鹿生乳'}
                              </span>
                            </>
                          )}
                        </div>

                        {(cartItem.extraShot || cartItem.extraCream || cartItem.specialNote) && (
                          <div className="text-[#8C6D46] pt-1 flex flex-wrap gap-x-1.5">
                            {cartItem.extraShot && <span>[追加濃縮]</span>}
                            {cartItem.extraCream && <span>[海鹽奶蓋]</span>}
                            {cartItem.specialNote && <span>註：{cartItem.specialNote}</span>}
                          </div>
                        )}
                      </div>

                      {/* Quantity and Price */}
                      <div className="pt-2 border-t border-[#F0EAE1] flex items-center justify-between">
                        <div className="flex items-center border border-[#DFD3BE] rounded bg-[#FAF7F2] overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                            }
                            className="px-2 py-1 text-[#4A3E39] hover:bg-[#EFE7D8]"
                            aria-label="減少"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-1 text-xs font-mono font-bold tabular-nums">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                            }
                            className="px-2 py-1 text-[#4A3E39] hover:bg-[#EFE7D8]"
                            aria-label="增加"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-mono font-semibold text-sm text-[#2C2523] tabular-nums">
                          NT${cartItem.itemTotal}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Eco cup discount check */}
                <label className="flex items-center justify-between p-3 rounded-lg border border-[#DFD3BE] bg-[#F7F3EB] text-xs cursor-pointer">
                  <span className="text-[#4A3E39]">自備環保隨行杯 (每杯折抵 NT$5)</span>
                  <input
                    type="checkbox"
                    checked={ecoCup}
                    onChange={(e) => setEcoCup(e.target.checked)}
                    className="rounded border-[#C4B5A2] text-[#2C2523] focus:ring-0"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {!completedOrder && items.length > 0 && (
            <div className="p-6 border-t border-[#EAE3D2] bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B5E57]">
                  <span>商品小計</span>
                  <span className="font-mono tabular-nums">NT${subtotal}</span>
                </div>
                {ecoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>環保杯折抵</span>
                    <span className="font-mono tabular-nums">-NT${ecoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#2C2523] pt-2 border-t border-[#F0EAE1]">
                  <span>應付總額</span>
                  <span className="font-mono tabular-nums">NT${finalTotal}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-[#2C2523] text-white rounded-lg text-sm font-medium hover:bg-[#433935] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>發送吧台工單中...</span>
                ) : (
                  <>
                    <span>送出點餐 (NT${finalTotal})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
