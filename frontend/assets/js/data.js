/* ============================================
   GreenPulse - Mock Data Layer
   In production, fetched from backend API
   ============================================ */

const GP_DATA = {

  dailyFeed: [
    {
      type: "patent", title: "宁德时代公布全新凝聚态电池专利，能量密度突破500Wh/kg",
      desc: "该专利描述了一种新型凝聚态电解质体系，通过原位聚合技术实现半固态到全固态的渐进式演进路线。",
      time: "2小时前", country: "🇨🇳 中国", source: "CNIPA", impact: "high", impactText: "重大突破"
    },
    {
      type: "paper", title: "Nature Energy: 硫化物全固态电池界面稳定性新机制",
      desc: "东京大学团队揭示了硫化物固态电解质与正极材料界面的自修复机制，循环寿命提升3倍。",
      time: "3小时前", country: "🇯🇵 日本", source: "Nature Energy", impact: "high", impactText: "重大发现"
    },
    {
      type: "news", title: "特斯拉4680电池产线良率突破95%，年产能达100GWh",
      desc: "特斯拉内华达超级工厂4680电池产线持续优化，干电极工艺取得关键突破。",
      time: "5小时前", country: "🇺🇸 美国", source: "Reuters", impact: "high", impactText: "重大事件"
    },
    {
      type: "patent", title: "三星SDI固态电池新专利：硫银锗矿型电解质量产方案",
      desc: "专利涵盖了从原料处理到薄膜成型的完整量产工艺链，降低制造成本40%。",
      time: "6小时前", country: "🇰🇷 韩国", source: "KIPO", impact: "medium", impactText: "重要进展"
    },
    {
      type: "paper", title: "Science: 钙钛矿-硅叠层太阳能电池效率达33.9%",
      desc: "EPFL团队创下新的钙钛矿/硅叠层电池世界纪录，接近理论极限效率。",
      time: "8小时前", country: "🇨🇭 瑞士", source: "Science", impact: "high", impactText: "世界纪录"
    },
    {
      type: "news", title: "欧盟通过《关键原材料法案》修正案，加速锂矿开发审批",
      desc: "新法案将锂、钴、镍等电池关键材料的开发审批周期缩短至18个月。",
      time: "10小时前", country: "🇪🇺 欧盟", source: "European Commission", impact: "medium", impactText: "政策影响"
    },
    {
      type: "patent", title: "丰田发布氢燃料电池堆新专利，功率密度提升25%",
      desc: "采用新型催化剂层结构和改良的气体扩散层设计，实现更高的质子传导效率。",
      time: "12小时前", country: "🇯🇵 日本", source: "JPO", impact: "medium", impactText: "技术进步"
    },
    {
      type: "report", title: "2026全球钠离子电池产业白皮书发布",
      desc: "报告显示全球钠离子电池产能将在2026年底达到100GWh，中国企业占据80%市场份额。",
      time: "14小时前", country: "🌍 全球", source: "BloombergNEF", impact: "medium", impactText: "行业趋势"
    },
    {
      type: "paper", title: "Joule: 锂硫电池正极硫载量突破10mg/cm²",
      desc: "MIT团队通过3D打印碳骨架结构实现超高硫载量，面容量达到12mAh/cm²。",
      time: "16小时前", country: "🇺🇸 美国", source: "Joule", impact: "medium", impactText: "技术突破"
    }
  ],

  rankings: {
    battery: {
      technology: [
        { name: "固态电池 (Solid-State)", detail: "全固态锂电池技术", score: 98, change: "+3", trend: "up" },
        { name: "硅基负极 (Si Anode)", detail: "硅碳复合负极材料", score: 94, change: "+5", trend: "up" },
        { name: "钠离子电池 (Na-ion)", detail: "层状氧化物/聚阴离子体系", score: 91, change: "+8", trend: "up" },
        { name: "锂硫电池 (Li-S)", detail: "高比能锂硫电池", score: 87, change: "+2", trend: "up" },
        { name: "干电极工艺 (Dry Electrode)", detail: "无溶剂电极制造", score: 85, change: "+6", trend: "up" }
      ],
      companies: [
        { name: "宁德时代 (CATL)", detail: "中国 · 全球市占率37%", score: 97, change: "+1", trend: "up" },
        { name: "比亚迪 (BYD)", detail: "中国 · 刀片电池", score: 93, change: "+4", trend: "up" },
        { name: "LG能源 (LG Energy)", detail: "韩国 · 圆柱/软包", score: 90, change: "-1", trend: "down" },
        { name: "松下 (Panasonic)", detail: "日本 · 4680合作", score: 86, change: "0", trend: "up" },
        { name: "三星SDI", detail: "韩国 · 全固态先锋", score: 84, change: "+3", trend: "up" }
      ]
    },
    solar: {
      technology: [
        { name: "钙钛矿/硅叠层", detail: "串联叠层太阳能电池", score: 96, change: "+4", trend: "up" },
        { name: "TOPCon", detail: "隧穿氧化钝化接触", score: 93, change: "+1", trend: "up" },
        { name: "HJT异质结", detail: "非晶硅/晶硅异质结", score: 89, change: "-2", trend: "down" },
        { name: "钙钛矿单结", detail: "有机-无机钙钛矿", score: 86, change: "+3", trend: "up" },
        { name: "IBC背接触", detail: "全背接触电池", score: 82, change: "+1", trend: "up" }
      ],
      companies: [
        { name: "隆基绿能", detail: "中国 · 全球最大硅片", score: 96, change: "+2", trend: "up" },
        { name: "通威股份", detail: "中国 · 电池片龙头", score: 91, change: "+3", trend: "up" },
        { name: "First Solar", detail: "美国 · CdTe薄膜", score: 88, change: "+1", trend: "up" },
        { name: "晶科能源", detail: "中国 · TOPCon先锋", score: 85, change: "+2", trend: "up" },
        { name: "协鑫科技", detail: "中国 · 颗粒硅", score: 83, change: "+4", trend: "up" }
      ]
    }
  },

  papers: [
    {
      title: "Achieving 500 Wh/kg in Sulfide-Based All-Solid-State Lithium Metal Batteries through Cathode Engineering",
      journal: "Nature Energy",
      date: "2026-02-23",
      abstract: "通过创新的正极结构工程，在硫化物基全固态锂金属电池中实现了500 Wh/kg的能量密度。采用梯度孔隙率设计的复合正极，在1000次循环后容量保持率达92%。这项工作为固态电池的商业化提供了可行的技术路径。",
      tags: ["固态电池", "锂金属", "硫化物电解质", "高能量密度"],
      authors: "Y. Chen, K. Tanaka, M. Wang et al.",
      citations: 12, downloads: 3420,
      aiSummary: true, category: "battery"
    },
    {
      title: "Self-Healing Solid Electrolyte Interface Enables Ultra-Long Cycling in Sodium-Ion Batteries",
      journal: "Science",
      date: "2026-02-21",
      abstract: "首次揭示了钠离子电池中自修复固态电解质界面(SEI)的形成机制。通过原位XPS和cryo-TEM表征，发现特定电解液添加剂可诱导形成具有自修复能力的有机-无机复合SEI层，实现10000次超长循环。",
      tags: ["钠离子电池", "SEI", "自修复", "长循环"],
      authors: "L. Zhang, R. Patel, S. Kim et al.",
      citations: 8, downloads: 2890,
      aiSummary: true, category: "battery"
    },
    {
      title: "33.9% Efficient Perovskite/Silicon Tandem Solar Cells via Conformal Hole-Transport Layer",
      journal: "Science",
      date: "2026-02-20",
      abstract: "通过开发新型共形空穴传输层技术，钙钛矿/硅叠层太阳能电池认证效率达到33.9%，创下新的世界纪录。该共形HTL有效抑制了界面缺陷复合，提升了开路电压。",
      tags: ["钙钛矿", "叠层电池", "世界纪录", "光伏"],
      authors: "A. Schmidt, J. Park, X. Liu et al.",
      citations: 15, downloads: 4100,
      aiSummary: true, category: "solar"
    },
    {
      title: "Breakthrough in Proton Exchange Membrane: 2x Durability with Half Platinum Loading",
      journal: "Nature Catalysis",
      date: "2026-02-19",
      abstract: "开发了一种新型核壳结构催化剂，在铂载量降低50%的条件下，质子交换膜燃料电池的耐久性提升2倍，功率密度达到2.1 W/cm²。这一突破显著降低了氢燃料电池的成本。",
      tags: ["燃料电池", "PEM", "铂催化剂", "氢能"],
      authors: "T. Suzuki, M. Anderson, H. Li et al.",
      citations: 6, downloads: 1950,
      aiSummary: true, category: "hydrogen"
    },
    {
      title: "Lithium-Sulfur Battery with 10 mg/cm² Sulfur Loading via 3D-Printed Carbon Scaffold",
      journal: "Joule",
      date: "2026-02-18",
      abstract: "利用3D打印技术构建了具有分级孔道结构的碳骨架，实现了10 mg/cm²的超高硫载量。面容量达12 mAh/cm²，在200次循环后容量衰减率仅为0.04%/cycle。",
      tags: ["锂硫电池", "3D打印", "高载量", "碳骨架"],
      authors: "W. Johnson, Y. Wang, P. Kumar et al.",
      citations: 4, downloads: 1680,
      aiSummary: true, category: "battery"
    },
    {
      title: "Room-Temperature Sodium-Sulfur Battery Enabled by MXene-Based Conversion Cathode",
      journal: "Advanced Materials",
      date: "2026-02-17",
      abstract: "首次实现了室温钠硫电池的长循环稳定运行。MXene基转化型正极通过限域效应有效抑制多硫化物穿梭，循环寿命超过500次，库伦效率>99%。",
      tags: ["钠硫电池", "MXene", "室温", "转化反应"],
      authors: "C. Park, D. Chen, A. Müller et al.",
      citations: 3, downloads: 1230,
      aiSummary: true, category: "battery"
    }
  ],

  patents: [
    {
      id: "CN202610234567.8",
      title: "一种凝聚态电池用电解质及其制备方法",
      abstract: "本发明提供了一种凝聚态电解质体系，通过原位聚合技术在液态电解质中形成高离子导体网络结构。该电解质同时具备高离子电导率(>5 mS/cm)和优异的界面稳定性，适用于高能量密度锂金属电池。",
      assignee: "宁德时代新能源科技股份有限公司", assigneeShort: "CATL",
      status: "granted", country: "🇨🇳 中国", date: "2026-02-22",
      tags: ["凝聚态电池", "电解质", "原位聚合"], category: "battery"
    },
    {
      id: "US2026/0089321",
      title: "Solid-State Battery with Sulfide-Argyrodite Electrolyte Manufacturing Process",
      abstract: "A scalable manufacturing process for sulfide-argyrodite (Li₆PS₅Cl) solid electrolyte thin films using a continuous roll-to-roll process. The method achieves electrolyte thickness <30μm with ionic conductivity >3 mS/cm at room temperature.",
      assignee: "Samsung SDI Co., Ltd.", assigneeShort: "Samsung",
      status: "published", country: "🇰🇷 韩国", date: "2026-02-20",
      tags: ["固态电池", "硫银锗矿", "量产工艺"], category: "battery"
    },
    {
      id: "EP4312876A1",
      title: "High-Efficiency Perovskite/Silicon Tandem Solar Cell with Novel Interlayer",
      abstract: "A perovskite/silicon tandem solar cell architecture with a novel recombination interlayer. The interlayer enables efficient carrier transport while minimizing optical and electrical losses, achieving >33% certified efficiency.",
      assignee: "Oxford PV Ltd.", assigneeShort: "OxPV",
      status: "pending", country: "🇬🇧 英国", date: "2026-02-19",
      tags: ["叠层电池", "钙钛矿", "中间连接层"], category: "solar"
    },
    {
      id: "JP2026-045678",
      title: "次世代水素燃料電池用高耐久性電解質膜",
      abstract: "丰田开发的新型全氟磺酸复合膜，通过引入二氧化铈纳米粒子实现自由基清除功能。膜寿命在加速老化测试中超过30000小时，功率密度提升15%。",
      assignee: "トヨタ自動車株式会社", assigneeShort: "Toyota",
      status: "granted", country: "🇯🇵 日本", date: "2026-02-18",
      tags: ["燃料电池", "电解质膜", "高耐久性"], category: "hydrogen"
    },
    {
      id: "CN202610198765.2",
      title: "一种大容量钠离子电池层状氧化物正极材料及制备方法",
      abstract: "提出了O3型层状氧化物正极材料的多元素协同掺杂策略，在0.5C倍率下可逆容量达180 mAh/g，1000次循环容量保持率>85%。材料成本较锂离子电池正极降低40%。",
      assignee: "中科海钠科技有限公司", assigneeShort: "HiNa",
      status: "granted", country: "🇨🇳 中国", date: "2026-02-17",
      tags: ["钠离子电池", "正极材料", "层状氧化物"], category: "battery"
    },
    {
      id: "US2026/0076543",
      title: "Dry Electrode Manufacturing Process for High-Energy Lithium-Ion Batteries",
      abstract: "An improved dry electrode manufacturing process that eliminates NMP solvent usage. The binder-free electrode achieves 95% active material loading with >4 mAh/cm² areal capacity. Production speed reaches 100 m/min on pilot line.",
      assignee: "Tesla, Inc.", assigneeShort: "Tesla",
      status: "published", country: "🇺🇸 美国", date: "2026-02-16",
      tags: ["干电极", "无溶剂", "量产工艺"], category: "battery"
    }
  ],

  reports: [
    {
      title: "2026全球固态电池产业化进展深度报告",
      summary: "全面分析全球固态电池从实验室到量产的关键突破，涵盖硫化物、氧化物和聚合物三大技术路线的对比评估。",
      date: "2026-02-24", pages: 86, emoji: "🔋", gradient: 1, type: "深度报告"
    },
    {
      title: "中美欧电池专利布局竞争态势分析",
      summary: "基于12万份电池相关专利的AI语义分析，揭示中美欧三大经济体在电池技术领域的专利竞争格局。",
      date: "2026-02-22", pages: 62, emoji: "🗺️", gradient: 2, type: "竞争分析"
    },
    {
      title: "2026年钠离子电池商业化白皮书",
      summary: "钠离子电池产业链全景扫描，从正极、负极、电解液到系统集成的技术成熟度和成本分析。",
      date: "2026-02-20", pages: 54, emoji: "⚡", gradient: 3, type: "产业白皮书"
    },
    {
      title: "全球光伏技术路线图2026-2030",
      summary: "TOPCon、HJT、IBC、钙钛矿叠层四大技术路线的产业化进展预测与投资机会分析。",
      date: "2026-02-18", pages: 78, emoji: "☀️", gradient: 4, type: "路线图"
    },
    {
      title: "氢能产业链关键材料供应链风险评估",
      summary: "铂族金属、质子交换膜、碳纸等燃料电池关键材料的全球供应链分析与风险预警。",
      date: "2026-02-16", pages: 45, emoji: "💧", gradient: 1, type: "风险评估"
    },
    {
      title: "全球锂矿资源争夺战：2026年最新格局",
      summary: "南美锂三角、澳洲、非洲锂矿资源的最新开发进展与主要玩家战略布局分析。",
      date: "2026-02-14", pages: 58, emoji: "⛏️", gradient: 2, type: "资源分析"
    }
  ],

  agents: [
    {
      name: "专利监控智能体",
      icon: "📋",
      status: "running",
      stats: { today: 342, total: "128K", sources: "USPTO/EPO/CNIPA/JPO/KIPO", accuracy: "99.2%" },
      lastAction: "刚刚抓取 CNIPA 新公开专利 47 项"
    },
    {
      name: "论文追踪智能体",
      icon: "📄",
      status: "running",
      stats: { today: 89, total: "56K", sources: "Nature/Science/Joule/arXiv", accuracy: "98.7%" },
      lastAction: "已分析 Nature Energy 最新3篇论文"
    },
    {
      name: "新闻采集智能体",
      icon: "📰",
      status: "running",
      stats: { today: 156, total: "12K", sources: "Reuters/Bloomberg/新华社", accuracy: "97.5%" },
      lastAction: "正在处理 Bloomberg NEF 快讯"
    },
    {
      name: "电池专项智能体",
      icon: "🔋",
      status: "running",
      stats: { today: 78, total: "45K", sources: "专利+论文+新闻", accuracy: "99.5%" },
      lastAction: "完成宁德时代最新专利深度解读"
    },
    {
      name: "报告生成智能体",
      icon: "📊",
      status: "running",
      stats: { today: 3, total: "1.2K", sources: "全数据源综合", accuracy: "96.8%" },
      lastAction: "正在撰写固态电池产业周报"
    },
    {
      name: "翻译与摘要智能体",
      icon: "🌐",
      status: "running",
      stats: { today: 234, total: "89K", sources: "中/英/日/韩/德", accuracy: "98.9%" },
      lastAction: "完成日本专利 JP2026-045678 中文翻译"
    }
  ],

  mapEvents: [
    { lat: 39.9, lng: 116.4, type: "patent", label: "北京 · 宁德时代凝聚态电池专利", intensity: 95 },
    { lat: 35.7, lng: 139.7, type: "paper", label: "东京 · 固态电池界面机制论文", intensity: 90 },
    { lat: 36.1, lng: -115.2, type: "news", label: "内华达 · 特斯拉4680产线突破", intensity: 88 },
    { lat: 37.4, lng: 127.0, type: "patent", label: "首尔 · 三星SDI固态电池专利", intensity: 85 },
    { lat: 46.5, lng: 6.6, type: "paper", label: "洛桑 · 钙钛矿叠层电池纪录", intensity: 92 },
    { lat: 50.8, lng: 4.4, type: "news", label: "布鲁塞尔 · 欧盟关键材料法案", intensity: 80 },
    { lat: 35.0, lng: 137.0, type: "patent", label: "名古屋 · 丰田燃料电池专利", intensity: 82 },
    { lat: 31.2, lng: 121.5, type: "patent", label: "上海 · 中科海钠钠离子专利", intensity: 78 },
    { lat: 42.4, lng: -71.1, type: "paper", label: "波士顿 · MIT锂硫电池论文", intensity: 85 },
    { lat: 37.4, lng: -122.1, type: "patent", label: "硅谷 · 特斯拉干电极专利", intensity: 86 },
    { lat: 51.8, lng: -1.3, type: "patent", label: "牛津 · Oxford PV叠层电池专利", intensity: 83 },
    { lat: 30.6, lng: 114.3, type: "news", label: "武汉 · 比亚迪新工厂动工", intensity: 75 },
    { lat: 48.1, lng: 11.6, type: "patent", label: "慕尼黑 · BMW固态电池专利", intensity: 79 },
    { lat: 22.5, lng: 114.1, type: "news", label: "深圳 · 欣旺达扩产计划", intensity: 72 },
    { lat: -23.5, lng: -46.6, type: "news", label: "圣保罗 · 巴西锂矿开发计划", intensity: 68 },
    { lat: 59.3, lng: 18.1, type: "paper", label: "斯德哥尔摩 · Northvolt回收技术论文", intensity: 76 },
    { lat: 34.1, lng: -118.2, type: "news", label: "洛杉矶 · QuantumScape固态电池路测", intensity: 81 },
    { lat: 28.6, lng: 77.2, type: "news", label: "新德里 · 印度电池激励政策", intensity: 70 },
  ]
};
