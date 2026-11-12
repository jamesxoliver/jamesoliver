(function () {
  var fig = document.getElementById('delay-figure');
  if (!fig) return;
  var cv = fig.querySelector('canvas'), ctx = cv.getContext('2d'), out = fig.querySelector('output');
  var pick = document.getElementById('delay-pick');
  var YEAR = 3.156e7, light = 1.496e11 / 2.998e8; // seconds from Sun to Earth
  var src = [
    { n: 'sunlight', s: light, path: 'straight from the Sun' },
    { n: 'wind', s: 5 * 86400, path: 'sunlight warms the air unevenly and the air moves' },
    { n: 'falling water', s: 1 * YEAR, path: 'sunlight lifts water as vapor and it falls as rain' },
    { n: 'wood', s: 30 * YEAR, path: 'a plant holds sunlight in its growth' },
    { n: 'coal', s: 3e8 * YEAR, path: 'plants hold sunlight and are buried' }
  ];
  function span(s) {
    if (s < 3600) return (s / 60).toFixed(1) + ' minutes';
    if (s < YEAR) return Math.round(s / 86400) + ' days';
    var y = s / YEAR;
    return y >= 1e6 ? Math.round(y / 1e6) + ' million years' : (y === 1 ? '1 year' : Math.round(y) + ' years');
  }
  function draw() {
    var b = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    cv.width = Math.round(b.width * d); cv.height = Math.round(b.height * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    var W = b.width, H = b.height, col = getComputedStyle(fig).color;
    ctx.clearRect(0, 0, W, H); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1;
    var L = 24, R = W - 24, y = H * 0.55, lo = 2, hi = 17; // log10 seconds
    function X(s) { return L + (R - L) * (Math.log(s) / Math.LN10 - lo) / (hi - lo); }
    ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(R, y); ctx.stroke();
    for (var k = lo; k <= hi; k++) { var x = L + (R - L) * (k - lo) / (hi - lo); ctx.beginPath(); ctx.moveTo(x, y - 3); ctx.lineTo(x, y + 3); ctx.stroke(); }
    var sel = +pick.value;
    ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    src.forEach(function (o, i) {
      var x = X(o.s);
      ctx.beginPath(); ctx.arc(x, y, i === sel ? 7 : 4, 0, 2 * Math.PI);
      if (i === sel) ctx.fill(); else ctx.stroke();
      if (W > 520 || i === sel) { ctx.textBaseline = 'bottom'; ctx.fillText(o.n, Math.max(40, Math.min(W - 40, x)), y - 12); }
    });
    ctx.textBaseline = 'top'; ctx.textAlign = 'left'; ctx.fillText('minutes', L, y + 12);
    ctx.textAlign = 'right'; ctx.fillText('hundreds of millions of years', R, y + 12);
    var o = src[sel];
    out.textContent = o.n + ': ' + o.path + ' · delay since the energy left the Sun: ' + span(o.s);
  }
  pick.addEventListener('input', draw); window.addEventListener('resize', draw);
  if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
  draw();
})();
