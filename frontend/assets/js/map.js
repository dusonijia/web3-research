/* ============================================
   GreenPulse - World Map SVG Visualization
   ============================================ */

const GreenPulseMap = (() => {

  const WORLD_PATHS = [
    { id: "NA", name: "North America", d: "M180,120 L200,95 L230,90 L280,85 L320,95 L350,110 L370,130 L360,160 L340,180 L310,200 L280,210 L260,230 L240,250 L220,260 L190,250 L170,230 L155,200 L150,170 L160,140 Z" },
    { id: "SA", name: "South America", d: "M260,270 L280,260 L310,270 L330,290 L340,320 L335,360 L320,400 L300,430 L280,450 L260,440 L250,410 L240,380 L235,350 L230,320 L235,290 Z" },
    { id: "EU", name: "Europe", d: "M500,90 L530,85 L560,90 L590,100 L610,110 L620,130 L610,150 L590,160 L560,165 L540,170 L520,165 L500,155 L490,140 L485,120 L490,100 Z" },
    { id: "AF", name: "Africa", d: "M520,180 L550,175 L580,180 L610,195 L620,220 L625,260 L620,300 L605,340 L580,370 L555,385 L530,375 L510,350 L500,320 L495,280 L500,240 L505,210 Z" },
    { id: "AS", name: "Asia", d: "M630,80 L680,70 L740,75 L800,80 L860,90 L920,100 L960,120 L970,150 L960,180 L930,200 L890,210 L840,220 L790,215 L740,200 L700,190 L670,175 L650,155 L640,130 L635,105 Z" },
    { id: "CN", name: "China", d: "M800,120 L840,115 L880,120 L910,135 L920,155 L910,175 L885,190 L855,195 L825,190 L800,180 L785,160 L790,140 Z" },
    { id: "OC", name: "Oceania", d: "M880,310 L920,300 L960,305 L990,320 L1000,345 L990,370 L960,380 L930,375 L900,360 L885,340 L880,320 Z" },
    { id: "ME", name: "Middle East", d: "M620,160 L650,155 L680,160 L700,175 L695,195 L675,205 L650,200 L630,190 L620,175 Z" },
  ];

  function latLngToXY(lat, lng, width = 1200, height = 600) {
    const x = (lng + 180) * (width / 360);
    const y = (90 - lat) * (height / 180);
    return { x, y };
  }

  function getEventColor(type) {
    const colors = { patent: "#ffd600", paper: "#00b0ff", news: "#00c853", report: "#ab47bc" };
    return colors[type] || "#00c853";
  }

  function init(svgId, events) {
    const svg = document.getElementById(svgId);
    if (!svg) return;

    svg.innerHTML = "";

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    const gridPattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    gridPattern.setAttribute("id", "grid");
    gridPattern.setAttribute("width", "40");
    gridPattern.setAttribute("height", "40");
    gridPattern.setAttribute("patternUnits", "userSpaceOnUse");
    const gridLine1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    gridLine1.setAttribute("d", "M 40 0 L 0 0 0 40");
    gridLine1.setAttribute("fill", "none");
    gridLine1.setAttribute("stroke", "rgba(30,41,59,0.4)");
    gridLine1.setAttribute("stroke-width", "0.5");
    gridPattern.appendChild(gridLine1);
    defs.appendChild(gridPattern);

    ["patent", "paper", "news", "report"].forEach(type => {
      const glow = document.createElementNS("http://www.w3.org/2000/svg", "filter");
      glow.setAttribute("id", `glow-${type}`);
      glow.setAttribute("x", "-50%"); glow.setAttribute("y", "-50%");
      glow.setAttribute("width", "200%"); glow.setAttribute("height", "200%");
      const blur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
      blur.setAttribute("stdDeviation", "4");
      blur.setAttribute("result", "coloredBlur");
      const merge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
      const mn1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
      mn1.setAttribute("in", "coloredBlur");
      const mn2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
      mn2.setAttribute("in", "SourceGraphic");
      merge.appendChild(mn1); merge.appendChild(mn2);
      glow.appendChild(blur); glow.appendChild(merge);
      defs.appendChild(glow);
    });

    svg.appendChild(defs);

    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("width", "1200"); bg.setAttribute("height", "600");
    bg.setAttribute("fill", "url(#grid)");
    svg.appendChild(bg);

    const regionsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    regionsGroup.setAttribute("class", "regions");

    WORLD_PATHS.forEach(region => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", region.d);
      path.setAttribute("fill", "rgba(30, 41, 59, 0.5)");
      path.setAttribute("stroke", "rgba(45, 58, 79, 0.6)");
      path.setAttribute("stroke-width", "1");
      path.setAttribute("data-region", region.id);

      path.addEventListener("mouseenter", () => {
        path.setAttribute("fill", "rgba(0, 200, 83, 0.12)");
        path.setAttribute("stroke", "rgba(0, 200, 83, 0.3)");
      });
      path.addEventListener("mouseleave", () => {
        path.setAttribute("fill", "rgba(30, 41, 59, 0.5)");
        path.setAttribute("stroke", "rgba(45, 58, 79, 0.6)");
      });

      regionsGroup.appendChild(path);
    });

    svg.appendChild(regionsGroup);

    const connectionsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    connectionsGroup.setAttribute("class", "connections");
    connectionsGroup.setAttribute("opacity", "0.15");

    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        if (events[i].type === events[j].type && Math.random() > 0.6) {
          const p1 = latLngToXY(events[i].lat, events[i].lng);
          const p2 = latLngToXY(events[j].lat, events[j].lng);
          const midX = (p1.x + p2.x) / 2;
          const midY = Math.min(p1.y, p2.y) - 30;
          const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
          line.setAttribute("d", `M${p1.x},${p1.y} Q${midX},${midY} ${p2.x},${p2.y}`);
          line.setAttribute("fill", "none");
          line.setAttribute("stroke", getEventColor(events[i].type));
          line.setAttribute("stroke-width", "0.5");
          line.setAttribute("stroke-dasharray", "4,4");
          connectionsGroup.appendChild(line);
        }
      }
    }
    svg.appendChild(connectionsGroup);

    const eventsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    eventsGroup.setAttribute("class", "events");

    events.forEach((evt, idx) => {
      const { x, y } = latLngToXY(evt.lat, evt.lng);
      const color = getEventColor(evt.type);
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", `map-event event-${evt.type}`);
      g.setAttribute("data-type", evt.type);
      g.style.cursor = "pointer";

      const pulseCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pulseCircle.setAttribute("cx", x); pulseCircle.setAttribute("cy", y);
      pulseCircle.setAttribute("r", "12");
      pulseCircle.setAttribute("fill", "none");
      pulseCircle.setAttribute("stroke", color);
      pulseCircle.setAttribute("stroke-width", "1");
      pulseCircle.setAttribute("opacity", "0.4");
      const animR = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animR.setAttribute("attributeName", "r");
      animR.setAttribute("from", "6"); animR.setAttribute("to", "20");
      animR.setAttribute("dur", `${2 + (idx % 3) * 0.5}s`);
      animR.setAttribute("repeatCount", "indefinite");
      const animO = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animO.setAttribute("attributeName", "opacity");
      animO.setAttribute("from", "0.5"); animO.setAttribute("to", "0");
      animO.setAttribute("dur", `${2 + (idx % 3) * 0.5}s`);
      animO.setAttribute("repeatCount", "indefinite");
      pulseCircle.appendChild(animR); pulseCircle.appendChild(animO);
      g.appendChild(pulseCircle);

      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", x); dot.setAttribute("cy", y);
      const radius = 3 + (evt.intensity / 100) * 4;
      dot.setAttribute("r", radius);
      dot.setAttribute("fill", color);
      dot.setAttribute("filter", `url(#glow-${evt.type})`);
      dot.setAttribute("opacity", "0.9");
      g.appendChild(dot);

      g.addEventListener("mouseenter", (e) => {
        const tooltip = document.getElementById("mapTooltip");
        tooltip.innerHTML = `<div style="font-weight:600;margin-bottom:4px;">${evt.label}</div><div style="font-size:0.7rem;color:#9ca3af;">类型: ${evt.type === 'patent' ? '专利' : evt.type === 'paper' ? '论文' : evt.type === 'news' ? '新闻' : '报告'} · 影响力: ${evt.intensity}%</div>`;
        tooltip.style.display = "block";
        const rect = svg.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left + 10) + "px";
        tooltip.style.top = (e.clientY - rect.top - 10) + "px";
        dot.setAttribute("r", radius * 1.5);
      });
      g.addEventListener("mouseleave", () => {
        document.getElementById("mapTooltip").style.display = "none";
        dot.setAttribute("r", radius);
      });
      g.addEventListener("mousemove", (e) => {
        const tooltip = document.getElementById("mapTooltip");
        const rect = svg.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left + 10) + "px";
        tooltip.style.top = (e.clientY - rect.top - 10) + "px";
      });

      eventsGroup.appendChild(g);
    });

    svg.appendChild(eventsGroup);
  }

  function filter(svgId, type) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    const events = svg.querySelectorAll(".map-event");
    events.forEach(g => {
      const t = g.getAttribute("data-type");
      if (type === "all" || type === "battery") {
        g.style.display = "";
        g.style.opacity = type === "battery" ? (t === "patent" || t === "paper" ? "1" : "0.3") : "1";
      } else {
        g.style.display = t === type ? "" : "none";
      }
    });
  }

  return { init, filter };
})();
