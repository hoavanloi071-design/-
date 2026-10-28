import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Coffee, Sparkles } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/coffeeData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('all');

  const categories = [
    { id: 'all', label: '全部品項' },
    { id: 'pourover', label: '手沖單品豆' },
    { id: 'espresso', label: '職人義式' },
    { id: 'coldbrew', label: '慢萃冷萃' },
    { id: 'tea_latte', label: '茶飲與厚乳' },
    { id: 'bakery', label: '手作洋菓子' },
  ];

  const flavorTags = ['all', '花香', '柑橘', '果香', '可可', '堅果', '焦糖'];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.enName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tastingNotes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchFlavor =
        selectedFlavor === 'all' ||
        item.tastingNotes.some((t) => t.includes(selectedFlavor));

      return matchCategory && matchSearch && matchFlavor;
    });
  }, [activeCategory, searchQuery, selectedFlavor]);

  return (
    <section id="menu" className="py-16 lg:py-24 border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#8C6D46] font-medium flex items-center gap-2">
              <span>SEASONAL OFFERINGS</span>
              <span aria-hidden="true">·</span>
              <span>AUTUMN / WINTER 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-medium text-[#2C2523] tracking-tight">
              旬季點單與手工洋菓子
            </h2>
            <p className="text-sm text-[#665952] max-w-xl">
              嚴選國際杯測90分以上莊園微批次生豆，每週二、五直火小量烘焙。點擊品項即可自由客製化冷熱、奶品與風味濃淡。
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7D73]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋風味、產區、品名..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#DFD3BE] rounded-lg focus:outline-none focus:border-[#2C2523] text-[#2C2523] placeholder:text-[#A8988C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7D73] hover:text-[#2C2523]"
              >
                清除
              </button>
            )}
          </div>
        </div>

        {/* Category Segmented Controls (Section 1A compliant) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#EAE3D2]">
          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#2C2523] text-[#FBF9F5] shadow-xs'
                    : 'text-[#5C504A] hover:bg-[#EFE7D8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Flavor filter */}
          <div className="flex items-center gap-2 text-xs text-[#6B5E57] shrink-0">
            <span className="font-medium text-[#4A3E39] hidden sm:inline">風味導覽：</span>
            <div className="flex items-center gap-1 overflow-x-auto">
              {flavorTags.map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-colors ${
                    selectedFlavor === flavor
                      ? 'bg-[#8C6D46] text-white font-medium'
                      : 'bg-white border border-[#E0D4C1] text-[#6B5E57] hover:bg-[#F4ECE0]'
                  }`}
                >
                  {flavor === 'all' ? '全部風味' : flavor}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-xl border border-dashed border-[#DFD3BE] space-y-3">
            <Coffee className="w-8 h-8 text-[#A8988C] mx-auto" />
            <p className="text-sm text-[#665952]">未找到符合「{searchQuery || selectedFlavor}」的咖啡品項</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFlavor('all');
                setActiveCategory('all');
              }}
              className="text-xs text-[#8C6D46] underline hover:text-[#2C2523]"
            >
              重置所有篩選條件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group relative flex flex-col justify-between bg-white rounded-xl border border-[#EAE3D2] p-5 hover:border-[#CBB99F] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Product visual banner (Lead with imagery 4:3) */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#EFE9DC]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.isSeasonal && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#2C2523]/80 backdrop-blur-sm text-[#FBF9F5] text-[10px] tracking-wider rounded font-mono">
                        本旬限定
                      </span>
                    )}
                    {item.isPopular && !item.isSeasonal && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#8C6D46]/90 backdrop-blur-sm text-[#FBF9F5] text-[10px] tracking-wider rounded font-mono">
                        主理人推薦
                      </span>
                    )}
                  </div>

                  {/* Clean unboxed metadata with separators */}
                  <div className="text-xs text-[#7C6E65] flex items-center gap-1.5">
                    <span>
                      {item.category === 'pourover'
                        ? '手沖單品'
                        : item.category === 'espresso'
                        ? '義式濃縮'
                        : item.category === 'coldbrew'
                        ? '低溫慢萃'
                        : item.category === 'tea_latte'
                        ? '茶韻厚乳'
                        : '手作烘焙'}
                    </span>
                    {item.roastLevel && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{item.roastLevel.split(' ')[0]}</span>
                      </>
                    )}
                    {item.process && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{item.process.split(' ')[0]}</span>
                      </>
                    )}
                  </div>

                  {/* Title & enName */}
                  <div>
                    <h3 className="text-base font-semibold text-[#2C2523] group-hover:text-[#8C6D46] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#8C7D73] font-light mt-0.5 line-clamp-1">
                      {item.enName}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#665952] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tasting notes */}
                  <div className="text-xs text-[#7A6A61] flex flex-wrap items-center gap-1">
                    {item.tastingNotes.map((note, idx) => (
                      <span key={note} className="flex items-center">
                        <span>{note}</span>
                        {idx < item.tastingNotes.length - 1 && (
                          <span className="mx-1 text-[#C4B5A2]">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Price & Add Action */}
                <div className="pt-4 mt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-[#7C6E65]">NT$</span>
                    <span className="text-lg font-mono font-bold text-[#2C2523] tabular-nums">
                      {item.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                    className="px-3.5 py-1.5 bg-[#EFE9DC] text-[#2C2523] rounded-lg text-xs font-medium hover:bg-[#2C2523] hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>點餐客製</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
