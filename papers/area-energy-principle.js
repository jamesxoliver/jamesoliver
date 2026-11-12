// Shape figure for The Area-Energy Principle (Corollaries 2 and 4).
// One fixed volume is drawn as an oblate spheroid, from a sphere to a thin
// sheet. Its surface is computed from the exact formula for a spheroid and
// shown as a multiple of the sphere's.
(function () {
  "use strict";
  var fig = document.getElementById("shape-figure");
  if (!fig) return;
  var canvas = fig.querySelector("canvas"), slider = fig.querySelector("input"), out = fig.querySelector("output");
  var ctx = canvas.getContext("2d");

  // Semi-axes a (wide) and c (thick) with a*a*c = 1, so the volume matches a unit sphere.
  function axes(aspect) { var c = Math.pow(aspect, -2 / 3); return { a: aspect * c, c: c }; }
  function surfaceOverSphere(aspect) {
    if (aspect < 1.0001) return 1;
    var s = axes(aspect), e = Math.sqrt(1 - (s.c * s.c) / (s.a * s.a));
    var S = 2 * Math.PI * s.a * s.a + Math.PI * (s.c * s.c / e) * Math.log((1 + e) / (1 - e));
    return S / (4 * Math.PI);
  }

  function draw() {
    var aspect = Math.pow(10, slider.value / 100), s = axes(aspect), ratio = surfaceOverSphere(aspect);
    var w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var col = (getComputedStyle(fig).color.match(/\d+(\.\d+)?/g) || [0, 0, 0]).slice(0, 3).join(",");
    // Scale so the widest sheet (aspect 1000, a = 10) spans the canvas.
    var unit = Math.min((w / 2 - 4) / 10, (h / 2 - 4) / 1);
    ctx.beginPath();
    ctx.ellipse(w / 2, h / 2, s.a * unit, Math.max(s.c * unit, 0.6), 0, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(" + col + ",0.14)"; ctx.fill();
    ctx.strokeStyle = "rgba(" + col + ",0.85)"; ctx.lineWidth = 1.25; ctx.stroke();
    var a = aspect < 10 ? aspect.toFixed(1) : Math.round(aspect);
    out.textContent = aspect < 1.0001
      ? "a sphere: the least surface this volume can have"
      : a + " times as wide as thick: " + ratio.toFixed(ratio < 10 ? 2 : 1) + " times the surface of the sphere";
  }
  slider.addEventListener("input", draw);
  window.addEventListener("resize", draw);
  draw();
})();
