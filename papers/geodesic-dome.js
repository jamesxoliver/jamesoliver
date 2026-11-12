// Geodesic dome figure for The Buildable Sphere.
// Builds the frequency-n geodesic polyhedron from a regular icosahedron,
// computes its area and volume, and draws it. Every number shown is
// computed from the polyhedron as drawn.
(function () {
  "use strict";

  function norm(p) { var l = Math.hypot(p[0], p[1], p[2]); return [p[0] / l, p[1] / l, p[2] / l]; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function len(a) { return Math.hypot(a[0], a[1], a[2]); }

  var g = (1 + Math.sqrt(5)) / 2;
  var ICO_V = [[-1, g, 0], [1, g, 0], [-1, -g, 0], [1, -g, 0], [0, -1, g], [0, 1, g],
               [0, -1, -g], [0, 1, -g], [g, 0, -1], [g, 0, 1], [-g, 0, -1], [-g, 0, 1]].map(norm);
  var ICO_F = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4],
               [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8],
               [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];

  function build(n) {
    var verts = [], index = {}, tris = [];
    function vid(p) {
      var q = norm(p), k = q.map(function (x) { return Math.round(x * 1e6); }).join(",");
      if (!(k in index)) { index[k] = verts.length; verts.push(q); }
      return index[k];
    }
    ICO_F.forEach(function (f) {
      var A = ICO_V[f[0]], B = ICO_V[f[1]], C = ICO_V[f[2]], grid = [];
      for (var i = 0; i <= n; i++) {
        grid[i] = [];
        for (var j = 0; i + j <= n; j++) {
          grid[i][j] = vid([A[0] + (B[0] - A[0]) * i / n + (C[0] - A[0]) * j / n,
                            A[1] + (B[1] - A[1]) * i / n + (C[1] - A[1]) * j / n,
                            A[2] + (B[2] - A[2]) * i / n + (C[2] - A[2]) * j / n]);
        }
      }
      for (i = 0; i < n; i++) {
        for (j = 0; i + j < n; j++) {
          tris.push([grid[i][j], grid[i + 1][j], grid[i][j + 1]]);
          if (i + j < n - 1) tris.push([grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]]);
        }
      }
    });
    var S = 0, V = 0, panels = {}, struts = {};
    tris.forEach(function (t) {
      var a = verts[t[0]], b = verts[t[1]], c = verts[t[2]];
      S += len(cross(sub(b, a), sub(c, a))) / 2;
      V += Math.abs(dot(a, cross(b, c))) / 6;
      var e = [len(sub(a, b)), len(sub(b, c)), len(sub(c, a))].sort();
      panels[e.map(function (x) { return x.toFixed(6); }).join(",")] = 1;
      e.forEach(function (x) { struts[x.toFixed(6)] = 1; });
    });
    // Surface of the polyhedron over the surface of a sphere of equal volume.
    var excess = Math.cbrt(S * S * S / (36 * Math.PI * V * V)) - 1;
    return { verts: verts, tris: tris, excess: excess, joints: verts.length,
             panels: Object.keys(panels).length, struts: Object.keys(struts).length };
  }

  var fig = document.getElementById("dome-figure");
  if (!fig) return;
  var canvas = fig.querySelector("canvas"), slider = fig.querySelector("input"), out = fig.querySelector("output");
  var ctx = canvas.getContext("2d"), model = build(+slider.value);
  var yaw = 0.5, pitch = 0.35, dragging = false, lastX = 0, lastY = 0;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function pct(x) { return x >= 0.01 ? (100 * x).toFixed(2) : (100 * x).toFixed(3); }
  function update() {
    model = build(+slider.value);
    out.textContent = "frequency " + slider.value + ": " + pct(model.excess) + "% more surface than a sphere of the same volume, " +
      model.joints + " joints, " + model.panels + " panel types, " + model.struts + " strut lengths";
    draw();
  }

  function draw() {
    var w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var fg = getComputedStyle(fig).color, m = fg.match(/\d+(\.\d+)?/g) || [0, 0, 0];
    var rgb = m[0] + "," + m[1] + "," + m[2];
    var cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    var R = Math.min(w, h) * 0.44, ox = w / 2, oy = h / 2;
    var P = model.verts.map(function (v) {
      var x = cy * v[0] + sy * v[2], z = -sy * v[0] + cy * v[2];
      var y = cp * v[1] - sp * z; z = sp * v[1] + cp * z;
      return [x, y, z];
    });
    var light = norm([-0.4, 0.6, 0.7]), faces = [];
    model.tris.forEach(function (t) {
      var a = P[t[0]], b = P[t[1]], c = P[t[2]], nrm = norm(cross(sub(b, a), sub(c, a)));
      var centre = [a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2]];
      if (dot(nrm, centre) < 0) nrm = [-nrm[0], -nrm[1], -nrm[2]];
      if (nrm[2] <= 0) return;
      faces.push({ t: t, z: centre[2], shade: Math.max(0, dot(nrm, light)) });
    });
    faces.sort(function (p, q) { return p.z - q.z; });
    ctx.lineJoin = "round";
    ctx.lineWidth = model.tris.length > 600 ? 0.6 : 1;
    faces.forEach(function (f) {
      ctx.beginPath();
      f.t.forEach(function (i, k) {
        var x = ox + P[i][0] * R, y = oy - P[i][1] * R;
        if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = "rgba(" + rgb + "," + (0.05 + 0.22 * f.shade).toFixed(3) + ")";
      ctx.fill();
      ctx.strokeStyle = "rgba(" + rgb + ",0.7)";
      ctx.stroke();
    });
  }

  slider.addEventListener("input", update);
  canvas.addEventListener("pointerdown", function (e) { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointerup", function () { dragging = false; });
  canvas.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    yaw += (e.clientX - lastX) * 0.01; pitch += (e.clientY - lastY) * 0.01;
    pitch = Math.max(-1.4, Math.min(1.4, pitch)); lastX = e.clientX; lastY = e.clientY; draw();
  });
  window.addEventListener("resize", draw);
  function tick() { if (!dragging) { yaw += 0.004; draw(); } requestAnimationFrame(tick); }
  update();
  if (!still) requestAnimationFrame(tick);
})();
