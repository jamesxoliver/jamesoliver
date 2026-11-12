(function () {
  var fig = document.getElementById('rail-figure');
  if (!fig) return;
  var cv = fig.querySelector('canvas'), ctx = cv.getContext('2d');
  var inN = document.getElementById('rail-cars'), inV = document.getElementById('rail-speed');
  var out = fig.querySelector('output');
  var G = 9.81, RHO = 1.2, C = 0.0015, M = 90000, A = 10, S = 2, NMAX = 100;
  // specific energy in kJ per tonne-km: force per kg (N/kg) equals kJ per tonne-km divided by 1000... N/kg = J/(kg m) = 1000 kJ/(t km)
  function e(n, v) { var q = 0.5 * RHO * v * v; return 1000 * (C * G + q * S / M + q * A / (n * M)); }
  function floor(v) { var q = 0.5 * RHO * v * v; return 1000 * (C * G + q * S / M); }
  function draw() {
    var r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    var W = r.width, H = r.height, col = getComputedStyle(fig).color;
    ctx.clearRect(0, 0, W, H); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1;
    var n = +inN.value, v = +inV.value / 3.6;
    // the train
    var pad = 16, ty = 34, tw = W - 2 * pad, cw = Math.min(28, tw / n), ch = Math.min(14, Math.max(4, cw * 0.5));
    for (var i = 0; i < n; i++) {
      var x = pad + i * cw;
      ctx.fillRect(x + (cw > 3 ? 1 : 0), ty - ch, Math.max(1, cw - (cw > 3 ? 2 : 0)), ch);
    }
    ctx.beginPath(); ctx.moveTo(pad, ty + 3.5); ctx.lineTo(W - pad, ty + 3.5); ctx.stroke();
    // the plot
    var L = pad + 30, R = W - pad, T = 64, B = H - 28;
    var top = e(1, v) * 1.08;
    function X(k) { return L + (R - L) * (k - 1) / (NMAX - 1); }
    function Y(val) { return B - (B - T) * val / top; }
    ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(R, B); ctx.stroke();
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(L, Y(floor(v))); ctx.lineTo(R, Y(floor(v))); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(L, Y(e(1, v))); ctx.lineTo(R, Y(e(1, v))); ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineWidth = 2; ctx.beginPath();
    for (var k = 1; k <= NMAX; k++) { if (k === 1) ctx.moveTo(X(k), Y(e(k, v))); else ctx.lineTo(X(k), Y(e(k, v))); }
    ctx.stroke(); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(X(n), Y(e(n, v)), 5, 0, 2 * Math.PI); ctx.fill();
    ctx.font = '12px sans-serif'; ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
    ctx.fillText('0', L - 5, B); ctx.fillText(Math.round(e(1, v)), L - 5, Y(e(1, v)));
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('1', L, B + 6); ctx.fillText(NMAX + ' cars', R - 18, B + 6);
    var en = e(n, v), fl = floor(v);
    out.textContent = n + (n === 1 ? ' car' : ' cars') + ' at ' + inV.value + ' km/h: ' + en.toFixed(1) +
      ' kJ for each tonne-kilometer · floor: ' + fl.toFixed(1) + ' · above the floor: ' +
      (100 * (en - fl) / fl).toFixed(1) + '% · running apart: ' + e(1, v).toFixed(1);
  }
  inN.addEventListener('input', draw); inV.addEventListener('input', draw);
  window.addEventListener('resize', draw);
  if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
  draw();
})();
