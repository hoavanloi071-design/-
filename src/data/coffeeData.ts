export interface MenuItem {
  id: string;
  name: string;
  enName: string;
  price: number;
  category: 'espresso' | 'pourover' | 'coldbrew' | 'tea_latte' | 'bakery';
  description: string;
  tastingNotes: string[];
  image: string;
  isPopular?: boolean;
  isSeasonal?: boolean;
  origin?: string;
  roastLevel?: string;
  process?: string;
  canCustomizeTemp?: boolean;
  canCustomizeMilk?: boolean;
  canCustomizeSweetness?: boolean;
  canAddShot?: boolean;
}

export interface CustomizedOrderItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  temp: 'hot' | 'iced' | 'less_ice';
  size: 'regular' | 'large';
  milk: 'regular' | 'oat' | 'almond' | 'none';
  sweetness: 'regular' | 'half' | 'low' | 'zero';
  extraShot: boolean;
  extraCream: boolean;
  specialNote: string;
  itemTotal: number;
}

export interface BeanProfile {
  id: string;
  name: string;
  enName: string;
  origin: string;
  region: string;
  farm: string;
  altitude: string;
  variety: string;
  process: string;
  roastLevel: string;
  cuppingScore: number;
  flavors: string[];
  recommendedRatio: string;
  pricePerBag100g: number;
  pricePerCup: number;
  description: string;
  brewingGuide: {
    coffeeGrams: number;
    waterRatio: number; // e.g. 15 -> 1:15
    waterTemp: number; // in celsius
    grindSize: string;
    totalTime: string;
    steps: {
      time: string;
      water: number;
      label: string;
      desc: string;
    }[];
  };
}

