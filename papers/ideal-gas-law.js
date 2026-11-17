// Gas figure for The Ideal Gas Law, shown first on the page.
// Two inputs: the motion of each particle and the number of particles.
// Temperature and pressure are not set. They are measured from the particles:
// temperature from their energy of movement, pressure from the momentum they
// deliver to the six walls. The particles move in three dimensions and are
// drawn flat, so the constants are the paper's: kT = 2/3 w and P = 2/3 n w.
(function () {
  "use strict";
  var fig = document.getElementById("gas-figure");
  if (!fig) return;
  var canvas = fig.querySelector("canvas"), ctx = canvas.getContext("2d");
  var speed = document.getElementById("gas-speed"), count = document.getElementById("gas-count");
  var oT = document.getElementById("gas-T"), oP = document.getElementById("gas-P"), oZ = document.getElementById("gas-Z");

  var W = 1.5, H = 1, D = 1, V = W * H * D, AREA = 2 * (W * H + W * D + H * D);
  var SIGMA = 0.32, N0 = 150;                       // speeds in box units per second
  var W0 = 1.5 * SIGMA * SIGMA;                     // mean energy of movement at the start, mass 1
  var KT0 = (2 / 3) * W0, P0 = (2 / 3) * (N0 / V) * W0;
  var parts = [], hits = [], last = null, Ps = P0, Ws = W0, f = 1;
  var VREF = 4 * SIGMA, PMAX = 9 * P0, HISTS = [];
  for (var hb = 0; hb < 36; hb++) HISTS.push(0);
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

  function gauss() { return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random()); }
  function spawn() {
    return { x: Math.random() * W, y: Math.random() * H, z: Math.random() * D,
             vx: gauss() * SIGMA * f, vy: gauss() * SIGMA * f, vz: gauss() * SIGMA * f };
  }
  function meanW() {
    var s = 0;
    for (var i = 0; i < parts.length; i++) { var p = parts[i]; s += p.vx * p.vx + p.vy * p.vy + p.vz * p.vz; }
    return s / (2 * parts.length);
  }
  // The motion slider runs geometrically from a third of the starting energy to three times it.
  function setMotion() {
    var target = W0 * Math.pow(9, speed.value / 100 - 0.5), k = Math.sqrt(target / meanW());
    f *= k;
    for (var i = 0; i < parts.length; i++) { parts[i].vx *= k; parts[i].vy *= k; parts[i].vz *= k; }
  }
  // The paper assumes no preferred direction. Particles that never collide keep whatever
  // imbalance a finite random sample starts with, so the sample is made exactly even:
  // the energy of movement along each of the three directions is set equal.
  function isotropize() {
    var sx = 0, sy = 0, sz = 0, i;
    for (i = 0; i < parts.length; i++) { sx += parts[i].vx * parts[i].vx; sy += parts[i].vy * parts[i].vy; sz += parts[i].vz * parts[i].vz; }
    var m = (sx + sy + sz) / 3, kx = Math.sqrt(m / sx), ky = Math.sqrt(m / sy), kz = Math.sqrt(m / sz);
    for (i = 0; i < parts.length; i++) { parts[i].vx *= kx; parts[i].vy *= ky; parts[i].vz *= kz; }
  }
  function setCount() {
    var n = +count.value;
    while (parts.length < n) parts.push(spawn());
    parts.length = n;
    isotropize();
  }

  function step(dt) {
    var imp = 0;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      if (p.x < 0) { p.x = -p.x; p.vx = -p.vx; imp += 2 * p.vx; hits.push([0, p.y, 2 * p.vx, 0]); }
      else if (p.x > W) { p.x = 2 * W - p.x; p.vx = -p.vx; imp -= 2 * p.vx; hits.push([1, p.y, -2 * p.vx, 0]); }
      if (p.y < 0) { p.y = -p.y; p.vy = -p.vy; imp += 2 * p.vy; hits.push([2, p.x, 2 * p.vy, 0]); }
      else if (p.y > H) { p.y = 2 * H - p.y; p.vy = -p.vy; imp -= 2 * p.vy; hits.push([3, p.x, -2 * p.vy, 0]); }
      if (p.z < 0) { p.z = -p.z; p.vz = -p.vz; imp += 2 * p.vz; }
      else if (p.z > D) { p.z = 2 * D - p.z; p.vz = -p.vz; imp -= 2 * p.vz; }
    }
    if (hits.length > 800) hits.splice(0, hits.length - 800);
    return imp / (AREA * dt);
  }

  function colors() {
    var d = dark && dark.matches;
    return { t: d ? "#ff8a4c" : "#d65a1f", p: d ? "#b694ff" : "#7041c9", v: d ? "#7ea2ff" : "#2f62cf" };
  }

  var PAD = 26, GAUGE = 40, HIST = 74, GAP = 30;
  function draw(dt) {
    var w = canvas.clientWidth, dpr = window.devicePixelRatio || 1;
    var fg = getComputedStyle(fig).color, c = colors(), fam = getComputedStyle(fig).fontFamily;
    var bw = w - 2 * PAD - GAUGE - 22, s = bw / W, bh = H * s;
    var h = PAD + bh + GAP + HIST + 22;
    canvas.style.height = h + "px";
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var x0 = PAD + 22;
    var X = function (x) { return x0 + x * s; }, Y = function (y) { return PAD + (H - y) * s; };
    var hue = function (v) { return "hsl(" + (220 - 210 * Math.min(1, v / VREF)) + " 72% 55%)"; };

    ctx.strokeStyle = fg; ctx.lineWidth = 1.5;
    ctx.strokeRect(X(0), Y(H), bw, bh);

    // particles: colour by speed, nearer ones larger
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      ctx.fillStyle = hue(Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz));
      ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), 1.4 + 1.6 * p.z, 0, 2 * Math.PI); ctx.fill();
    }

    // P is measured at the wall: every hit marks the wall, the length of the mark is the kick
    ctx.strokeStyle = c.p; ctx.lineWidth = 2;
    var jref = 2 * SIGMA;
    for (var k = hits.length - 1; k >= 0; k--) {
      var q = hits[k]; q[3] += dt;
      if (q[3] > 0.2) { hits.splice(k, 1); continue; }
      ctx.globalAlpha = 1 - q[3] / 0.2;
      var L = Math.min(14, 5 * q[2] / jref);
      ctx.beginPath();
      if (q[0] === 0) { ctx.moveTo(X(0), Y(q[1])); ctx.lineTo(X(0) - L, Y(q[1])); }
      else if (q[0] === 1) { ctx.moveTo(X(W), Y(q[1])); ctx.lineTo(X(W) + L, Y(q[1])); }
      else if (q[0] === 2) { ctx.moveTo(X(q[1]), Y(0)); ctx.lineTo(X(q[1]), Y(0) + L); }
      else { ctx.moveTo(X(q[1]), Y(H)); ctx.lineTo(X(q[1]), Y(H) - L); }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // the pressure gauge, filled by the push on the walls
    var gx = X(W) + 22, gw = 12, frac = Math.min(1, Ps / PMAX);
    ctx.strokeStyle = c.p; ctx.lineWidth = 1.5;
    ctx.strokeRect(gx, Y(H), gw, bh);
    ctx.fillStyle = c.p;
    ctx.fillRect(gx, Y(0) - frac * bh, gw, frac * bh);
    ctx.textAlign = "center"; ctx.textBaseline = "bottom";
    ctx.font = "italic 18px " + fam;
    ctx.fillText("P", gx + gw / 2, Y(H) - 6);

    // V: the fixed box
    var vx = PAD - 6;
    ctx.strokeStyle = c.v; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(vx + 4, Y(0)); ctx.lineTo(vx, Y(0)); ctx.lineTo(vx, Y(H)); ctx.lineTo(vx + 4, Y(H)); ctx.stroke();
    ctx.clearRect(vx - 8, Y(H / 2) - 11, 16, 22);
    ctx.fillStyle = c.v; ctx.textBaseline = "middle";
    ctx.font = "italic 17px " + fam;
    ctx.fillText("V", vx, Y(H / 2));

    // T is measured from the particles themselves: the share of them at each speed,
    // which does not change when particles are added or removed
    var top = Y(0) + GAP, base = top + HIST, bins = 36, vmax = 1.6 * VREF, cnt = [], peak = 0;
    for (i = 0; i < bins; i++) cnt[i] = 0;
    var sum2 = 0;
    for (i = 0; i < parts.length; i++) {
      var v2 = parts[i].vx * parts[i].vx + parts[i].vy * parts[i].vy + parts[i].vz * parts[i].vz;
      sum2 += v2;
      var b = Math.min(bins - 1, Math.floor(Math.sqrt(v2) / vmax * bins));
      cnt[b]++;
    }
    for (i = 0; i < bins; i++) { cnt[i] /= parts.length; HISTS[i] += (cnt[i] - HISTS[i]) * Math.min(1, dt / 0.6 || 1); peak = Math.max(peak, HISTS[i]); }
    var cw = bw / bins, scaleY = HIST / Math.max(peak, 0.12);
    for (i = 0; i < bins; i++) {
      ctx.fillStyle = hue((i + 0.5) / bins * vmax);
      ctx.fillRect(X(0) + i * cw + 0.5, base - HISTS[i] * scaleY, cw - 1, HISTS[i] * scaleY);
    }
    ctx.strokeStyle = fg; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(0), base + 0.5); ctx.lineTo(X(W), base + 0.5); ctx.stroke();
    // the line sits at the speed that carries the average energy of movement
    var vrms = Math.sqrt(sum2 / parts.length), lx = X(0) + Math.min(1, vrms / vmax) * bw;
    ctx.strokeStyle = c.t; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(lx, top - 4); ctx.lineTo(lx, base); ctx.stroke();
    ctx.fillStyle = c.t; ctx.textBaseline = "bottom"; ctx.textAlign = "center";
    ctx.font = "italic 18px " + fam;
    ctx.fillText("T", lx, top - 6);
  }

  var accP = 0, accW = 0, accT = 0;
  function restart() { accP = 0; accW = 0; accT = 0; }
  function report() {
    oT.textContent = ((2 / 3) * Ws / KT0).toFixed(2);
    oP.textContent = (Ps / P0).toFixed(2);
    // the check averages everything measured since the inputs last changed, so it settles toward 1
    if (accT > 0.5) oZ.textContent = (accP * V / (parts.length * (2 / 3) * accW)).toFixed(2);
  }

  var since = 0;
  function tick(now) {
    if (last !== null) {
      var dt = Math.max(0, Math.min((now - last) / 1000, 0.05));
      if (dt > 0) {
        var P = 0, sub = 4;
        for (var i = 0; i < sub; i++) P += step(dt / sub) / sub;
        var k = Math.min(1, dt / 1.2);
        Ps += (P - Ps) * k;
        var wNow = meanW();
        Ws += (wNow - Ws) * k;
        accP += P * dt; accW += wNow * dt; accT += dt;
        draw(dt);
        since += dt;
        if (since > 0.25) { report(); since = 0; }
      }
    }
    last = now;
    requestAnimationFrame(tick);
  }

  // With motion switched off, run the particles unseen for a few seconds and report what they measured.
  function settle() {
    var P = 0, n = 2000, dt = 0.002;
    for (var i = 0; i < n; i++) P += step(dt) / n;
    hits = []; Ps = P; Ws = meanW(); accP = P; accW = Ws; accT = 1; report(); draw(0);
  }
  speed.addEventListener("input", function () { setMotion(); restart(); if (still) settle(); });
  count.addEventListener("input", function () { setCount(); restart(); if (still) settle(); });
  window.addEventListener("resize", function () { draw(0); });
  setCount();
  (function () { var k = Math.sqrt(W0 / meanW()); for (var i = 0; i < parts.length; i++) { parts[i].vx *= k; parts[i].vy *= k; parts[i].vz *= k; } })();
  Ws = meanW(); draw(0); report();
  if (still) settle(); else requestAnimationFrame(tick);
})();
