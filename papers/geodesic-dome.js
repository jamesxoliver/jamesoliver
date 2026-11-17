// Geodesic dome figure for The Buildable Sphere, shown first on the page.
// One input: the frequency. The polyhedron is built from a regular icosahedron
// by Definition 1 and everything shown is measured from it: its joints N, the
// volume V it encloses against the volume V0 of the sphere with the same
// surface, and the product of the shortfall and the joints, which settles near 0.93.
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
    return { verts: verts, tris: tris, excess: excess, joints: verts.length, rs: Math.sqrt(S / (4 * Math.PI)), share: Math.pow(1 + excess, -1.5),
             panels: Object.keys(panels).length, struts: Object.keys(struts).length };
  }

  var fig = document.getElementById("dome-figure");
  if (!fig) return;
  var canvas = fig.querySelector("canvas"), slider = document.getElementById("dome-frequency");
  var oN = document.getElementById("dome-N"), oS = document.getElementById("dome-S"), oK = document.getElementById("dome-K");
  var ctx = canvas.getContext("2d");
  var MAXF = +slider.max, models = [];
  for (var f = 1; f <= MAXF; f++) models[f] = build(f);
  var model = models[+slider.value];
  var yaw = 0.5, pitch = 0.35, dragging = false, lastX = 0, lastY = 0;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BARS = 78, CUBE = Math.sqrt(Math.PI / 6);   // a cube encloses 72 percent of the sphere's volume

  function update() {
    model = models[+slider.value];
    oN.textContent = model.joints;
    oS.textContent = model.share.toFixed(3);
    oK.textContent = (model.joints * (1 - model.share)).toFixed(2);
    draw();
  }

  function draw() {
    var w = canvas.clientWidth, side = Math.min(w, 460), h = side + BARS, dpr = window.devicePixelRatio || 1;
    canvas.style.height = h + "px";
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var cs = getComputedStyle(fig), fam = cs.fontFamily;
    var cS = cs.getPropertyValue("--s").trim(), c0 = cs.getPropertyValue("--s0").trim(), cN = cs.getPropertyValue("--n").trim();
    var cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    var R = side * 0.42, ox = w / 2, oy = side / 2;
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

    // S: the flat panels
    ctx.lineJoin = "round";
    ctx.lineWidth = model.tris.length > 600 ? 0.7 : 1.2;
    ctx.strokeStyle = cS;
    faces.forEach(function (f) {
      ctx.beginPath();
      f.t.forEach(function (i, k) {
        var x = ox + P[i][0] * R, y = oy - P[i][1] * R;
        if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = cS; ctx.globalAlpha = 0.06 + 0.26 * f.shade; ctx.fill();
      ctx.globalAlpha = 0.85; ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // V0: the sphere with the same surface. The corners stand outside it and the panels cut inside it.
    ctx.strokeStyle = c0; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(ox, oy, model.rs * R, 0, 2 * Math.PI); ctx.stroke();

    // N: the joints
    ctx.fillStyle = cN;
    var jr = Math.max(1.3, 4.2 - 0.4 * +slider.value);
    P.forEach(function (v) {
      if (v[2] <= 0.02) return;
      ctx.beginPath(); ctx.arc(ox + v[0] * R, oy - v[1] * R, jr, 0, 2 * Math.PI); ctx.fill();
    });

    // labels on the drawing
    ctx.font = "italic 18px " + fam; ctx.textBaseline = "middle";
    var lx = model.rs * R * 0.78, ly = oy - model.rs * R * 0.78;
    ctx.fillStyle = c0; ctx.textAlign = "left"; ctx.fillText("V₀", ox + lx + 10, ly - 8);
    ctx.fillStyle = cS; ctx.textAlign = "right"; ctx.fillText("V", ox - lx - 12, ly - 8);

    // one scale: the share of the sphere's volume enclosed for the same surface.
    // It runs from a cube at the left to the sphere at the right, with a mark for each frequency.
    var x0 = 30, x1 = w - 30, yb = side + 34, th = 12;
    var X = function (share) { return x0 + (share - CUBE) / (1 - CUBE) * (x1 - x0); };
    var fg = cs.color;
    ctx.strokeStyle = fg; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
    ctx.strokeRect(x0, yb, x1 - x0, th);
    ctx.globalAlpha = 1;
    ctx.fillStyle = cS; ctx.globalAlpha = 0.85;
    ctx.fillRect(x0, yb, X(model.share) - x0, th);
    ctx.globalAlpha = 1;
    for (var f = 1; f <= MAXF; f++) {
      var on = f === +slider.value, tx = X(models[f].share);
      ctx.strokeStyle = cN; ctx.lineWidth = on ? 2.5 : 1.2; ctx.globalAlpha = on ? 1 : 0.7;
      ctx.beginPath(); ctx.moveTo(tx, yb - (on ? 8 : 4)); ctx.lineTo(tx, yb + th + (on ? 8 : 4)); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // the sphere is the wall at the right end
    ctx.strokeStyle = c0; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x1, yb - 12); ctx.lineTo(x1, yb + th + 12); ctx.stroke();
    // end marks: a cube and a sphere
    ctx.strokeStyle = fg; ctx.lineWidth = 1.5;
    ctx.strokeRect(x0 - 22, yb - 1, 14, 14);
    ctx.strokeStyle = c0; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x1 + 15, yb + 6, 8, 0, 2 * Math.PI); ctx.stroke();
    // the joints at the chosen frequency, under its mark
    ctx.fillStyle = cN; ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.font = "13px " + fam;
    ctx.fillText(model.joints, Math.min(X(model.share), x1 - 14), yb + th + 12);
  }

  slider.addEventListener("input", update);
  canvas.addEventListener("pointerdown", function (e) { if (e.offsetY > Math.min(canvas.clientWidth, 460)) return; dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointerup", function () { dragging = false; });
  canvas.addEventListener("pointercancel", function () { dragging = false; });
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