export const MENU_ITEMS: MenuItem[] = [
  // 1. 手沖單品特選
  {
    id: 'pourover-ethiopia',
    name: '衣索比亞 耶加雪菲 沃卡日曬',
    enName: 'Ethiopia Yirgacheffe Worka Natural G1',
    price: 190,
    category: 'pourover',
    description: '日曬慢速乾燥，前段展現強烈白花香與佛手柑氣息，中段帶有熟成藍莓與蜜桃果醬的飽滿甜感，尾韻清甜綿長。',
    tastingNotes: ['茉莉花香', '佛手柑', '野生藍莓', '白桃蜜香'],
    origin: '衣索比亞 耶加雪菲 (2,100m)',
    roastLevel: '淺焙 Light Roast',
    process: '精緻日曬 Natural',
    isPopular: true,
    isSeasonal: true,
    image: '/src/assets/images/product_pour_over_coffee_1793167600922.jpg',
    canCustomizeTemp: true,
    canCustomizeMilk: false,
    canCustomizeSweetness: false,
    canAddShot: false,
  },
  {
    id: 'pourover-colombia',
    name: '哥倫比亞 玫瑰之夏 雙重厭氧水洗',
    enName: 'Colombia Pink Bourbon Double Anaerobic',
    price: 240,
    category: 'pourover',
    description: '極致細膩的雙重低溫厭氧發酵，彷彿手捧新鮮大馬士革玫瑰與荔枝果肉，酸質明亮圓潤如粉紅香檳。',
    tastingNotes: ['玫瑰花瓣', '多汁荔枝', '粉紅葡萄柚', '白可可'],
    origin: '哥倫比亞 薇拉省 (1,850m)',
    roastLevel: '淺中焙 Light-Med',
    process: '雙重厭氧水洗 Anaerobic Washed',
    isPopular: true,
    image: '/src/assets/images/product_pour_over_coffee_1793167600922.jpg',
    canCustomizeTemp: true,
    canCustomizeMilk: false,
    canCustomizeSweetness: false,
    canAddShot: false,
  },
  {
    id: 'pourover-panama',
    name: '巴拿馬 翡翠莊園 綠標藝妓',
    enName: 'Panama Hacienda La Esmeralda Geisha Washed',
    price: 360,
    category: 'pourover',
    description: '世界咖啡競賽傳奇品種，晶瑩澄澈的花香風暴與蜜漬柑橘，天鵝絨般優雅絲滑質地。',
    tastingNotes: ['橙花', '白桃果泥', '佛手柑蜜', '伯爵茶韻'],
    origin: '巴拿馬 波奎特產區 (1,700m)',
    roastLevel: '淺焙 Light Roast',
    process: '古典慢速水洗 Washed',
    isSeasonal: true,
    image: '/src/assets/images/product_pour_over_coffee_1793167600922.jpg',
    canCustomizeTemp: true,
    canCustomizeMilk: false,
    canCustomizeSweetness: false,
    canAddShot: false,
  },
  {
    id: 'pourover-house-blend',
    name: '澄光經典直火配方「暮光之弦」',
    enName: 'Lumière Signature Twilight Blend',
    price: 170,
    category: 'pourover',
    description: '店內主理人特選配方，瓜地馬拉安堤瓜拼配蘇門答臘曼特寧，濃郁堅果烤杏仁與黑巧克力油脂感，甘醇悠長。',
    tastingNotes: ['烤杏仁', '黑可可85%', '香草焦糖', '黑糖甘韻'],
    origin: '瓜地馬拉 & 蘇門答臘 (產地雙拚)',
    roastLevel: '中深焙 Medium-Dark',
    process: '水洗與半水洗混合',
    image: '/src/assets/images/product_pour_over_coffee_1793167600922.jpg',
    canCustomizeTemp: true,
    canCustomizeMilk: false,
    canCustomizeSweetness: false,
    canAddShot: false,
  },

  // 2. 職人義式咖啡
  {
    id: 'espresso-flatwhite',
    name: '職人特濃澳白 Flat White',
    enName: 'Artisan Double Ristretto Flat White',
    price: 160,
    category: 'espresso',
    description: '雙份短萃義式精華搭配微米級蒸奶，薄薄一層絲絨奶泡，咖啡濃香與奶甜完美交織。',
    tastingNotes: ['苦甜黑巧', '烤榛果', '焦糖厚乳', '絲絨質地'],
    image: '/src/assets/images/product_latte_art_ceramic_1793167602038.jpg',
    isPopular: true,
    canCustomizeTemp: true,
    canCustomizeMilk: true,
    canCustomizeSweetness: true,
    canAddShot: true,
  },
  {
    id: 'espresso-latte',
    name: '澄光拿鐵 Caffe Latte',
    enName: 'Signature Specialty Caffe Latte',
    price: 160,
    category: 'espresso',
    description: '初鹿牧場直送全脂生乳或小農燕麥奶，與澄光自家烘焙義式濃縮融合，甜感柔滑均衡。',
    tastingNotes: ['牛奶太妃糖', '奶油可可', '榛果碎粒'],
    image: '/src/assets/images/product_latte_art_ceramic_1793167602038.jpg',
    isPopular: true,
    canCustomizeTemp: true,
    canCustomizeMilk: true,
    canCustomizeSweetness: true,
    canAddShot: true,
  },
  {
    id: 'espresso-cortado',
    name: '經典短笛 柯塔多 Cortado',
    enName: 'Spanish Artisan Cortado (1:1 Ratio)',
    price: 150,
    category: 'espresso',
    description: '1:1等比例濃縮與溫熱綿密鮮奶，在精巧的玻璃小杯中品味純粹強勁的產區香氣。',
    tastingNotes: ['厚實可可', '炙烤堅果', '濃縮精華'],
    image: '/src/assets/images/product_latte_art_ceramic_1793167602038.jpg',
    canCustomizeTemp: true,
    canCustomizeMilk: true,
    canCustomizeSweetness: false,
    canAddShot: false,
  },
  {
    id: 'espresso-americano',
    name: '單品黑咖啡 Americano',
    enName: 'Single Origin Long Black / Americano',
    price: 130,
    category: 'espresso',
    description: '選用中淺焙產區豆萃取，保留明亮柑橘調果酸與乾淨清甜，層次豐潤不苦澀。',
    tastingNotes: ['柑橘清香', '紅石榴', '蜂蜜甜感'],
    image: '/src/assets/images/product_pour_over_coffee_1793167600922.jpg',
    canCustomizeTemp: true,
    canCustomizeMilk: false,
    canCustomizeSweetness: false,
    canAddShot: true,
  },

  // 3. 慢萃冷萃系列
  {
    id: 'coldbrew-signature',
    name: '24小時冰滴「澄光晨霧」',
    enName: '24hr Dutch Cold Drip Coffee',
    price: 180,
    category: 'coldbrew',
    description: '低溫逐滴慢萃24小時，經冷藏發酵兩日熟成，帶有如威士忌般的甘冽酒香與厚醇黑巧克力風味。',
    tastingNotes: ['熟成葡萄酒香', '威士忌橡木桶', '黑櫻桃', '糖蜜'],
    origin: '耶加雪菲 + 肯亞 特製發酵批次',
    image: '/src/assets/images/product_pour_over_coffee_1793167600922.jpg',
    isPopular: true,
    canCustomizeTemp: false,
    canCustomizeMilk: false,
    canCustomizeSweetness: false,
    canAddShot: false,
  },
  {
    id: 'coldbrew-tonic',
    name: '西西里檸檬氣泡冷萃',
    enName: 'Sicily Lemon Tonic Cold Brew',
    price: 180,
    category: 'coldbrew',
    description: '屏東特選尤力克綠檸檬鮮榨原汁、地中海通寧水與低溫冷萃咖啡，氣泡細緻、消暑沁涼。',
    tastingNotes: ['黃檸檬皮香', '微氣泡感', '清新草本', '冰涼回甘'],
    image: '/src/assets/images/product_pour_over_coffee_1793167600922.jpg',
    isSeasonal: true,
    canCustomizeTemp: false,
    canCustomizeMilk: false,
    canCustomizeSweetness: true,
    canAddShot: false,
  },

  // 4. 特調茶飲與無咖啡因
  {
    id: 'tea-kyoto-matcha',
    name: '京都宇治小山園 抹茶拿鐵',
    enName: 'Kyoto Uji Marukyu Koyamaen Matcha Latte',
    price: 170,
    category: 'tea_latte',
    description: '日本宇治三百餘年丸久小山園「五十鈴」抹茶茶道現拂，茶香濃郁高雅，鮮奶甘醇不苦澀。',
    tastingNotes: ['鮮嫩茶青', '海苔幽香', '回甘厚實', '絲滑甜韻'],
    image: '/src/assets/images/product_artisan_matcha_pastry_1793167601170.jpg',
    isPopular: true,
    canCustomizeTemp: true,
    canCustomizeMilk: true,
    canCustomizeSweetness: true,
    canAddShot: false,
  },
  {
    id: 'tea-hojicha',
    name: '靜岡深焙焙茶拿鐵',
    enName: 'Shizuoka Roasted Hojicha Latte',
    price: 160,
    category: 'tea_latte',
    description: '炭火慢火直烘綠茶，釋放濃郁迷人的炒米香與木質調茶韻，溫潤暖胃，低咖啡因首選。',
    tastingNotes: ['炒米香', '堅果茶韻', '紅糖甜味'],
    image: '/src/assets/images/product_artisan_matcha_pastry_1793167601170.jpg',
    canCustomizeTemp: true,
    canCustomizeMilk: true,
    canCustomizeSweetness: true,
    canAddShot: false,
  },

  // 5. 手作甜點與輕食
  {
    id: 'bakery-basque',
    name: '炙燒流心巴斯克焦香乳酪',
    enName: 'Creamy Vanilla Basque Burnt Cheesecake',
    price: 160,
    category: 'bakery',
    description: '使用法國依思尼白乳酪與馬達加斯加波本香草籽，外層高溫烘烤出深琥珀色焦香，內餡微溫流心。',
    tastingNotes: ['焦香焦糖', '馬達加斯加香草', '濃郁乳酪', '入口即化'],
    image: '/src/assets/images/product_artisan_matcha_pastry_1793167601170.jpg',
    isPopular: true,
    canCustomizeTemp: false,
    canCustomizeMilk: false,
    canCustomizeSweetness: false,
    canAddShot: false,
  },
  {
    id: 'bakery-canele',
    name: '波爾多經典香草蘭姆可麗露',
    enName: 'Bordeaux Vanilla & Aged Rum Canelé',
    price: 90,
    category: 'bakery',
    description: '銅模蜂蠟歷經72小時低溫熟成麵糊烘焙，外殼脆硬焦脆如薄糖玻璃，內裡如布丁般濕潤綿軟。',
    tastingNotes: ['天然蜂蠟脆殼', '蘭姆酒香', '太妃糖布丁'],
    image: '/src/assets/images/product_artisan_matcha_pastry_1793167601170.jpg',
    isPopular: true,
    canCustomizeTemp: false,
    canCustomizeMilk: false,
    canCustomizeSweetness: false,
    canAddShot: false,
  },
  {
    id: 'bakery-cinnamon-roll',
    name: '手作黑糖肉桂捲 佐核桃乳酪醬',
    enName: 'Artisan Cinnamon Roll with Candied Walnuts',
    price: 130,
    category: 'bakery',
    description: '自培魯邦酵母發酵布里歐麵團，裹入錫蘭肉桂與手熬黑糖醬，出爐淋上特調微酸香草奶油乳酪霜。',
    tastingNotes: ['錫蘭肉桂辛香', '香烤核桃', '濃郁乳酪醬', '鬆軟有嚼勁'],
    image: '/src/assets/images/product_artisan_matcha_pastry_1793167601170.jpg',
    isSeasonal: true,
    canCustomizeTemp: false,
    canCustomizeMilk: false,
    canCustomizeSweetness: false,
    canAddShot: false,
  },
];

