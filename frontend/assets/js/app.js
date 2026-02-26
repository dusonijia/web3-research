/* ============================================
   GreenPulse - Application Controller
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove("active"));
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (link) link.classList.add("active");
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(s => observerNav.observe(s));

  const now = new Date();
  document.getElementById("lastUpdate").textContent =
    `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  GreenPulseMap.init("worldMap", GP_DATA.mapEvents);

  document.querySelectorAll(".map-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".map-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      GreenPulseMap.filter("worldMap", btn.dataset.filter);
    });
  });

  renderDailyFeed();
  renderRankings("battery");

  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener("click", () => {
      const container = btn.closest('.section') || btn.parentElement;
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (["battery","solar","hydrogen","wind","storage","ev"].includes(btn.dataset.tab)) {
        renderRankings(btn.dataset.tab);
      }
    });
  });

  renderPapers();
  renderPatents();
  renderInvestments();
  renderReports();
  renderAgents();
  animateCounters();
  setInterval(updateLiveTicker, 30000);

  document.getElementById("detailOverlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) closeDetail();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDetail(); });
});


/* ============================================
   MOBILE MENU
   ============================================ */
function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}
function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}


/* ============================================
   DAILY FEED
   ============================================ */
function renderDailyFeed() {
  const container = document.getElementById("dailyFeed");
  container.innerHTML = GP_DATA.dailyFeed.map((item, idx) => `
    <div class="feed-card animate-in" onclick="openFeedDetail('${item.type}','${item.detailId}')">
      <div class="feed-meta">
        <span class="feed-tag ${item.type}">${({patent:'专利',paper:'论文',news:'新闻',report:'报告'})[item.type]}</span>
        <span class="feed-time">${item.time}</span>
        <span class="feed-country">${item.country}</span>
      </div>
      <div class="feed-title">${item.title}</div>
      <div class="feed-desc">${item.desc}</div>
      <div class="feed-footer">
        <span class="feed-source">来源: ${item.source}</span>
        <span class="feed-impact impact-${item.impact}">● ${item.impactText}</span>
      </div>
    </div>
  `).join("");
}

function openFeedDetail(type, detailId) {
  if (type === "patent") openPatentDetail(detailId);
  else if (type === "paper") openPaperDetail(detailId);
  else if (type === "news") openNewsDetail(detailId);
  else if (type === "report") openReportDetail(detailId);
}


/* ============================================
   RANKINGS (clickable)
   ============================================ */
function renderRankings(category) {
  const grid = document.getElementById("rankingsGrid");
  const data = GP_DATA.rankings[category] || GP_DATA.rankings.battery;

  grid.innerHTML = `
    <div class="ranking-card">
      <div class="ranking-header">
        <div class="ranking-category">🔬 技术排名</div>
        <span class="ranking-period">本周</span>
      </div>
      <div class="ranking-list">
        ${(data.technology || []).map((item, i) => rankingItemHTML(item, i, 'tech')).join("")}
      </div>
    </div>
    <div class="ranking-card">
      <div class="ranking-header">
        <div class="ranking-category">🏢 企业排名</div>
        <span class="ranking-period">本周</span>
      </div>
      <div class="ranking-list">
        ${(data.companies || []).map((item, i) => rankingItemHTML(item, i, 'comp')).join("")}
      </div>
    </div>
  `;
}

function rankingItemHTML(item, i, type) {
  const rankClass = i < 3 ? `rank-${i+1}` : "rank-other";
  const onclick = type === 'comp' ? `onclick="openCompanyDetail('${item.id}')"` : `onclick="openTechDetail('${item.id}')"`;
  return `
    <div class="ranking-item" ${onclick}>
      <div class="rank-num ${rankClass}">${i+1}</div>
      <div class="rank-info">
        <div class="rank-name">${item.name}</div>
        <div class="rank-detail">${item.detail}</div>
      </div>
      <div class="rank-score">
        <div class="score-value">${item.score}</div>
        <div class="score-change ${item.trend === 'up' ? 'score-up' : 'score-down'}">
          ${item.trend === 'up' ? '↑' : '↓'} ${item.change}
        </div>
      </div>
    </div>
  `;
}


