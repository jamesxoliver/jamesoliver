(function () {
  var fig = document.getElementById('deck-figure');
  if (!fig) return;
  var cv = fig.querySelector('canvas'), ctx = cv.getContext('2d'), out = fig.querySelector('output');
  var inN = document.getElementById('deck-n');
  var deck = [], shuffles = 0, sorted = 0, shown = [], tick = 0;
  function fact(k) { var f = 1; for (var i = 2; i <= k; i++) f *= i; return f; }
  function reset() { var n = +inN.value; deck = []; for (var i = 0; i < 2 * n; i++) deck.push(i < n ? 0 : 1); shuffles = 0; sorted = 0; shown = deck.slice(); }
  function shuffle() { for (var i = deck.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = deck[i]; deck[i] = deck[j]; deck[j] = t; } }
  function inSuits() { var c = 0; for (var i = 1; i < deck.length; i++) if (deck[i] !== deck[i - 1]) c++; return c <= 1; }
  function draw() {
    var b = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    if (cv.width !== Math.round(b.width * d)) { cv.width = Math.round(b.width * d); cv.height = Math.round(b.height * d); }
    ctx.setTransform(d, 0, 0, d, 0, 0);
    var W = b.width, H = b.height, col = getComputedStyle(fig).color;
    ctx.clearRect(0, 0, W, H); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.5;
    var m = shown.length, cw = Math.min(44, (W - 32) / m), ch = Math.min(H - 24, cw * 1.4), x0 = (W - cw * m) / 2, y0 = (H - ch) / 2;
    for (var i = 0; i < m; i++) {
      var x = x0 + i * cw + 3, w = cw - 6;
      if (shown[i] === 0) ctx.fillRect(x, y0, w, ch); else ctx.strokeRect(x, y0, w, ch);
    }
    var n = +inN.value, pred = 2 * fact(n) * fact(n) / fact(2 * n);
    out.textContent = shuffles.toLocaleString('en-US') + ' shuffles · landed in suits: ' + (shuffles ? (100 * sorted / shuffles).toFixed(2) : '0.00') +
      '% · ratio of the counts: ' + (100 * pred).toFixed(2) + '%';
  }
  function frame() {
    for (var k = 0; k < 40; k++) { shuffle(); shuffles++; if (inSuits()) sorted++; }
    if (tick++ % 20 === 0) shown = deck.slice();
    draw(); requestAnimationFrame(frame);
  }
  inN.addEventListener('input', function () { reset(); draw(); });
  reset(); requestAnimationFrame(frame);
})();
