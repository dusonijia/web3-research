/* ============================================
   GreenPulse - Leaflet World Map with Dark Theme
   ============================================ */

const GreenPulseMap = (() => {
  let map = null;
  let markers = [];
  let allEvents = [];

  const EVENT_COLORS = {
    patent: "#ffd600",
    paper: "#00b0ff",
    news: "#00c853",
    report: "#ab47bc",
  };

  const EVENT_LABELS = {
    patent: "专利",
    paper: "论文",
    news: "新闻",
    report: "报告",
  };

  function init(containerId, events) {
    allEvents = events;
    const el = document.getElementById(containerId);
    if (!el) return;

    map = L.map(containerId, {
      center: [30, 20],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      worldCopyJump: true,
    });

    L.control.zoom({ position: "bottomleft" }).addTo(map);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd", maxZoom: 19 }
    ).addTo(map);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd", maxZoom: 19, pane: "overlayPane" }
    ).addTo(map);

    addEvents(events);
  }

  function createPulseIcon(color, size) {
    return L.divIcon({
      className: "pulse-marker",
      html: `<span class="pulse-ring" style="border-color:${color}"></span><span class="pulse-dot" style="background:${color};width:${size}px;height:${size}px"></span>`,
      iconSize: [size * 3, size * 3],
      iconAnchor: [size * 1.5, size * 1.5],
    });
  }

  function addEvents(events) {
    clearMarkers();
    events.forEach((evt) => {
      const color = EVENT_COLORS[evt.type] || "#00c853";
      const size = 6 + (evt.intensity / 100) * 8;
      const icon = createPulseIcon(color, size);

      const marker = L.marker([evt.lat, evt.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;min-width:200px">` +
            `<div style="font-weight:700;font-size:13px;margin-bottom:6px;color:#e8eaed">${evt.label}</div>` +
            `<div style="display:flex;gap:8px;align-items:center;margin-bottom:4px">` +
            `<span style="display:inline-block;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:600;background:${color}22;color:${color}">${EVENT_LABELS[evt.type]}</span>` +
            `<span style="font-size:11px;color:#9ca3af">影响力 ${evt.intensity}%</span>` +
            `</div>` +
            `</div>`,
          {
            className: "gp-popup",
            closeButton: false,
            offset: [0, -6],
          }
        );

      marker._gpType = evt.type;
      markers.push(marker);
    });
  }

  function filter(containerId, type) {
    if (!map) return;
    markers.forEach((m) => {
      const el = m.getElement();
      if (!el) return;
      if (type === "all") {
        el.style.display = "";
        el.style.opacity = "1";
      } else if (type === "battery") {
        el.style.display = "";
        el.style.opacity =
          m._gpType === "patent" || m._gpType === "paper" ? "1" : "0.25";
      } else {
        el.style.display = m._gpType === type ? "" : "none";
      }
    });
  }

  function clearMarkers() {
    markers.forEach((m) => map.removeLayer(m));
    markers = [];
  }

  return { init, filter };
})();