/* ============================================
   PAPERS (clickable)
   ============================================ */
function renderPapers() {
  const container = document.getElementById("papersGrid");
  container.innerHTML = GP_DATA.papers.map(paper => `
    <div class="paper-card animate-in" onclick="openPaperDetail('${paper.id}')">
      <div class="paper-header">
        <div class="paper-journal">📚 ${paper.journal}</div>
        <span class="paper-date">${paper.date}</span>
      </div>
      <div class="paper-title">${paper.title}</div>
      <div class="paper-abstract">${paper.abstract}</div>
      <div class="paper-tags">
        ${paper.tags.map(t => `<span class="paper-tag">${t}</span>`).join("")}
        ${paper.aiSummary ? '<span class="ai-badge">🤖 AI研读</span>' : ''}
      </div>
      <div class="paper-footer">
        <span class="paper-authors">${paper.authors}</span>
        <div class="paper-metrics">
          <span class="paper-metric">引用 <span class="value">${paper.citations}</span></span>
          <span class="paper-metric">下载 <span class="value">${paper.downloads.toLocaleString()}</span></span>
        </div>
      </div>
    </div>
  `).join("");
}


/* ============================================
   PATENTS (clickable)
   ============================================ */
function renderPatents() {
  const container = document.getElementById("patentsGrid");
  container.innerHTML = GP_DATA.patents.map(patent => `
    <div class="patent-card animate-in" onclick="openPatentDetail('${patent.id}')">
      <div class="patent-header">
        <span class="patent-id">${patent.patentNumber}</span>
        <span class="patent-status status-${patent.status}">${({granted:'已授权',pending:'审查中',published:'已公开'})[patent.status]}</span>
      </div>
      <div class="patent-title">${patent.title}</div>
      <div class="patent-abstract">${patent.abstract}</div>
      <div class="patent-assignee">
        <div class="assignee-logo">${patent.assigneeShort.charAt(0)}</div>
        <span class="assignee-name">${patent.assignee}</span>
      </div>
      <div class="patent-footer">
        <span class="patent-country">${patent.country}</span>
        <span class="patent-date">${patent.date}</span>
      </div>
    </div>
  `).join("");
}


/* ============================================
   INVESTMENTS
   ============================================ */
function renderInvestments() {
  const container = document.getElementById("investmentsGrid");
  container.innerHTML = GP_DATA.investments.map(inv => `
    <div class="invest-card animate-in" onclick="openInvestDetail('${inv.id}')">
      <div class="invest-header">
        <span class="invest-rating" style="background:${inv.ratingColor}22;color:${inv.ratingColor};border:1px solid ${inv.ratingColor}44">${inv.rating}</span>
        <span class="invest-timeframe">${inv.timeframe}</span>
      </div>
      <div class="invest-title">${inv.title}</div>
      <div class="invest-summary">${inv.summary}</div>
      <div class="invest-opps">
        ${inv.opportunities.slice(0,3).map(o => `
          <div class="invest-opp">
            <span class="invest-opp-name">${o.name}</span>
            <span class="invest-opp-potential potential-${o.potential}">潜力: ${o.potential} · 风险: ${o.risk}</span>
          </div>
        `).join("")}
      </div>
      <div class="invest-companies">
        ${inv.keyCompanies.map(c => `<span class="invest-company-tag">${c}</span>`).join("")}
      </div>
    </div>
  `).join("");
}


/* ============================================
   REPORTS
   ============================================ */
