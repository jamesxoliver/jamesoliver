(function () {
  var fig = document.getElementById('store-figure');
  if (!fig) return;
  var cv = fig.querySelector('canvas'), ctx = cv.getContext('2d'), out = fig.querySelector('output');
  var inE = document.getElementById('store-e'), inR = document.getElementById('store-r'), inP = document.getElementById('store-p');
  var HOURS = 48, DT = 1 / 60;
  function draw() {
    var b = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    cv.width = Math.round(b.width * d); cv.height = Math.round(b.height * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    var W = b.width, H = b.height, col = getComputedStyle(fig).color;
    ctx.clearRect(0, 0, W, H); ctx.strokeStyle = col; ctx.fillStyle = col;
    var E = +inE.value, r = +inR.value, P = +inP.value;
    var L = 40, R = W - 14, T = 16, B = H - 28, top = 100;
    function X(t) { return L + (R - L) * t / HOURS; }
    function Y(v) { return B - (B - T) * Math.min(v, top) / top; }
    ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(R, B); ctx.stroke();
    // step the store forward
    var s = E, empty = null, given = 0, steps = Math.round(HOURS / DT);
    ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0), Y(s));
    for (var i = 1; i <= steps; i++) {
      var want = P * DT, have = s + r * DT, took = Math.min(want, have);
      s = have - took; given += took;
      if (empty === null && took < want - 1e-12) empty = (i - 1) * DT;
      if (i % 6 === 0 || i === steps) ctx.lineTo(X(i * DT), Y(s));
    }
    ctx.stroke(); ctx.lineWidth = 1;
    if (empty !== null && empty > 0) {
      ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(empty), T); ctx.lineTo(X(empty), B); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.font = '12px sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText('0', L - 5, B); ctx.fillText('100', L - 5, Y(100));
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('0', L, B + 6); ctx.fillText(HOURS + ' hours', R - 22, B + 6);
    var kind = E === 0 ? 'collect' : (r === 0 ? 'release' : 'a store on a flow');
    var txt = kind + ' · ';
    if (P <= r) txt += 'draw is within the refill and the source lasts without end';
    else {
      var th = E / (P - r);
      txt += 'store empty after ' + (empty === null ? 'more than ' + HOURS : empty.toFixed(1)) + ' hours, counted · E/(P − r): ' + th.toFixed(1) + ' hours';
    }
    txt += ' · average power delivered: ' + (given / HOURS).toFixed(2);
    out.textContent = txt;
  }
  [inE, inR, inP].forEach(function (el) { el.addEventListener('input', draw); });
  window.addEventListener('resize', draw);
  if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
  draw();
})();
