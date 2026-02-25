/* ============================================
   GreenPulse - Main Application Controller
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ---- Header scroll effect ----
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });

  // ---- Smooth scroll for nav ----
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ---- Active nav on scroll ----
  const sections = document.querySelectorAll("section[id]");
  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove("active"));
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (link) link.classList.add("active");
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observerNav.observe(s));

  // ---- Animate on scroll ----
  const observerAnim = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observerAnim.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // ---- Last update time ----
  const now = new Date();
  document.getElementById("lastUpdate").textContent =
    `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // ---- Render World Map ----
  GreenPulseMap.init("worldMap", GP_DATA.mapEvents);

  // ---- Map filter buttons ----
  document.querySelectorAll(".map-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".map-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      GreenPulseMap.filter("worldMap", btn.dataset.filter);
    });
  });

  // ---- Render Daily Feed ----
  renderDailyFeed();

  // ---- Render Rankings ----
  renderRankings("battery");

  // ---- Rankings tab ----
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

  // ---- Render Papers ----
  renderPapers();

  // ---- Render Patents ----
  renderPatents();

  // ---- Render Reports ----
  renderReports();

  // ---- Render Agent Status ----
  renderAgents();

  // ---- Counter Animation ----
  animateCounters();

  // ---- Live ticker simulation ----
  setInterval(updateLiveTicker, 30000);
});


function renderDailyFeed() {
  const container = document.getElementById("dailyFeed");
  container.innerHTML = GP_DATA.dailyFeed.map(item => `
    <div class="feed-card animate-in">
      <div class="feed-meta">
        <span class="feed-tag ${item.type}">${item.type === 'patent' ? '专利' : item.type === 'paper' ? '论文' : item.type === 'news' ? '新闻' : '报告'}</span>
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
        ${(data.technology || data.companies || []).map((item, i) => rankingItemHTML(item, i)).join("")}
      </div>
    </div>
    <div class="ranking-card">
      <div class="ranking-header">
        <div class="ranking-category">🏢 企业排名</div>
        <span class="ranking-period">本周</span>
      </div>
      <div class="ranking-list">
        ${(data.companies || data.technology || []).map((item, i) => rankingItemHTML(item, i)).join("")}
      </div>
    </div>
  `;
}

function rankingItemHTML(item, i) {
  const rankClass = i < 3 ? `rank-${i+1}` : "rank-other";
  return `
    <div class="ranking-item">
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


function renderPapers() {
  const container = document.getElementById("papersGrid");
  container.innerHTML = GP_DATA.papers.map(paper => `
    <div class="paper-card animate-in">
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


function renderPatents() {
  const container = document.getElementById("patentsGrid");
  container.innerHTML = GP_DATA.patents.map(patent => `
    <div class="patent-card animate-in">
      <div class="patent-header">
        <span class="patent-id">${patent.id}</span>
        <span class="patent-status status-${patent.status}">${patent.status === 'granted' ? '已授权' : patent.status === 'pending' ? '审查中' : '已公开'}</span>
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


function renderReports() {
  const container = document.getElementById("reportsGrid");
  container.innerHTML = GP_DATA.reports.map(report => `
    <div class="report-card animate-in">
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


function renderAgents() {
  const container = document.getElementById("agentGrid");
  container.innerHTML = GP_DATA.agents.map(agent => `
    <div class="agent-card">
      <div class="agent-header">
        <div class="agent-name">
          <span class="agent-icon">${agent.icon}</span>
          ${agent.name}
        </div>
        <div class="agent-status-indicator ${agent.status}">
          <span class="status-dot"></span>
          ${agent.status === 'running' ? '运行中' : agent.status === 'idle' ? '空闲' : '异常'}
        </div>
      </div>
      <div class="agent-stats">
        <div class="agent-stat">
          <div class="agent-stat-value">${agent.stats.today}</div>
          <div class="agent-stat-label">今日处理</div>
        </div>
        <div class="agent-stat">
          <div class="agent-stat-value">${agent.stats.total}</div>
          <div class="agent-stat-label">累计处理</div>
        </div>
      </div>
      <div class="agent-activity">
        最近活动: <span class="last-action">${agent.lastAction}</span>
      </div>
    </div>
  `).join("");
}


function animateCounters() {
  const counters = [
    { el: "statPatents", target: 128439 },
    { el: "statPapers", target: 56782 },
    { el: "statNews", target: 12305 },
    { el: "statCountries", target: 47 },
    { el: "statAgents", target: 6 },
  ];

  counters.forEach(({ el, target }) => {
    const element = document.getElementById(el);
    if (!element) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      element.textContent = current.toLocaleString();
    }, 25);
  });
}


function updateLiveTicker() {
  const agents = document.querySelectorAll(".agent-card .agent-stat-value");
  agents.forEach(el => {
    const val = parseInt(el.textContent);
    if (!isNaN(val) && val < 1000) {
      el.textContent = val + Math.floor(Math.random() * 3) + 1;
    }
  });
}