export const BEAN_PROFILES: BeanProfile[] = [
  {
    id: 'bean-yirgacheffe',
    name: '衣索比亞 耶加雪菲 沃卡村 日曬 G1',
    enName: 'Ethiopia Yirgacheffe Worka Natural G1',
    origin: '衣索比亞',
    region: '蓋迪歐 (Gedeo Zone, Yirgacheffe)',
    farm: '沃卡合作社 (Worka Cooperative)',
    altitude: '2,050 - 2,200 公尺',
    variety: '原生種 (Heirloom)',
    process: '非洲棚架精緻慢速日曬',
    roastLevel: '淺焙 Light',
    cuppingScore: 92.5,
    flavors: ['茉莉白花', '佛手柑', '蜜桃', '藍莓果醬', '蜂蜜'],
    recommendedRatio: '1:15',
    pricePerBag100g: 380,
    pricePerCup: 190,
    description: '來自衣索比亞著名微產區沃卡，高海拔慢速日曬凝結出如水果軟糖般飽滿的多汁酸甜與雅致花香。',
    brewingGuide: {
      coffeeGrams: 15,
      waterRatio: 15,
      waterTemp: 92,
      grindSize: '中細研磨 (小富士 3.5號 / 砂糖顆粒感)',
      totalTime: '2分15秒',
      steps: [
        { time: '0:00 - 0:35', water: 40, label: '悶蒸 (Blooming)', desc: '均勻浸潤咖啡粉床，釋放豐沛二氧化碳，嗅聞撲鼻而來的花香。' },
        { time: '0:35 - 1:15', water: 130, label: '第一段注水 (Acidity & Body)', desc: '由中心向外緩慢繞圈，帶出優雅的柑橘果酸與藍莓甜感。' },
        { time: '1:15 - 2:00', water: 225, label: '第二段注水 (Sweetness)', desc: '維持穩定液位由內而外注滿至225g，帶出尾段細緻蜜糖餘韻。' },
      ],
    },
  },
  {
    id: 'bean-pink-bourbon',
    name: '哥倫比亞 薇拉 玫瑰之夏 雙重厭氧水洗',
    enName: 'Colombia Huila Pink Bourbon Double Anaerobic',
    origin: '哥倫比亞',
    region: '薇拉省 聖奧古斯丁 (Huila, San Agustin)',
    farm: '綠色希望莊園 (Finca La Esperanza)',
    altitude: '1,850 公尺',
    variety: '粉紅波旁 (Pink Bourbon)',
    process: '48小時全果厭氧 + 24小時脫果肉水洗厭氧',
    roastLevel: '淺中焙 Light-Med',
    cuppingScore: 93.0,
    flavors: ['大馬士革玫瑰', '荔枝鮮果', '香檳葡萄', '粉紅西柚'],
    recommendedRatio: '1:15.5',
    pricePerBag100g: 480,
    pricePerCup: 240,
    description: '粉紅波旁特有的明亮酒石酸與精準發酵控溫技術，呈現無比奔放的花香與荔枝果肉多汁感。',
    brewingGuide: {
      coffeeGrams: 16,
      waterRatio: 15.5,
      waterTemp: 91,
      grindSize: '中度研磨 (略粗於砂糖)',
      totalTime: '2分20秒',
      steps: [
        { time: '0:00 - 0:40', water: 45, label: '低溫慢悶蒸', desc: '以細水流潤濕粉層，完整保留芳香酯類。' },
        { time: '0:40 - 1:20', water: 150, label: '主體萃取注水', desc: '中心點點滴注入後繞圈，提煉荔枝與玫瑰香氣。' },
        { time: '1:20 - 2:10', water: 248, label: '收尾拉高水流', desc: '大水流輕柔推動粉層，收尾乾淨不雜澀。' },
      ],
    },
  },
  {
    id: 'bean-esmeralda-geisha',
    name: '巴拿馬 翡翠莊園 綠標藝妓 水洗批次',
    enName: 'Panama Hacienda La Esmeralda Geisha Private Collection',
    origin: '巴拿馬',
    region: '波奎特 賈拉蜜優 (Jaramillo, Boquete)',
    farm: '翡翠莊園 (Hacienda La Esmeralda)',
    altitude: '1,650 - 1,800 公尺',
    variety: '綠頂藝妓 (Green Tip Geisha)',
    process: '高山低溫慢速水洗 Washed',
    roastLevel: '淺焙 Light',
    cuppingScore: 94.5,
    flavors: ['野生橙花', '白桃果泥', '佛手柑', '高山烏龍冷香'],
    recommendedRatio: '1:16',
    pricePerBag100g: 720,
    pricePerCup: 360,
    description: '精品咖啡界的至尊名品，極其純粹的白花香與蜜桃茶感，如頂級高山春茶般清逸悠長。',
    brewingGuide: {
      coffeeGrams: 15,
      waterRatio: 16,
      waterTemp: 93,
      grindSize: '中偏粗研磨',
      totalTime: '2分10秒',
      steps: [
        { time: '0:00 - 0:30', water: 45, label: '花香釋放悶蒸', desc: '輕柔水流，花香第一時間綻放。' },
        { time: '0:30 - 1:10', water: 140, label: '核心甜酸注水', desc: '持續柔和均勻注水，避免過度攪動。' },
        { time: '1:10 - 2:00', water: 240, label: '茶韻收尾注水', desc: '維持粉床高度至240g，滴落時透明如果汁。' },
      ],
    },
  },
  {
    id: 'bean-house-dark',
    name: '澄光特選 直火深焙「暮光之弦」',
    enName: 'Lumière Artisan Twilight Dark Roast Blend',
    origin: '瓜地馬拉 & 蘇門答臘',
    region: '安堤瓜火山群 & 托巴湖林東區',
    farm: '自家直火烘焙工坊',
    altitude: '1,500 - 1,700 公尺',
    variety: '波旁、鐵比卡、卡杜拉',
    process: '直火中深焙 Medium-Dark Roast',
    roastLevel: '深焙 Dark Roast',
    cuppingScore: 90.0,
    flavors: ['85%黑可可', '烤榛果碎', '香草焦糖', '煙燻烏梅'],
    recommendedRatio: '1:14',
    pricePerBag100g: 320,
    pricePerCup: 170,
    description: '日系喫茶店風格老派深焙，採用直火烘焙機慢火烘烤，醇厚滑順，加奶或單飲皆具無與倫比的扎實感。',
    brewingGuide: {
      coffeeGrams: 18,
      waterRatio: 14,
      waterTemp: 88,
      grindSize: '中度研磨 (偏粗)',
      totalTime: '2分30秒',
      steps: [
        { time: '0:00 - 0:40', water: 50, label: '低溫深焙悶蒸', desc: '88度低水溫浸透深焙粉層，避開焦苦。' },
        { time: '0:40 - 1:30', water: 150, label: '定點中心注水', desc: '小水流中心定點，萃取濃郁焦糖堅果脂香。' },
        { time: '1:30 - 2:20', water: 252, label: '外圍柔和注水', desc: '均勻注滿252g，萃取出如黑巧克力的濃厚質地。' },
      ],
    },
  },
];

