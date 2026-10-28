import React, { useState } from 'react';
import { Calendar, Clock, Users, Check, Sparkles, CheckCircle2, Ticket } from 'lucide-react';
import { SEATING_AREAS } from '../data/coffeeData';

interface ReservationData {
  id: string;
  name: string;
  phone: string;
  areaId: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

export const ReservationSection: React.FC = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>('bar');
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('14:00');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationData | null>(null);

  const timeSlots = [
    '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      return;
    }
    const newBooking: ReservationData = {
      id: `KL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      phone: phone.trim(),
      areaId: selectedAreaId,
      date,
      time,
      guests,
      notes: notes.trim(),
    };
    setConfirmedBooking(newBooking);
  };

  const selectedArea = SEATING_AREAS.find((a) => a.id === selectedAreaId) || SEATING_AREAS[0];

  return (
    <section id="reservation" className="py-16 lg:py-24 border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#8C6D46] font-medium flex items-center gap-2">
              <span>RESERVATIONS & SEATING</span>
              <span aria-hidden="true">·</span>
              <span>沉浸式席位預約</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#2C2523] tracking-tight">
              保留一處與咖啡相伴的安靜時光
            </h2>
            <p className="text-sm text-[#665952] max-w-xl">
              為確保每位客人的品飲體驗，我們保留部分吧台沖煮席與靜謐閱讀角供線上預訂。內用低消為一杯飲品，無加收服務費。
            </p>
          </div>

          <div className="text-xs text-[#7C6E65] bg-white p-3 rounded-lg border border-[#DFD3BE] max-w-xs space-y-1">
            <div className="font-semibold text-[#2C2523] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A52]" />
              <span>入座須知 Notice</span>
            </div>
            <p>· 席位保留 10 分鐘，逾時將釋出予現場候位</p>
            <p>· 寵物同行請選擇「綠意天井庭院席」</p>
          </div>
        </div>

        {/* 4 Seating Area Cards Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEATING_AREAS.map((area) => {
            const isSelected = area.id === selectedAreaId;
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setSelectedAreaId(area.id)}
                className={`text-left p-5 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#8C6D46] shadow-sm ring-1 ring-[#8C6D46]'
                    : 'bg-white/80 border-[#EAE3D2] hover:bg-white hover:border-[#D4C3A3]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8C6D46] font-mono">{area.capacity}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF6EE] text-[#8C6D46] font-medium border border-[#E8DFC8]">
                      {area.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-[#2C2523]">{area.name}</h4>
                  <div className="text-xs text-[#8C7D73] font-mono">{area.enName}</div>
                  <p className="text-xs text-[#665952] line-clamp-2 pt-1">{area.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F0EAE1] space-y-1">
                  {area.features.slice(0, 2).map((feat) => (
                    <div key={feat} className="text-[11px] text-[#7C6E65] flex items-center gap-1">
                      <span className="text-[#8C6D46]">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Booking Form or Confirmation Voucher */}
        {confirmedBooking ? (
          <div className="bg-white rounded-2xl border border-[#DFD3BE] p-6 sm:p-10 max-w-2xl mx-auto shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[#F3EFE6] text-[#8C6D46] rounded-full flex items-center justify-center mx-auto mb-2">
                <Ticket className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                RESERVATION CONFIRMED
              </span>
              <h3 className="text-2xl font-serif-display font-semibold text-[#2C2523]">
                席位預約成功，期待與您相遇
              </h3>
              <p className="text-xs text-[#7C6E65]">
                預約編號：<span className="font-mono font-bold text-[#2C2523]">{confirmedBooking.id}</span>
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#EAE3D2] space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#8C7D73]">預約席區</span>
                  <p className="font-semibold text-sm text-[#2C2523] mt-0.5">{selectedArea.name}</p>
                </div>
                <div>
                  <span className="text-[#8C7D73]">預約人數</span>
                  <p className="font-semibold text-sm text-[#2C2523] mt-0.5">{confirmedBooking.guests} 位賓客</p>
                </div>
                <div>
                  <span className="text-[#8C7D73]">預約日期</span>
                  <p className="font-semibold text-sm text-[#2C2523] mt-0.5">{confirmedBooking.date}</p>
                </div>
                <div>
                  <span className="text-[#8C7D73]">預約時段</span>
                  <p className="font-semibold text-sm text-[#2C2523] mt-0.5">{confirmedBooking.time}</p>
                </div>
              </div>

              <div className="border-t border-[#EAE3D2] pt-3 flex justify-between">
                <div>
                  <span className="text-[#8C7D73]">預約大名：</span>
                  <span className="font-medium text-[#2C2523]">{confirmedBooking.name}</span>
                </div>
                <div>
                  <span className="text-[#8C7D73]">聯絡電話：</span>
                  <span className="font-mono text-[#2C2523]">{confirmedBooking.phone}</span>
                </div>
              </div>

              {confirmedBooking.notes && (
                <div className="border-t border-[#EAE3D2] pt-2 text-[#7C6E65]">
                  <span>備註事項：</span>
                  <span>{confirmedBooking.notes}</span>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="w-full py-2.5 px-4 bg-[#2C2523] text-white rounded-lg text-xs font-medium hover:bg-[#433935] transition-colors"
              >
                變更或建立新預約
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleBooking}
            className="bg-white rounded-2xl border border-[#EAE3D2] p-6 sm:p-8 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4A3E39] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>預約日期 Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DFD3BE] rounded-lg focus:outline-none focus:border-[#2C2523]"
                />
              </div>

              {/* Time slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4A3E39] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>時段 Time Slot</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DFD3BE] rounded-lg focus:outline-none focus:border-[#2C2523]"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} (可入座)
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest count */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4A3E39] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>人數 Guests</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DFD3BE] rounded-lg focus:outline-none focus:border-[#2C2523]"
                >
                  <option value={1}>1 位 (獨享手沖)</option>
                  <option value={2}>2 位 (雙人對談)</option>
                  <option value={3}>3 位</option>
                  <option value={4}>4 位 (景觀方桌)</option>
                  <option value={5}>5 位</option>
                  <option value={6}>6 位 (庭院長桌)</option>
                </select>
              </div>

              {/* Seating Area display */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4A3E39] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>指定席區 Selected Area</span>
                </label>
                <div className="px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DFD3BE] rounded-lg font-medium text-[#2C2523]">
                  {selectedArea.name} ({selectedArea.capacity})
                </div>
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#F0EAE1]">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4A3E39]">
                  聯絡大名 Guest Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例：林小姐 / 禾先生"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DFD3BE] rounded-lg focus:outline-none focus:border-[#2C2523]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4A3E39]">
                  手機號碼 Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0912-345-678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DFD3BE] rounded-lg focus:outline-none focus:border-[#2C2523]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#4A3E39]">
                  特別備註 Special Notes
                </label>
                <input
                  type="text"
                  placeholder="例：需使用充電座、有推嬰兒車、寵物同行..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DFD3BE] rounded-lg focus:outline-none focus:border-[#2C2523]"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#8C7D73]">
                * 席位確認簡訊將於送出後發送至您的手機
              </span>
              <button
                type="submit"
                className="px-6 py-3 bg-[#2C2523] text-white rounded-lg text-xs font-medium hover:bg-[#433935] active:scale-95 transition-all shadow-sm"
              >
                送出預約申請
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
