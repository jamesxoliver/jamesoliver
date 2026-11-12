// Fold figure for The Area-Energy Principle (Corollary 3).
// A body m times the size at which its smooth outline suffices needs an
// outline m times as long. The outline is folded inward until its measured
// length reaches that multiple, and the measured multiple is what is shown.
(function () {
  "use strict";
  var fig = document.getElementById("fold-figure");
  if (!fig) return;
  var canvas = fig.querySelector("canvas"), slider = fig.querySelector("input"), out = fig.querySelector("output");
  var ctx = canvas.getContext("2d"), STEPS = 7200;

  // Outline r(t) = 1 - d * (1 - cos(n t)) / 2, with n folds of depth d.
  function points(n, d) {
    var pts = [];
    for (var i = 0; i <= STEPS; i++) {
      var t = 2 * Math.PI * i / STEPS, r = 1 - d * (1 - Math.cos(n * t)) / 2;
      pts.push([r * Math.cos(t), r * Math.sin(t)]);
    }
    return pts;
  }
  function length(pts) {
    var L = 0;
    for (var i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return L;
  }
  function solve(m) {
    if (m <= 1) return { n: 0, d: 0, pts: points(0, 0) };
    var target = m * 2 * Math.PI, n = 3;
    while (length(points(n, 0.7)) < target) n++;
    var lo = 0, hi = 0.7;
    for (var k = 0; k < 40; k++) {
      var mid = (lo + hi) / 2;
      if (length(points(n, mid)) < target) lo = mid; else hi = mid;
    }
    return { n: n, d: hi, pts: points(n, hi) };
  }

  function draw() {
    var m = +slider.value, shape = solve(m), ratio = length(shape.pts) / (2 * Math.PI);
    var w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var c = (getComputedStyle(fig).color.match(/\d+(\.\d+)?/g) || [0, 0, 0]).slice(0, 3).join(",");
    var R = Math.min(w, h) * 0.44, ox = w / 2, oy = h / 2;
    ctx.beginPath(); ctx.arc(ox, oy, R, 0, 2 * Math.PI);
    ctx.setLineDash([4, 5]); ctx.strokeStyle = "rgba(" + c + ",0.35)"; ctx.lineWidth = 1; ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    shape.pts.forEach(function (p, i) {
      var x = ox + p[0] * R, y = oy - p[1] * R;
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(" + c + ",0.10)"; ctx.fill();
    ctx.strokeStyle = "rgba(" + c + ",0.85)"; ctx.lineWidth = 1.25; ctx.lineJoin = "round"; ctx.stroke();
    out.textContent = m === 1
      ? "size 1: the smooth outline is enough"
      : "size " + m + ": the body needs " + m + " times its smooth outline and the folded outline drawn measures " +
        ratio.toFixed(2) + " times the circle, in " + shape.n + " folds";
  }
  slider.addEventListener("input", draw);
  window.addEventListener("resize", draw);
  draw();
})();
