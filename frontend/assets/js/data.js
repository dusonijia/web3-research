/* ============================================
   GreenPulse - Data Layer
   ============================================ */

const GP_DATA = {

  dailyFeed: [
    {
      type: "patent", title: "宁德时代公布全新凝聚态电池专利，能量密度突破500Wh/kg",
      desc: "该专利描述了一种新型凝聚态电解质体系，通过原位聚合技术实现半固态到全固态的渐进式演进路线。",
      time: "2小时前", country: "🇨🇳 中国", source: "CNIPA", impact: "high", impactText: "重大突破",
      detailId: "pat-0"
    },
    {
      type: "paper", title: "Nature Energy: 硫化物全固态电池界面稳定性新机制",
      desc: "东京大学团队揭示了硫化物固态电解质与正极材料界面的自修复机制，循环寿命提升3倍。",
      time: "3小时前", country: "🇯🇵 日本", source: "Nature Energy", impact: "high", impactText: "重大发现",
      detailId: "paper-0"
    },
    {
      type: "news", title: "特斯拉4680电池产线良率突破95%，年产能达100GWh",
      desc: "特斯拉内华达超级工厂4680电池产线持续优化，干电极工艺取得关键突破。",
      time: "5小时前", country: "🇺🇸 美国", source: "Reuters", impact: "high", impactText: "重大事件",
      detailId: "news-0"
    },
    {
      type: "patent", title: "三星SDI固态电池新专利：硫银锗矿型电解质量产方案",
      desc: "专利涵盖了从原料处理到薄膜成型的完整量产工艺链，降低制造成本40%。",
      time: "6小时前", country: "🇰🇷 韩国", source: "KIPO", impact: "medium", impactText: "重要进展",
      detailId: "pat-1"
    },
    {
      type: "paper", title: "Science: 钙钛矿-硅叠层太阳能电池效率达33.9%",
      desc: "EPFL团队创下新的钙钛矿/硅叠层电池世界纪录，接近理论极限效率。",
      time: "8小时前", country: "🇨🇭 瑞士", source: "Science", impact: "high", impactText: "世界纪录",
      detailId: "paper-2"
    },
    {
      type: "news", title: "欧盟通过《关键原材料法案》修正案，加速锂矿开发审批",
      desc: "新法案将锂、钴、镍等电池关键材料的开发审批周期缩短至18个月。",
      time: "10小时前", country: "🇪🇺 欧盟", source: "European Commission", impact: "medium", impactText: "政策影响",
      detailId: "news-1"
    },
    {
      type: "patent", title: "丰田发布氢燃料电池堆新专利，功率密度提升25%",
      desc: "采用新型催化剂层结构和改良的气体扩散层设计，实现更高的质子传导效率。",
      time: "12小时前", country: "🇯🇵 日本", source: "JPO", impact: "medium", impactText: "技术进步",
      detailId: "pat-3"
    },
    {
      type: "report", title: "2026全球钠离子电池产业白皮书发布",
      desc: "报告显示全球钠离子电池产能将在2026年底达到100GWh，中国企业占据80%市场份额。",
      time: "14小时前", country: "🌍 全球", source: "BloombergNEF", impact: "medium", impactText: "行业趋势",
      detailId: "report-2"
    },
    {
      type: "paper", title: "Joule: 锂硫电池正极硫载量突破10mg/cm²",
      desc: "MIT团队通过3D打印碳骨架结构实现超高硫载量，面容量达到12mAh/cm²。",
      time: "16小时前", country: "🇺🇸 美国", source: "Joule", impact: "medium", impactText: "技术突破",
      detailId: "paper-4"
    }
  ],

  news: [
    {
      id: "news-0",
      title: "特斯拉4680电池产线良率突破95%，年产能达100GWh",
      source: "Reuters", date: "2026-02-25", country: "🇺🇸 美国", impact: "high",
      content: `特斯拉位于内华达州的超级工厂近日宣布，其4680电池生产线良率已突破95%的里程碑，年产能正式达到100GWh规模。这一成就标志着特斯拉在干电极工艺上的重大突破。\n\n**核心进展**\n\n1. **干电极工艺成熟**：经过3年的持续优化，特斯拉的无溶剂干电极涂覆技术终于实现了工业级稳定性。该工艺完全取消了传统NMP溶剂的使用，不仅降低了环保成本，还将电极制造能耗减少了约30%。\n\n2. **良率跨越式提升**：从2024年初的不足70%到如今的95%以上，良率提升主要得益于AI驱动的实时质量监控系统和改进的粉末分散工艺。\n\n3. **成本效益显著**：4680电池的单位成本已降至业界领先的$65/kWh水平，较初期降低超过45%。\n\n**产业影响**\n\n- 这一产能规模意味着特斯拉每年可支撑约130万辆Model 3/Y的电池供应\n- 对宁德时代、LG能源等传统供应商构成竞争压力\n- 加速了整个行业向干电极工艺转型的步伐\n\n**AI分析师点评**：特斯拉4680电池的量产突破具有行业标杆意义，预计将在未来12-18个月内引发主要电池厂商的技术路线调整。建议关注相关干电极设备供应商的投资机会。`,
      relatedCompanies: ["Tesla", "宁德时代", "LG能源"],
      tags: ["4680电池", "干电极", "特斯拉", "量产突破"]
    },
    {
      id: "news-1",
      title: "欧盟通过《关键原材料法案》修正案，加速锂矿开发审批",
      source: "European Commission", date: "2026-02-25", country: "🇪🇺 欧盟", impact: "medium",
      content: `欧盟委员会正式通过了《关键原材料法案》(CRMA)修正案，大幅简化了锂、钴、镍等电池关键材料在欧盟境内的开发审批流程。\n\n**核心条款**\n\n1. **审批周期压缩**：战略性矿产项目的审批周期从36个月缩短至18个月\n2. **本土化目标**：到2030年，欧盟境内关键材料加工占比需达到40%\n3. **回收利用**：到2030年，锂回收率需达到80%以上\n4. **供应链多元化**：单一第三国供应占比不得超过65%\n\n**受影响领域**\n\n- 葡萄牙、捷克、芬兰等国的锂矿项目将加速推进\n- 欧洲电池回收企业（如Northvolt、Li-Cycle）将获得更多政策支持\n- 对中国锂加工产业的依赖度将逐步降低\n\n**AI分析师点评**：该法案将加速欧洲本土电池供应链的建设，短期利好欧洲锂矿开发和电池回收企业，长期可能重塑全球锂资源供应格局。`,
      relatedCompanies: ["Northvolt", "BASF", "Vulcan Energy"],
      tags: ["政策法规", "关键材料", "锂矿", "欧盟"]
    }
  ],

  rankings: {
    battery: {
      technology: [
        { id: "tech-ssbattery", name: "固态电池 (Solid-State)", detail: "全固态锂电池技术", score: 98, change: "+3", trend: "up" },
        { id: "tech-sianode", name: "硅基负极 (Si Anode)", detail: "硅碳复合负极材料", score: 94, change: "+5", trend: "up" },
        { id: "tech-naion", name: "钠离子电池 (Na-ion)", detail: "层状氧化物/聚阴离子体系", score: 91, change: "+8", trend: "up" },
        { id: "tech-lis", name: "锂硫电池 (Li-S)", detail: "高比能锂硫电池", score: 87, change: "+2", trend: "up" },
        { id: "tech-dryelec", name: "干电极工艺 (Dry Electrode)", detail: "无溶剂电极制造", score: 85, change: "+6", trend: "up" }
      ],
      companies: [
        { id: "comp-catl", name: "宁德时代 (CATL)", detail: "中国 · 全球市占率37%", score: 97, change: "+1", trend: "up" },
        { id: "comp-byd", name: "比亚迪 (BYD)", detail: "中国 · 刀片电池", score: 93, change: "+4", trend: "up" },
        { id: "comp-lg", name: "LG能源 (LG Energy)", detail: "韩国 · 圆柱/软包", score: 90, change: "-1", trend: "down" },
        { id: "comp-panasonic", name: "松下 (Panasonic)", detail: "日本 · 4680合作", score: 86, change: "0", trend: "up" },
        { id: "comp-samsung", name: "三星SDI", detail: "韩国 · 全固态先锋", score: 84, change: "+3", trend: "up" }
      ]
    },
    solar: {
      technology: [
        { id: "tech-tandem", name: "钙钛矿/硅叠层", detail: "串联叠层太阳能电池", score: 96, change: "+4", trend: "up" },
        { id: "tech-topcon", name: "TOPCon", detail: "隧穿氧化钝化接触", score: 93, change: "+1", trend: "up" },
        { id: "tech-hjt", name: "HJT异质结", detail: "非晶硅/晶硅异质结", score: 89, change: "-2", trend: "down" },
        { id: "tech-perov", name: "钙钛矿单结", detail: "有机-无机钙钛矿", score: 86, change: "+3", trend: "up" },
        { id: "tech-ibc", name: "IBC背接触", detail: "全背接触电池", score: 82, change: "+1", trend: "up" }
      ],
      companies: [
        { id: "comp-longi", name: "隆基绿能", detail: "中国 · 全球最大硅片", score: 96, change: "+2", trend: "up" },
        { id: "comp-tongwei", name: "通威股份", detail: "中国 · 电池片龙头", score: 91, change: "+3", trend: "up" },
        { id: "comp-firstsolar", name: "First Solar", detail: "美国 · CdTe薄膜", score: 88, change: "+1", trend: "up" },
        { id: "comp-jinko", name: "晶科能源", detail: "中国 · TOPCon先锋", score: 85, change: "+2", trend: "up" },
        { id: "comp-gcl", name: "协鑫科技", detail: "中国 · 颗粒硅", score: 83, change: "+4", trend: "up" }
      ]
    }
  },

  techDetails: {
    "tech-ssbattery": {
      name: "固态电池 (Solid-State Battery)",
      category: "电池技术", score: 98,
      summary: "全固态电池采用固态电解质替代传统液态电解液，从根本上解决了安全性问题，同时实现更高的能量密度。",
      keyMetrics: [
        { label: "能量密度潜力", value: "400-500 Wh/kg" },
        { label: "技术成熟度", value: "TRL 6-7" },
        { label: "预计量产时间", value: "2027-2028" },
        { label: "相关专利数", value: "12,450+" },
        { label: "年度论文数", value: "3,200+" },
        { label: "投资热度", value: "极高" }
      ],
      analysis: "固态电池被视为下一代电池技术的最有力候选。目前三大技术路线——硫化物、氧化物和聚合物各有优劣。硫化物路线离子导率最高(>10 mS/cm)但空气稳定性差；氧化物路线稳定性好但界面接触问题突出；聚合物路线加工性最好但室温导率偏低。\n\n丰田、三星SDI和宁德时代分别在三条路线上处于领先地位。丰田计划2027年推出搭载硫化物固态电池的量产车型；三星SDI的硫银锗矿固态电池已完成A样；宁德时代则选择凝聚态路线作为过渡方案。\n\n产业化的主要挑战在于：(1)固-固界面接触和稳定性；(2)大面积薄膜制备工艺；(3)成本控制。预计2027-2028年将出现首批搭载固态电池的量产车型。",
      topCompanies: ["丰田", "三星SDI", "宁德时代", "QuantumScape", "Solid Power"],
      relatedPatents: 12450, relatedPapers: 3200
    },
    "tech-sianode": {
      name: "硅基负极 (Silicon Anode)",
      category: "电池材料", score: 94,
      summary: "硅基负极材料理论比容量高达4200 mAh/g，是石墨负极的10倍以上，被视为提升锂电池能量密度的关键路径。",
      keyMetrics: [
        { label: "理论容量", value: "4,200 mAh/g" },
        { label: "技术成熟度", value: "TRL 7-8" },
        { label: "量产进度", value: "已部分量产" },
        { label: "相关专利数", value: "8,300+" },
        { label: "年度论文数", value: "2,100+" },
        { label: "投资热度", value: "高" }
      ],
      analysis: "硅基负极通过硅碳复合、硅氧复合和纯硅薄膜等方案，正在逐步替代传统石墨负极。当前主流方案为硅碳复合负极(硅含量5-15%)，已在部分高端电池产品中商业化应用。\n\n核心挑战是硅在充放电过程中约300%的体积膨胀问题，导致电极粉化和SEI层反复破裂。近期的纳米结构设计、预锂化技术和新型粘结剂的进展有效缓解了这一问题。\n\n特斯拉4680电池中已采用硅基负极，Amprius公司的纯硅纳米线负极能量密度已超过400 Wh/kg。预计到2027年，硅含量>30%的高硅负极将实现大规模量产。",
      topCompanies: ["Amprius", "Sila Nano", "Group14", "贝特瑞", "杉杉股份"],
      relatedPatents: 8300, relatedPapers: 2100
    }
  },

  companyDetails: {
    "comp-catl": {
      name: "宁德时代 (CATL)", country: "🇨🇳 中国", founded: "2011",
      stockCode: "SZ: 300750", marketCap: "1.2万亿 CNY",
      description: "全球最大的动力电池制造商，连续7年蝉联全球装机量第一。",
      keyMetrics: [
        { label: "全球市占率", value: "37.0%" },
        { label: "2025年装机量", value: "275 GWh" },
        { label: "研发投入", value: "183亿 CNY" },
        { label: "专利数量", value: "12,800+" },
        { label: "员工数", value: "110,000+" },
        { label: "全球工厂", value: "13座" }
      ],
      techRoadmap: "宁德时代的技术路线布局极为全面：\n\n1. **磷酸铁锂(LFP)**：神行超充电池已实现10分钟充至80%\n2. **三元锂**：麒麟电池通过CTP 3.0技术实现255 Wh/kg系统能量密度\n3. **凝聚态电池**：2025年实现半固态版本量产，能量密度500 Wh/kg\n4. **钠离子电池**：第二代钠离子电池能量密度达200 Wh/kg\n5. **全固态电池**：计划2027年推出全固态原型\n\n公司采用从液态→半固态→凝聚态→全固态的渐进式路线，确保技术平稳过渡。",
      financials: "2025年营收4,500亿元，净利润480亿元，毛利率22.5%。研发费用率4.1%，持续高强度投入。",
      recentPatents: ["凝聚态电池电解质专利", "CTP 3.0结构设计", "快充负极材料", "电池回收工艺"],
      investmentRating: "买入",
      investmentNote: "全球动力电池龙头地位稳固，技术储备深厚，估值处于合理区间。中长期看好公司在固态电池和海外扩张方面的布局。"
    },
    "comp-byd": {
      name: "比亚迪 (BYD)", country: "🇨🇳 中国", founded: "1995",
      stockCode: "SZ: 002594", marketCap: "8,500亿 CNY",
      description: "全球领先的新能源汽车和动力电池一体化企业，刀片电池技术引领磷酸铁锂复兴。",
      keyMetrics: [
        { label: "全球市占率", value: "16.2%" },
        { label: "2025年装机量", value: "120 GWh" },
        { label: "汽车年销量", value: "420万辆" },
        { label: "专利数量", value: "9,200+" },
        { label: "员工数", value: "650,000+" },
        { label: "全球工厂", value: "15座" }
      ],
      techRoadmap: "比亚迪以磷酸铁锂为核心，走垂直整合路线：\n\n1. **刀片电池**：通过CTP刀片设计，LFP系统能量密度达180 Wh/kg\n2. **第二代刀片电池**：能量密度提升至200 Wh/kg，支持800V快充\n3. **超级混动DMi**：低功耗混动专用电池\n4. **储能电池**：Cube储能系统全球部署\n\n公司最大优势在于电池-整车-芯片的全产业链自研自产能力。",
      financials: "2025年营收7,200亿元，净利润620亿元，新能源汽车业务贡献65%营收。",
      recentPatents: ["第二代刀片电池", "CTC底盘一体化", "800V快充系统", "刀片电芯堆叠工艺"],
      investmentRating: "买入",
      investmentNote: "新能源汽车+电池双轮驱动，全球化扩张加速。短期关注价格战影响，中长期看好垂直一体化优势。"
    },
    "comp-lg": {
      name: "LG能源 (LG Energy Solution)", country: "🇰🇷 韩国", founded: "2020 (分拆)",
      stockCode: "KRX: 373220", marketCap: "95万亿 KRW",
      description: "全球第二大动力电池制造商，特斯拉、GM、现代等主要车企的核心供应商。",
      keyMetrics: [
        { label: "全球市占率", value: "13.5%" },
        { label: "2025年装机量", value: "100 GWh" },
        { label: "研发投入", value: "1.5万亿 KRW" },
        { label: "专利数量", value: "6,800+" },
        { label: "员工数", value: "35,000+" },
        { label: "全球工厂", value: "10座" }
      ],
      techRoadmap: "LG能源在高镍三元和软包技术领域保持领先：\n\n1. **NCMA正极**：镍含量>90%的四元材料已量产\n2. **46系列圆柱**：配合特斯拉4680需求\n3. **LFP扩展**：新增磷酸铁锂产线应对中低端市场\n4. **全固态电池**：聚合物基固态电池计划2028年量产",
      financials: "2025年营收33万亿韩元，净利润2.8万亿韩元。北美扩产投资持续加大。",
      recentPatents: ["高镍NCMA正极", "干电极圆柱电池", "LFP安全涂层", "聚合物固态电解质"],
      investmentRating: "持有",
      investmentNote: "北美工厂产能爬坡中，短期盈利承压。长期受益于美国IRA补贴和主要车企绑定关系。"
    }
  },

  papers: [
    {
      id: "paper-0",
      title: "Achieving 500 Wh/kg in Sulfide-Based All-Solid-State Lithium Metal Batteries through Cathode Engineering",
      journal: "Nature Energy", date: "2026-02-23",
      abstract: "通过创新的正极结构工程，在硫化物基全固态锂金属电池中实现了500 Wh/kg的能量密度。采用梯度孔隙率设计的复合正极，在1000次循环后容量保持率达92%。这项工作为固态电池的商业化提供了可行的技术路径。",
      tags: ["固态电池", "锂金属", "硫化物电解质", "高能量密度"],
      authors: "Y. Chen, K. Tanaka, M. Wang et al.",
      citations: 12, downloads: 3420, aiSummary: true, category: "battery",
      fullAnalysis: "## AI深度研读报告\n\n### 核心发现\n\n本论文首次在硫化物基全固态锂金属电池体系中实现了500 Wh/kg的能量密度，这是一个里程碑式的成果。\n\n**关键创新点：**\n\n1. **梯度孔隙率正极设计**：作者提出了一种全新的复合正极结构——从集流体侧到电解质侧，孔隙率从15%渐变至45%。这种设计同时优化了电子传导路径和离子传输通道。\n\n2. **原位形成界面保护层**：通过在正极表面预涂覆纳米级LiNbO₃涂层，有效抑制了正极活性物质与硫化物电解质之间的副反应。\n\n3. **低压力运行**：通过优化电解质颗粒粒径分布，将所需堆压从传统的>100 MPa降至15 MPa。\n\n### 性能参数\n\n| 指标 | 数值 | 对比现有最优 |\n|------|------|-------------|\n| 重量能量密度 | 500 Wh/kg | +18% |\n| 体积能量密度 | 1,200 Wh/L | +22% |\n| 循环寿命 | 1,000次@92% | +150% |\n| 快充能力 | 2C充电 | 同等水平 |\n\n### 产业化影响\n\n该论文提出的梯度正极设计具有很强的工程可行性，所用材料和工艺均可扩展至工业化生产。预计将加速硫化物固态电池从实验室走向中试的进程。\n\n### 局限性\n\n- 测试在纽扣电池尺度完成，需在软包电池中验证\n- 硫化物电解质的空气稳定性问题未涉及\n- 长期循环(>2000次)数据缺失\n\n### 投资启示\n\n利好固态电池产业链上游企业，特别是硫化物电解质材料供应商。短期关注三星SDI(硫化物路线主要推动者)和上游材料公司。"
    },
    {
      id: "paper-1",
      title: "Self-Healing Solid Electrolyte Interface Enables Ultra-Long Cycling in Sodium-Ion Batteries",
      journal: "Science", date: "2026-02-21",
      abstract: "首次揭示了钠离子电池中自修复固态电解质界面(SEI)的形成机制。通过原位XPS和cryo-TEM表征，发现特定电解液添加剂可诱导形成具有自修复能力的有机-无机复合SEI层，实现10000次超长循环。",
      tags: ["钠离子电池", "SEI", "自修复", "长循环"],
      authors: "L. Zhang, R. Patel, S. Kim et al.",
      citations: 8, downloads: 2890, aiSummary: true, category: "battery",
      fullAnalysis: "## AI深度研读报告\n\n### 核心发现\n\n本论文在钠离子电池领域取得了重大突破，首次实现了具有自修复能力的SEI层，将循环寿命推至10,000次。\n\n**关键创新：**\n\n1. **自修复SEI机制**：通过1,3-丙磺酸内酯(PS)和氟代碳酸乙烯酯(FEC)的协同作用，在硬碳负极表面形成了一种独特的双层SEI结构。外层为柔性有机聚合物，内层为致密的NaF/Na₂CO₃无机相。\n\n2. **原位表征突破**：首次利用cryo-TEM在原子尺度观察到SEI的动态自修复过程。\n\n3. **10,000次超长循环**：在1C倍率下，容量保持率达80%，这是钠离子电池领域报道的最长循环寿命。\n\n### 产业化意义\n\n该成果直接解决了钠离子电池循环寿命不足的核心痛点，使其在储能领域的应用前景更加光明。如果电解液配方能顺利产业化，将大幅降低钠离子电池的度电成本。\n\n### 投资启示\n\n强烈利好钠离子电池产业链，特别是中科海钠、鹏辉能源等国内钠离子电池企业，以及电解液添加剂供应商。"
    },
    {
      id: "paper-2",
      title: "33.9% Efficient Perovskite/Silicon Tandem Solar Cells via Conformal Hole-Transport Layer",
      journal: "Science", date: "2026-02-20",
      abstract: "通过开发新型共形空穴传输层技术，钙钛矿/硅叠层太阳能电池认证效率达到33.9%，创下新的世界纪录。该共形HTL有效抑制了界面缺陷复合，提升了开路电压。",
      tags: ["钙钛矿", "叠层电池", "世界纪录", "光伏"],
      authors: "A. Schmidt, J. Park, X. Liu et al.",
      citations: 15, downloads: 4100, aiSummary: true, category: "solar",
      fullAnalysis: "## AI深度研读报告\n\n### 核心发现\n\n钙钛矿/硅叠层电池效率再创新高，达到33.9%的认证效率，逼近34%的心理关口。\n\n**技术创新：**\n\n共形空穴传输层(c-HTL)技术通过原子层沉积(ALD)在钙钛矿表面形成均匀的NiOₓ薄膜，完美覆盖表面微观形貌，有效钝化了界面缺陷。开路电压从1.89V提升至1.93V，是效率突破的关键。\n\n### 产业化展望\n\n钙钛矿/硅叠层被广泛认为是下一代光伏技术的最有力候选。Oxford PV和协鑫光电正在推进中试线建设，预计2027年将出现首批GW级产能。\n\n### 投资启示\n\n利好钙钛矿产业链，关注Oxford PV（专利布局最完善）、协鑫光电（国内领先）、以及ALD设备供应商。"
    },
    {
      id: "paper-3",
      title: "Breakthrough in Proton Exchange Membrane: 2x Durability with Half Platinum Loading",
      journal: "Nature Catalysis", date: "2026-02-19",
      abstract: "开发了一种新型核壳结构催化剂，在铂载量降低50%的条件下，质子交换膜燃料电池的耐久性提升2倍，功率密度达到2.1 W/cm²。这一突破显著降低了氢燃料电池的成本。",
      tags: ["燃料电池", "PEM", "铂催化剂", "氢能"],
      authors: "T. Suzuki, M. Anderson, H. Li et al.",
      citations: 6, downloads: 1950, aiSummary: true, category: "hydrogen",
      fullAnalysis: "## AI深度研读报告\n\n### 核心发现\n\n铂催化剂成本是制约PEM燃料电池大规模商业化的核心瓶颈之一。本论文通过核壳结构设计，在铂用量减半的同时将耐久性提升了2倍。\n\n### 投资启示\n\n利好氢燃料电池产业链，降低成本将加速商用车领域的氢燃料电池渗透。关注丰田、现代和国内亿华通。"
    },
    {
      id: "paper-4",
      title: "Lithium-Sulfur Battery with 10 mg/cm² Sulfur Loading via 3D-Printed Carbon Scaffold",
      journal: "Joule", date: "2026-02-18",
      abstract: "利用3D打印技术构建了具有分级孔道结构的碳骨架，实现了10 mg/cm²的超高硫载量。面容量达12 mAh/cm²，在200次循环后容量衰减率仅为0.04%/cycle。",
      tags: ["锂硫电池", "3D打印", "高载量", "碳骨架"],
      authors: "W. Johnson, Y. Wang, P. Kumar et al.",
      citations: 4, downloads: 1680, aiSummary: true, category: "battery",
      fullAnalysis: "## AI深度研读报告\n\n### 核心发现\n\n锂硫电池的理论能量密度高达2,600 Wh/kg，但硫正极的低载量和多硫化物穿梭效应一直是产业化的主要障碍。本论文通过3D打印碳骨架，突破了硫载量的瓶颈。\n\n### 投资启示\n\n锂硫电池距离产业化仍有距离，但该成果显著推进了技术进展。长期关注航空航天等高比能需求领域的应用。"
    },
    {
      id: "paper-5",
      title: "Room-Temperature Sodium-Sulfur Battery Enabled by MXene-Based Conversion Cathode",
      journal: "Advanced Materials", date: "2026-02-17",
      abstract: "首次实现了室温钠硫电池的长循环稳定运行。MXene基转化型正极通过限域效应有效抑制多硫化物穿梭，循环寿命超过500次，库伦效率>99%。",
      tags: ["钠硫电池", "MXene", "室温", "转化反应"],
      authors: "C. Park, D. Chen, A. Müller et al.",
      citations: 3, downloads: 1230, aiSummary: true, category: "battery",
      fullAnalysis: "## AI深度研读报告\n\n### 核心发现\n\n室温钠硫电池一直受困于多硫化物穿梭问题，本论文利用MXene的限域效应找到了有效解决方案。\n\n### 投资启示\n\n钠硫电池在大规模储能领域有巨大潜力，关注MXene材料的产业化进展。"
    }
  ],

  patents: [
    {
      id: "pat-0", patentNumber: "CN202610234567.8",
      title: "一种凝聚态电池用电解质及其制备方法",
      abstract: "本发明提供了一种凝聚态电解质体系，通过原位聚合技术在液态电解质中形成高离子导体网络结构。该电解质同时具备高离子电导率(>5 mS/cm)和优异的界面稳定性，适用于高能量密度锂金属电池。",
      assignee: "宁德时代新能源科技股份有限公司", assigneeShort: "CATL",
      status: "granted", country: "🇨🇳 中国", date: "2026-02-22",
      tags: ["凝聚态电池", "电解质", "原位聚合"], category: "battery",
      fullAnalysis: "## AI专利深度解读\n\n### 技术创新点\n\n1. **原位聚合凝聚态电解质**：在传统液态电解质中加入可聚合单体和引发剂，通过热/光引发原位聚合，形成凝胶态离子导体网络。这种方法兼顾了液态电解质的高离子导率和固态电解质的安全性。\n\n2. **梯度浓度设计**：电解质中聚合物浓度从正极侧到负极侧呈梯度分布——正极侧聚合度高以抗氧化，负极侧聚合度低以确保锂离子均匀沉积。\n\n3. **界面自适应**：凝聚态电解质能随充放电过程中电极体积变化而自适应调整，维持紧密的界面接触。\n\n### 权利要求分析\n\n核心权利要求覆盖了电解质组分配方、聚合工艺参数和梯度浓度制备方法。保护范围较宽，对竞争对手形成有效壁垒。\n\n### 产业影响\n\n该专利是宁德时代凝聚态电池技术体系的核心专利之一。凝聚态路线作为从液态到全固态的过渡方案，技术风险较低，有望在2025-2026年率先量产。\n\n### 竞争格局\n\n宁德时代在凝聚态/半固态领域的专利布局最为密集，其次是清陶能源和卫蓝新能源。日韩企业则更多聚焦于全固态路线。"
    },
    {
      id: "pat-1", patentNumber: "US2026/0089321",
      title: "Solid-State Battery with Sulfide-Argyrodite Electrolyte Manufacturing Process",
      abstract: "A scalable manufacturing process for sulfide-argyrodite (Li₆PS₅Cl) solid electrolyte thin films using a continuous roll-to-roll process. The method achieves electrolyte thickness <30μm with ionic conductivity >3 mS/cm at room temperature.",
      assignee: "Samsung SDI Co., Ltd.", assigneeShort: "Samsung",
      status: "published", country: "🇰🇷 韩国", date: "2026-02-20",
      tags: ["固态电池", "硫银锗矿", "量产工艺"], category: "battery",
      fullAnalysis: "## AI专利深度解读\n\n### 技术创新点\n\n1. **卷对卷(R2R)连续制备**：将硫银锗矿电解质粉体与柔性基材结合，通过R2R压延工艺连续制备30μm以下的薄膜。\n\n2. **干法成膜**：避免了湿法工艺中硫化物电解质对水分敏感的问题。\n\n3. **在线质检**：集成了X射线荧光和阻抗在线检测系统。\n\n### 产业影响\n\n这是首个针对硫化物固态电解质量产工艺的完整专利。三星SDI计划2027年开始小批量生产搭载固态电池的高端电动车。该专利为其量产计划提供了关键的工艺支撑。"
    },
    {
      id: "pat-2", patentNumber: "EP4312876A1",
      title: "High-Efficiency Perovskite/Silicon Tandem Solar Cell with Novel Interlayer",
      abstract: "A perovskite/silicon tandem solar cell architecture with a novel recombination interlayer enabling >33% efficiency.",
      assignee: "Oxford PV Ltd.", assigneeShort: "OxPV",
      status: "pending", country: "🇬🇧 英国", date: "2026-02-19",
      tags: ["叠层电池", "钙钛矿", "中间连接层"], category: "solar",
      fullAnalysis: "## AI专利深度解读\n\n### 技术创新点\n\nOxford PV的叠层电池中间连接层专利覆盖了多种透明导电氧化物(TCO)和纳米结构设计，确保钙钛矿顶电池和硅底电池之间的电流匹配。\n\n### 产业影响\n\nOxford PV是钙钛矿叠层太阳能电池的先驱企业，该专利进一步巩固了其在关键环节的知识产权壁垒。"
    },
    {
      id: "pat-3", patentNumber: "JP2026-045678",
      title: "次世代水素燃料電池用高耐久性電解質膜",
      abstract: "丰田开发的新型全氟磺酸复合膜，通过引入二氧化铈纳米粒子实现自由基清除功能。膜寿命在加速老化测试中超过30000小时，功率密度提升15%。",
      assignee: "トヨタ自動車株式会社", assigneeShort: "Toyota",
      status: "granted", country: "🇯🇵 日本", date: "2026-02-18",
      tags: ["燃料电池", "电解质膜", "高耐久性"], category: "hydrogen",
      fullAnalysis: "## AI专利深度解读\n\n### 技术创新点\n\n丰田在PEM领域持续深耕，该专利通过CeO₂纳米粒子的自由基清除功能，显著延长了质子交换膜的使用寿命。\n\n### 产业影响\n\n燃料电池耐久性是商用车应用的关键瓶颈。该专利的3万小时寿命可满足长途重卡的使用需求。"
    },
    {
      id: "pat-4", patentNumber: "CN202610198765.2",
      title: "一种大容量钠离子电池层状氧化物正极材料及制备方法",
      abstract: "提出了O3型层状氧化物正极材料的多元素协同掺杂策略，在0.5C倍率下可逆容量达180 mAh/g，1000次循环容量保持率>85%。材料成本较锂离子电池正极降低40%。",
      assignee: "中科海钠科技有限公司", assigneeShort: "HiNa",
      status: "granted", country: "🇨🇳 中国", date: "2026-02-17",
      tags: ["钠离子电池", "正极材料", "层状氧化物"], category: "battery",
      fullAnalysis: "## AI专利深度解读\n\n### 技术创新点\n\n中科海钠的层状氧化物正极通过Cu/Fe/Mn/Ti四元素协同掺杂，实现了高容量与长寿命的统一。成本仅为三元锂正极的60%。\n\n### 产业影响\n\n钠离子电池的成本优势正在快速显现，有望在储能和低速电动车领域大规模替代磷酸铁锂。"
    },
    {
      id: "pat-5", patentNumber: "US2026/0076543",
      title: "Dry Electrode Manufacturing Process for High-Energy Lithium-Ion Batteries",
      abstract: "An improved dry electrode manufacturing process that eliminates NMP solvent usage. The binder-free electrode achieves 95% active material loading with >4 mAh/cm² areal capacity.",
      assignee: "Tesla, Inc.", assigneeShort: "Tesla",
      status: "published", country: "🇺🇸 美国", date: "2026-02-16",
      tags: ["干电极", "无溶剂", "量产工艺"], category: "battery",
      fullAnalysis: "## AI专利深度解读\n\n### 技术创新点\n\n特斯拉收购Maxwell Technologies后持续优化的干电极工艺取得了重要专利突破。无需NMP溶剂和干燥工序，制造能耗降低30%+。\n\n### 产业影响\n\n干电极工艺被视为下一代电池制造技术的核心，有望颠覆传统涂布-干燥工艺。"
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

  investments: [
    {
      id: "inv-1",
      title: "固态电池产业链投资机会",
      rating: "强烈推荐", ratingColor: "#ff5252",
      timeframe: "中长期 (2-5年)",
      summary: "固态电池处于从实验室向中试跨越的关键阶段，2027-2028年量产预期明确，当前是布局产业链的最佳窗口期。",
      opportunities: [
        { name: "硫化物电解质材料", desc: "Li₆PS₅Cl等硫银锗矿材料供应商", potential: "极高", risk: "中" },
        { name: "干法成膜设备", desc: "R2R压延设备和干法电极设备", potential: "高", risk: "中" },
        { name: "锂金属负极", desc: "超薄锂箔和预锂化技术", potential: "高", risk: "高" }
      ],
      keyCompanies: ["三星SDI", "丰田", "QuantumScape", "宁德时代", "Solid Power"],
      analysis: "固态电池赛道的投资逻辑已从'概念验证'进入'量产验证'阶段。建议关注三条主线：\n\n**主线一：电解质材料**\n硫化物电解质(如Li₆PS₅Cl)的量产是固态电池产业化的最大瓶颈。目前全球产能不足10吨/年，而2028年需求预计达数千吨。率先实现吨级量产的企业将获得巨大先发优势。\n\n**主线二：制造设备**\n固态电池的制造工艺与液态锂电池差异巨大，需要全新的干法成膜、等静压、真空封装等设备。设备供应商将成为确定性最高的投资方向。\n\n**主线三：整电池企业**\n关注拥有完整固态电池技术体系的企业，特别是已建立中试线的公司。三星SDI、丰田和宁德时代在此领域的资本开支正在加速。\n\n**风险提示**：固态电池量产进度可能不及预期，界面问题和成本控制仍是主要挑战。"
    },
    {
      id: "inv-2",
      title: "钠离子电池商业化加速",
      rating: "推荐", ratingColor: "#ffd600",
      timeframe: "短中期 (1-3年)",
      summary: "钠离子电池已进入商业化元年，成本优势显著(较LFP低20-30%)，在储能和低速EV领域将快速渗透。",
      opportunities: [
        { name: "钠离子电池制造", desc: "中科海钠、鹏辉能源等整电池企业", potential: "高", risk: "中" },
        { name: "正极材料", desc: "层状氧化物和聚阴离子正极供应商", potential: "高", risk: "低" },
        { name: "电解液", desc: "钠离子专用电解液配方", potential: "中", risk: "低" }
      ],
      keyCompanies: ["中科海钠", "鹏辉能源", "宁德时代", "比亚迪", "传艺科技"],
      analysis: "钠离子电池的投资窗口已经打开。2026年全球产能预计突破100GWh，中国企业占比超过80%。\n\n**核心投资逻辑**：锂资源价格波动风险推动终端客户加速导入钠电方案。钠离子电池在储能电站(-20°C低温性能优异)和两轮车/三轮车(成本敏感)两大场景具有显著优势。\n\n**重点关注**：已具备GWh级产能且拿到订单的企业。中科海钠与奇瑞的合作车型已上市，鹏辉能源的钠电储能系统已实现MW级交付。\n\n**风险提示**：钠电能量密度仍低于LFP，若锂价持续低位运行将削弱钠电的成本优势。"
    },
    {
      id: "inv-3",
      title: "钙钛矿光伏：效率革命",
      rating: "推荐", ratingColor: "#ffd600",
      timeframe: "中长期 (2-4年)",
      summary: "钙钛矿/硅叠层效率突破33.9%，GW级产线建设中。叠层技术将在高效组件市场开辟全新赛道。",
      opportunities: [
        { name: "钙钛矿材料", desc: "有机铵盐、SnO₂等关键材料", potential: "极高", risk: "高" },
        { name: "蒸镀/涂布设备", desc: "大面积钙钛矿薄膜沉积设备", potential: "高", risk: "中" },
        { name: "叠层电池组件", desc: "Oxford PV、协鑫光电等先行者", potential: "高", risk: "高" }
      ],
      keyCompanies: ["Oxford PV", "协鑫光电", "极电光能", "隆基绿能", "通威股份"],
      analysis: "钙钛矿被视为光伏领域的'下一个十年'。叠层电池效率已超过33%，理论极限约43%，远超单结硅电池的29.4%。\n\n**投资节奏建议**：当前阶段以设备和材料端为主，整电池企业需等待GW级量产验证。"
    },
    {
      id: "inv-4",
      title: "电池回收：确定性最高的环节",
      rating: "强烈推荐", ratingColor: "#ff5252",
      timeframe: "短期 (1-2年)",
      summary: "首批动力电池退役潮来临(2015-2018年装车电池)，叠加欧盟电池法回收要求，电池回收行业进入爆发期。",
      opportunities: [
        { name: "湿法回收", desc: "锂/镍/钴金属回收(回收率>95%)", potential: "极高", risk: "低" },
        { name: "梯次利用", desc: "退役电池储能系统", potential: "高", risk: "中" },
        { name: "黑粉处理", desc: "电池破碎和预处理", potential: "中", risk: "低" }
      ],
      keyCompanies: ["格林美", "邦普(宁德时代)", "华友钴业", "Li-Cycle", "Redwood Materials"],
      analysis: "电池回收是新能源产业链中确定性最高、政策支持最强的环节。\n\n**核心逻辑**：\n1. 退役电池量指数级增长——预计2026年全球退役量达150万吨\n2. 欧盟《电池法》强制要求回收率和再生材料使用比例\n3. 回收锂/镍/钴的成本低于原矿开采\n\n**风险提示**：行业竞争加剧可能压缩利润率，需关注回收技术和产能规模的领先企业。"
    }
  ],

  agents: [
    {
      name: "专利监控智能体", icon: "📋", status: "running",
      stats: { today: 342, total: "128K", sources: "USPTO/EPO/CNIPA/JPO/KIPO", accuracy: "99.2%" },
      lastAction: "刚刚抓取 CNIPA 新公开专利 47 项"
    },
    {
      name: "论文追踪智能体", icon: "📄", status: "running",
      stats: { today: 89, total: "56K", sources: "Nature/Science/Joule/arXiv", accuracy: "98.7%" },
      lastAction: "已分析 Nature Energy 最新3篇论文"
    },
    {
      name: "新闻采集智能体", icon: "📰", status: "running",
      stats: { today: 156, total: "12K", sources: "Reuters/Bloomberg/新华社", accuracy: "97.5%" },
      lastAction: "正在处理 Bloomberg NEF 快讯"
    },
    {
      name: "电池专项智能体", icon: "🔋", status: "running",
      stats: { today: 78, total: "45K", sources: "专利+论文+新闻", accuracy: "99.5%" },
      lastAction: "完成宁德时代最新专利深度解读"
    },
    {
      name: "报告生成智能体", icon: "📊", status: "running",
      stats: { today: 3, total: "1.2K", sources: "全数据源综合", accuracy: "96.8%" },
      lastAction: "正在撰写固态电池产业周报"
    },
    {
      name: "翻译与摘要智能体", icon: "🌐", status: "running",
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
