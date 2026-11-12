// Gas figure for The Ideal Gas Law (Theorem 1).
// Point particles that do not interact bounce in a box. The pressure is
// counted from the momentum they deliver to the walls and shown beside the
// value Theorem 1 requires from their energy. In two dimensions that value
// is the energy divided by the area.
(function () {
  "use strict";
  var fig = document.getElementById("gas-figure");
  if (!fig) return;
  var canvas = fig.querySelector("canvas"), speed = document.getElementById("gas-speed"),
      count = document.getElementById("gas-count"), out = fig.querySelector("output");
  var ctx = canvas.getContext("2d");
  var W = 1.5, H = 1, SIGMA = 0.32, WINDOW = 4;     // box in its own units, speeds in units per second
  var parts = [], impulses = [], elapsed = 0, last = null;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function gauss() { return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random()); }
  function resize(n) {
    while (parts.length < n) parts.push({ x: Math.random() * W, y: Math.random() * H, vx: gauss() * SIGMA, vy: gauss() * SIGMA });
    parts.length = n;
    // Hold the mean energy per particle fixed, so changing the count changes nothing else.
    var mean = 0;
    for (var i = 0; i < n; i++) mean += 0.5 * (parts[i].vx * parts[i].vx + parts[i].vy * parts[i].vy);
    var k = Math.sqrt(SIGMA * SIGMA / (mean / n));
    for (i = 0; i < n; i++) { parts[i].vx *= k; parts[i].vy *= k; }
  }
  function reset() { impulses = []; elapsed = 0; }
  function factor() { return speed.value / 100; }

  function step(dt) {
    var f = factor(), hit = 0;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.x += p.vx * f * dt; p.y += p.vy * f * dt;
      if (p.x < 0) { p.x = -p.x; p.vx = -p.vx; hit += 2 * Math.abs(p.vx) * f; }
      else if (p.x > W) { p.x = 2 * W - p.x; p.vx = -p.vx; hit += 2 * Math.abs(p.vx) * f; }
      if (p.y < 0) { p.y = -p.y; p.vy = -p.vy; hit += 2 * Math.abs(p.vy) * f; }
      else if (p.y > H) { p.y = 2 * H - p.y; p.vy = -p.vy; hit += 2 * Math.abs(p.vy) * f; }
    }
    impulses.push([dt, hit]); elapsed += dt;
    while (impulses.length > 1 && elapsed - impulses[0][0] > WINDOW) elapsed -= impulses.shift()[0];
  }
  function fromEnergy() {
    var f = factor(), E = 0;
    for (var i = 0; i < parts.length; i++) E += 0.5 * (parts[i].vx * parts[i].vx + parts[i].vy * parts[i].vy) * f * f;
    return E / (W * H);
  }
  function fromImpacts() {
    var total = 0;
    for (var i = 0; i < impulses.length; i++) total += impulses[i][1];
    return elapsed > 0 ? total / (elapsed * 2 * (W + H)) : 0;
  }
  function draw() {
    var w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var c = (getComputedStyle(fig).color.match(/\d+(\.\d+)?/g) || [0, 0, 0]).slice(0, 3).join(",");
    ctx.fillStyle = "rgba(" + c + ",0.8)";
    for (var i = 0; i < parts.length; i++) {
      ctx.beginPath(); ctx.arc(parts[i].x / W * w, parts[i].y / H * h, 2, 0, 2 * Math.PI); ctx.fill();
    }
  }
  function report() {
    var e = fromEnergy(), t = e * W * H / parts.length;
    var tail = "crowding times motion: " + e.toFixed(1) + " · thermometer, the motion alone: " + t.toFixed(3);
    if (still) { out.textContent = tail + " (motion is switched off in this browser, so impacts are not counted)"; return; }
    var m = fromImpacts();
    out.textContent = elapsed < 1
      ? "counting impacts"
      : "gauge, counted from impacts: " + m.toFixed(1) + " · " + tail;
  }
  var sinceReport = 0;
  function tick(now) {
    if (last !== null) {
      var dt = Math.min((now - last) / 1000, 0.05);
      step(dt); draw();
      sinceReport += dt;
      if (sinceReport > 0.5) { report(); sinceReport = 0; }
    }
    last = now;
    requestAnimationFrame(tick);
  }
  speed.addEventListener("input", function () { reset(); report(); });
  count.addEventListener("input", function () { resize(+count.value); reset(); report(); if (still) draw(); });
  window.addEventListener("resize", draw);
  resize(+count.value); draw(); report();
  if (!still) requestAnimationFrame(tick);
})();