export const SEATING_AREAS = [
  {
    id: 'bar',
    name: '吧台沖煮席',
    enName: 'Drip Bar Counter',
    capacity: '1 - 2 位',
    description: '近距離感受職人注水姿態、研磨香氣與產區交流，適合熱愛咖啡文化的個人與同行好友。',
    features: ['近距觀賞手沖注水', '咖啡師產區解說', '專屬充電插座', '安靜舒適'],
    badge: '最受歡迎',
  },
  {
    id: 'window',
    name: '暖陽街景席',
    enName: 'Sunlit Window Nook',
    capacity: '1 - 4 位',
    description: '大片落地木窗灑落晨曦與樹影，欣賞青田街綠意人文街景，享受悠閒閱讀時光。',
    features: ['自然採光充沛', '林蔭街景視野', '寬敞原木大桌', '放鬆氛圍'],
    badge: '景觀極佳',
  },
  {
    id: 'lounge',
    name: '靜謐書房沙發區',
    enName: 'Quiet Library Lounge',
    capacity: '2 - 4 位',
    description: '典雅布質沙發與選書陳列，適合沉思、筆電工作或輕聲交談，提供舒緩的避風港。',
    features: ['柔軟沙發座椅', '獨立藏書閱覽', '低照明溫暖氛圍', '極致靜謐'],
    badge: '慢活推薦',
  },
  {
    id: 'garden',
    name: '綠意天井庭院席',
    enName: 'Courtyard Garden Patio',
    capacity: '2 - 6 位',
    description: '戶外日式天井庭園，植栽綠意環抱與微風吹拂，寵物友善空間（牽繩）。',
    features: ['戶外綠意庭院', '微風日光充裕', '寵物友善 (友善繫繩)', '多人聚會適用'],
    badge: '戶外開闊',
  },
];