function renderReports() {
  const container = document.getElementById("reportsGrid");
  container.innerHTML = GP_DATA.reports.map((report, idx) => `
    <div class="report-card animate-in" onclick="openReportDetail('report-${idx}')">
      <div class="report-banner">
        <div class="gradient-bg gradient-bg-${report.gradient}">${report.emoji}</div>
        <span class="report-type-badge">${report.type}</span>
      </div>
      <div class="report-body">
        <div class="report-title">${report.title}</div>
        <div class="report-summary">${report.summary}</div>
        <div class="report-meta">
          <span class="report-date">${report.date}</span>
          <span class="report-pages">📄 ${report.pages}页</span>
        </div>
      </div>
    </div>
  `).join("");
}


/* ============================================
   AGENTS
   ============================================ */
function renderAgents() {
  const container = document.getElementById("agentGrid");
  container.innerHTML = GP_DATA.agents.map(agent => `
    <div class="agent-card">
      <div class="agent-header">
        <div class="agent-name"><span class="agent-icon">${agent.icon}</span>${agent.name}</div>
        <div class="agent-status-indicator ${agent.status}">
          <span class="status-dot"></span>
          ${agent.status === 'running' ? '运行中' : '空闲'}
        </div>
      </div>
      <div class="agent-stats">
        <div class="agent-stat"><div class="agent-stat-value">${agent.stats.today}</div><div class="agent-stat-label">今日处理</div></div>
        <div class="agent-stat"><div class="agent-stat-value">${agent.stats.total}</div><div class="agent-stat-label">累计处理</div></div>
      </div>
      <div class="agent-activity">最近活动: <span class="last-action">${agent.lastAction}</span></div>
    </div>
  `).join("");
}


/* ============================================
   DETAIL PAGES - Open / Close
   ============================================ */
function openDetail(html) {
  document.getElementById("detailContent").innerHTML = html;
  document.getElementById("detailOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  document.getElementById("detailOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function mdToHtml(md) {
  if (!md) return "";
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => '<ul>' + m + '</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => /^[\s-]+$/.test(c))) return '';
      const tag = match.includes('---') ? '' : cells.map(c => `<td>${c.trim()}</td>`).join('');
      return tag ? `<tr>${tag}</tr>` : '';
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, m => `<table>${m}</table>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(?!<[hultop])(.+)/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p><br><\/p>/g, '');
}


/* ---- Paper Detail ---- */
function openPaperDetail(id) {
  const paper = GP_DATA.papers.find(p => p.id === id);
  if (!paper) return;
  openDetail(`
    <div class="detail-meta">
      <div class="detail-meta-item">📚 ${paper.journal}</div>
      <div class="detail-meta-item">📅 ${paper.date}</div>
      <div class="detail-meta-item">✍️ ${paper.authors}</div>
      <div class="detail-meta-item">🏷️ ${paper.category}</div>
    </div>
    <h1>${paper.title}</h1>
    <div class="detail-metrics">
      <div class="detail-metric"><div class="detail-metric-value">${paper.citations}</div><div class="detail-metric-label">引用次数</div></div>
      <div class="detail-metric"><div class="detail-metric-value">${paper.downloads.toLocaleString()}</div><div class="detail-metric-label">下载次数</div></div>
      <div class="detail-metric"><div class="detail-metric-value">${paper.journal}</div><div class="detail-metric-label">发表期刊</div></div>
    </div>
    <div class="detail-tags">${paper.tags.map(t => `<span class="detail-tag">${t}</span>`).join("")}</div>
    <h2>摘要</h2>
    <p>${paper.abstract}</p>
    ${paper.fullAnalysis ? mdToHtml(paper.fullAnalysis) : '<p style="color:var(--text-muted)">AI深度分析报告生成中...</p>'}
  `);
}

/* ---- Patent Detail ---- */
function openPatentDetail(id) {
  const patent = GP_DATA.patents.find(p => p.id === id);
  if (!patent) return;
  openDetail(`
    <div class="detail-meta">
      <div class="detail-meta-item" style="color:var(--accent)">📋 ${patent.patentNumber}</div>
      <div class="detail-meta-item">${patent.country}</div>
      <div class="detail-meta-item">📅 ${patent.date}</div>
      <div class="detail-meta-item">${({granted:'✅ 已授权',pending:'⏳ 审查中',published:'📢 已公开'})[patent.status]}</div>
    </div>
    <h1>${patent.title}</h1>
    <div class="detail-metrics">
      <div class="detail-metric"><div class="detail-metric-value">${patent.assigneeShort}</div><div class="detail-metric-label">专利权人</div></div>
      <div class="detail-metric"><div class="detail-metric-value">${patent.country}</div><div class="detail-metric-label">申请国家</div></div>
      <div class="detail-metric"><div class="detail-metric-value">${patent.category}</div><div class="detail-metric-label">技术领域</div></div>
    </div>
    <div class="detail-tags">${patent.tags.map(t => `<span class="detail-tag">${t}</span>`).join("")}</div>
    <h2>专利摘要</h2>
    <p>${patent.abstract}</p>
    <h2>专利权人</h2>
    <p><strong>${patent.assignee}</strong></p>
    ${patent.fullAnalysis ? mdToHtml(patent.fullAnalysis) : '<p style="color:var(--text-muted)">AI深度分析报告生成中...</p>'}
  `);
}

/* ---- News Detail ---- */
function openNewsDetail(id) {
  const news = GP_DATA.news.find(n => n.id === id);
  if (!news) return;
  openDetail(`
    <div class="detail-meta">
      <div class="detail-meta-item">📰 ${news.source}</div>
      <div class="detail-meta-item">${news.country}</div>
      <div class="detail-meta-item">📅 ${news.date}</div>
      <div class="detail-meta-item" style="color:${news.impact==='high'?'#ff5252':'#ffd600'}">影响: ${news.impact==='high'?'高':'中'}</div>
    </div>
    <h1>${news.title}</h1>
    <div class="detail-tags">${news.tags.map(t => `<span class="detail-tag">${t}</span>`).join("")}</div>
    ${news.relatedCompanies ? '<p><strong>相关企业:</strong> ' + news.relatedCompanies.join(' · ') + '</p>' : ''}
    ${mdToHtml(news.content)}
  `);
}

/* ---- Tech Detail ---- */
function openTechDetail(id) {
  const tech = GP_DATA.techDetails[id];
  if (!tech) return;
  openDetail(`
    <div class="detail-meta">
      <div class="detail-meta-item">🔬 ${tech.category}</div>
      <div class="detail-meta-item" style="color:var(--primary)">评分: ${tech.score}/100</div>
    </div>
    <h1>${tech.name}</h1>
    <p style="font-size:1rem;color:var(--text-secondary);margin-bottom:1.5rem">${tech.summary}</p>
    <div class="detail-metrics">
      ${tech.keyMetrics.map(m => `<div class="detail-metric"><div class="detail-metric-value">${m.value}</div><div class="detail-metric-label">${m.label}</div></div>`).join("")}
    </div>
    <h2>深度分析</h2>
    ${mdToHtml(tech.analysis)}
    <h2>领先企业</h2>
    <div class="detail-tags">${tech.topCompanies.map(c => `<span class="detail-tag">${c}</span>`).join("")}</div>
  `);
}

/* ---- Company Detail ---- */
function openCompanyDetail(id) {
  const comp = GP_DATA.companyDetails[id];
  if (!comp) return;
  openDetail(`
    <div class="detail-meta">
      <div class="detail-meta-item">${comp.country}</div>
      <div class="detail-meta-item">📈 ${comp.stockCode}</div>
      <div class="detail-meta-item">🏭 创立 ${comp.founded}</div>
      <div class="detail-meta-item">💰 市值 ${comp.marketCap}</div>
    </div>
    <h1>${comp.name}</h1>
    <p style="font-size:1rem;color:var(--text-secondary);margin-bottom:1.5rem">${comp.description}</p>
    <div class="detail-metrics">
      ${comp.keyMetrics.map(m => `<div class="detail-metric"><div class="detail-metric-value">${m.value}</div><div class="detail-metric-label">${m.label}</div></div>`).join("")}
    </div>
    <h2>技术路线图</h2>
    ${mdToHtml(comp.techRoadmap)}
    <h2>财务概况</h2>
    <p>${comp.financials}</p>
    <h2>近期核心专利</h2>
    <div class="detail-tags">${comp.recentPatents.map(p => `<span class="detail-tag">📋 ${p}</span>`).join("")}</div>
    <h2>投资评级</h2>
    <p><strong style="color:var(--primary);font-size:1.1rem">${comp.investmentRating}</strong></p>
    <p>${comp.investmentNote}</p>
  `);
}

/* ---- Investment Detail ---- */
function openInvestDetail(id) {
  const inv = GP_DATA.investments.find(i => i.id === id);
  if (!inv) return;
  openDetail(`
    <div class="detail-meta">
      <div class="detail-meta-item" style="background:${inv.ratingColor}22;color:${inv.ratingColor};border-color:${inv.ratingColor}44">${inv.rating}</div>
      <div class="detail-meta-item">⏱️ ${inv.timeframe}</div>
    </div>
    <h1>💰 ${inv.title}</h1>
    <p style="font-size:1rem;color:var(--text-secondary);margin-bottom:1.5rem">${inv.summary}</p>
    <h2>投资机会</h2>
    ${inv.opportunities.map(o => `
      <div style="padding:1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:10px;margin-bottom:0.75rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
          <strong style="font-size:0.95rem">${o.name}</strong>
          <span style="font-size:0.75rem;color:${o.potential==='极高'?'#ff5252':o.potential==='高'?'#ffd600':'#00b0ff'}">潜力: ${o.potential} · 风险: ${o.risk}</span>
        </div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin:0">${o.desc}</p>
      </div>
    `).join("")}
    <h2>重点关注企业</h2>
    <div class="detail-tags">${inv.keyCompanies.map(c => `<span class="detail-tag">${c}</span>`).join("")}</div>
    <h2>详细分析</h2>
    ${mdToHtml(inv.analysis)}
  `);
}

/* ---- Report Detail (generic) ---- */
function openReportDetail(id) {
  const idx = parseInt(id.replace("report-",""));
  const report = GP_DATA.reports[idx];
  if (!report) return;
  openDetail(`
    <div class="detail-meta">
      <div class="detail-meta-item">📈 ${report.type}</div>
      <div class="detail-meta-item">📅 ${report.date}</div>
      <div class="detail-meta-item">📄 ${report.pages}页</div>
    </div>
    <h1>${report.emoji} ${report.title}</h1>
    <p style="font-size:1rem;color:var(--text-secondary)">${report.summary}</p>
    <div style="padding:2rem;text-align:center;color:var(--text-muted);margin-top:2rem;border:1px dashed var(--border);border-radius:12px">
      <div style="font-size:2rem;margin-bottom:0.5rem">📊</div>
      <p>完整报告正在由 AI 智能体生成中，请稍候...</p>
      <p style="font-size:0.8rem;margin-top:0.5rem">报告将包含 ${report.pages} 页深度分析内容</p>
    </div>
  `);
}


/* ============================================
   COUNTERS
   ============================================ */
function animateCounters() {
  [
    { el: "statPatents", target: 128439 },
    { el: "statPapers", target: 56782 },
    { el: "statNews", target: 12305 },
    { el: "statCountries", target: 47 },
    { el: "statAgents", target: 6 },
  ].forEach(({ el, target }) => {
    const element = document.getElementById(el);
    if (!element) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      element.textContent = current.toLocaleString();
    }, 25);
  });
}

function updateLiveTicker() {
  document.querySelectorAll(".agent-card .agent-stat-value").forEach(el => {
    const val = parseInt(el.textContent);
    if (!isNaN(val) && val < 1000) {
      el.textContent = val + Math.floor(Math.random() * 3) + 1;
    }
  });
}
