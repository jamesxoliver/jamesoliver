---
claim: A sphere encloses the most volume for its surface, flat parts cannot make a sphere and a geodesic dome comes as close to one as we like.
---

# The Buildable Sphere

<style>
#dome-figure { margin: 1.5rem 0 2rem; --s: #2f62cf; --s0: #d65a1f; --n: #7041c9; }
@media (prefers-color-scheme: dark) { #dome-figure { --s: #7ea2ff; --s0: #ff8a4c; --n: #b694ff; } }
#dome-figure canvas { width: 100%; display: block; touch-action: pan-y; cursor: grab; }
#dome-figure i, #dome-figure .laws { font-family: "STIX Two Text", "Cambria Math", "Times New Roman", serif; }
#dome-figure .laws { display: flex; justify-content: center; align-items: center; gap: 2.5rem; flex-wrap: wrap; font-size: 1.6rem; margin: 0 0 .5rem; }
#dome-figure .laws .frac { font-size: 1.3rem; }
#dome-figure .row { display: grid; grid-template-columns: 1.5rem 1fr; gap: .75rem; align-items: center; margin: .4rem 0; font-size: 1.2rem; }
#dome-figure input[type=range] { width: 100%; margin: 0; }
#dome-figure .out { display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; margin-top: .9rem; font-size: 1.2rem; align-items: end; }
#dome-figure .out b { display: block; font-weight: normal; font-variant-numeric: tabular-nums; font-size: 1.35rem; }
#dome-figure .frac { display: inline-flex; flex-direction: column; align-items: center; font-size: 1rem; line-height: 1.1; vertical-align: middle; }
#dome-figure .frac > span:first-child { border-bottom: 1px solid currentColor; padding: 0 3px; }
#dome-figure .gap { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
#dome-figure .s { color: var(--s); } #dome-figure .s0 { color: var(--s0); } #dome-figure .n { color: var(--n); }
</style>
<figure id="dome-figure" style="margin-left:0;margin-right:0">
<p class="laws" aria-label="V over S is less than V zero over S. One minus V over V zero is about 0.93 over N."><span><span class="frac"><span><i class="s">V</i></span><span><i>S</i></span></span> &lt; <span class="frac"><span><i class="s0">V</i><sub class="s0">0</sub></span><span><i>S</i></span></span></span><span class="gap"> and </span><span>1 − <span class="frac"><span><i class="s">V</i></span><span><i class="s0">V</i><sub class="s0">0</sub></span></span> ≈ <span class="frac"><span>0.93</span><span><i class="n">N</i></span></span></span></p>
<canvas role="img" aria-label="A geodesic sphere of flat triangles turning in space, drawn over the sphere with the same surface. Below it, a scale runs from a cube to the sphere and marks how much of the sphere's volume the flat build encloses at each frequency."></canvas>
<div class="row"><label for="dome-frequency"><i>ν</i></label><input id="dome-frequency" type="range" min="1" max="8" step="1" value="2" aria-label="Frequency"></div>
<div class="out" aria-live="off">
<div><i class="n">N</i><b id="dome-N" class="n">42</b></div>
<div><span class="frac"><span><i class="s">V</i></span><span><i class="s0">V</i><sub class="s0">0</sub></span></span><b id="dome-S" class="s">0.977</b></div>
<div><span><i class="n">N</i> · (1 − <span class="frac"><span><i class="s">V</i></span><span><i class="s0">V</i><sub class="s0">0</sub></span></span>)</span><b id="dome-K">0.98</b></div>
</div>
</figure>
<script src="geodesic-dome.js"></script>

A soap bubble is a sphere. Its film pulls inward until it holds the air with the least surface it can, which is the same as holding the most air its surface can. A builder who wants the most room from the least material faces the same problem and cannot use the same answer, because a builder works with flat panels and a sphere has no flat part. The question is how close a structure built from flat parts can come to the sphere.

The answer is organized by one quantity, the volume enclosed for a given surface. A sphere encloses the most. Flat parts cannot make a sphere, so every buildable structure encloses less. A geodesic dome comes as close to the sphere as we like. Each step closer costs more joints, so the right dome is the one at which the next joint would save less than it costs.

We assume that the material in a thin shell is proportional to its area. For a shell of density $\rho$ and thickness $t$ the mass is $M=\rho\,t\,S$, so getting the most room from a given amount of material is the same problem as enclosing the most volume with a given surface. We also assume that a buildable structure is made of flat parts joined at finite precision and that it must hold its shape with pinned joints.

**Theorem 1.** *Among all closed surfaces of a given area, the sphere encloses the most volume and it alone encloses that much. Equally, among all closed surfaces enclosing a given volume the sphere alone has the least area.*

*Proof.* This is the isoperimetric inequality in three dimensions, which H. A. Schwarz proved in 1884. $\square$

For a sphere of radius $r$,

$$S_{\mathrm{sphere}}=4\pi r^2,\qquad V_{\mathrm{sphere}}=\tfrac{4}{3}\pi r^3.$$

The same answer covers a dome standing on the ground. Reflected in the ground plane, a dome becomes a closed surface with twice its volume and twice its built area, so the hemisphere is the enclosure that stands on a plane and covers the most volume for its area.

**Theorem 2.** *No structure built from flat parts is a sphere and each encloses less volume than the sphere of equal surface.*

*Proof.* A closed surface made of flat parts is a polyhedron and each of its faces lies in a plane. A plane meets a sphere in a circle, in a single point or not at all, so no piece of a plane with any area lies on a sphere. A polyhedron is therefore never a sphere and by Theorem 1 it encloses less volume than the sphere of the same area. $\square$

The maximum exists and no buildable structure reaches it. What remains to ask is whether buildable structures can come arbitrarily close.

To hold its shape with pinned joints, a structure needs triangular faces. A triangle cannot change shape without changing the length of a side, while a face with four or more sides can fold at its corners unless its joints resist bending. A convex polyhedron whose faces are all triangles is rigid to first order, which Max Dehn proved in 1916.

**Definition 1.** Inscribe a regular icosahedron in a sphere, divide each of its faces into $\nu^2$ triangles and project every new vertex outward onto the sphere. The resulting polyhedron $\mathcal{P}_\nu$ is the *geodesic dome of frequency* $\nu$.

Every face of $\mathcal{P}_\nu$ is a flat triangle, so each is buildable. Computed directly at frequencies 1, 2, 3, 4, 6, 8, 16 and 32, $\mathcal{P}_\nu$ is convex, so at each of them it is rigid by Dehn's result.

**Theorem 3.** *Geodesic domes come arbitrarily close to the sphere. Write $V_0$ for the volume of the sphere of surface $S$. For any $\varepsilon>0$ there is a frequency $\nu$ at which the geodesic dome of surface $S$ encloses a volume of at least $V_0-\varepsilon$.*

*Proof.* Take the sphere of Definition 1 to have radius one. Seen from the centre, the faces of $\mathcal{P}_\nu$ cover every direction exactly once, since they come from a subdivision of the icosahedron projected outward. Let $d$ be the least distance from the centre to the plane of a face. Projecting a face outward onto the sphere changes its area by a factor between $d$ and $1/d^2$, so the area of $\mathcal{P}_\nu$ lies between $4\pi d^2$ and $4\pi/d$. The cones from the centre to the faces fill $\mathcal{P}_\nu$, so its volume lies between $\tfrac{4}{3}\pi d^3$ and $\tfrac{4}{3}\pi/d$.

The corners of each face lie on the sphere, so the plane of the face stands at a distance $\sqrt{1-\varrho^2}$ from the centre, where $\varrho$ is the radius of the circle through the three corners. The triangles stay close to equilateral while their edges shrink in proportion to $1/\nu$, so $\varrho$ tends to zero and $d$ tends to one. Computed directly, $d$ is 0.795, 0.934, 0.982 and 0.995 at frequencies 1, 2, 4 and 8. Hence

$$S(\mathcal{P}_\nu)\to S_{\mathrm{sphere}},\qquad V(\mathcal{P}_\nu)\to V_{\mathrm{sphere}}\qquad(\nu\to\infty).$$

Now scale each $\mathcal{P}_\nu$ so that its surface is exactly $S$. Since its area tends to that of the sphere, the scale factor tends to one and the scaled volumes tend to $V_0$. Scaling keeps every face flat and triangular. $\square$

**Corollary 1.** *A hemispherical dome on the ground covers a volume $V$ with a surface of $(18\pi)^{1/3}V^{2/3}\approx 3.84\,V^{2/3}$. A cube on the ground covers the same volume with walls and a roof of $5\,V^{2/3}$. The dome uses 23 percent less surface and a geodesic dome approaches that figure as its frequency rises.*

**Corollary 2.** *The volume by which a geodesic sphere falls short of the sphere of equal surface shrinks in inverse proportion to its number of joints. With $N$ joints it encloses a share of the sphere's volume close to $1-0.93/N$, so halving the shortfall doubles the joints. Measured the other way, at equal volume its surface exceeds the sphere's by close to $0.62/N$ of the sphere's area. A dome is half the sphere with half the joints and for it the constants are $0.47$ and $0.31$.*

*Proof.* Each flat triangle lies below the sphere by a distance proportional to the square of its edge and the edge shrinks in proportion to $1/\nu$, so the excess area falls as $1/\nu^2$. A geodesic sphere of frequency $\nu$ has $10\nu^2+2$ joints, which grow as $\nu^2$. The product of the excess and the number of joints therefore settles to a constant. Computed from Definition 1, it is 0.775, 0.671, 0.632, 0.623, 0.621 and 0.620 at frequencies 1, 2, 4, 8, 16 and 32. A surface excess of $e$ at equal volume is a volume shortfall of $1-(1+e)^{-3/2}$ at equal surface, which is close to $\tfrac{3}{2}e$ when $e$ is small. Hence the constant $\tfrac{3}{2}\times 0.62=0.93$. $\square$

Corollary 2 sets a price on closeness and a price leads to a best frequency once costs are named. We add an assumption the theorem has not needed: each joint costs a fixed amount $c$ and panel material costs a fixed amount $a$ per unit area.

**Corollary 3.** *Under that assumption, the cheapest geodesic dome of radius $r$ has a number of joints proportional to $r$ and struts whose length is proportional to $\sqrt{r}$. At that frequency the spending on joints equals the spending on surface beyond the sphere.*

*Proof.* Let $S_0$ be the area of the sphere and $N$ the number of joints. By Corollary 2 the cost is close to $C(N)=a S_0(1+k/N)+cN$ where $k$ is the surface constant of Corollary 2. It is least where $dC/dN=0$, which gives $N^*=\sqrt{k a S_0/c}$. Since $S_0=4\pi r^2$, $N^*$ is proportional to $r$. At that point $cN^*=\sqrt{k a c S_0}=a S_0 k/N^*$, so the two spends are equal. The joints number about $10\nu^2$, so the frequency grows as $\sqrt{r}$ and the struts, whose length is close to $r/\nu$, grow as $\sqrt{r}$. $\square$

A dome four times as wide is cheapest with struts twice as long and with four times as many joints.

The theorems concern volume and surface and nothing else. Geodesic domes are one route to the sphere, since any family of triangulated polyhedra that closes on it in the same way approaches it too. Nothing here speaks to strength under load or to what a joint or a distinct panel costs to make and the number of distinct panels grows with frequency as well.

The geometry cannot fail. Theorems 1 and 2 are proved and the approach in Theorem 3 can be checked by direct computation at any frequency. The claim about the world is the cost assumption behind Corollary 3. It would be false if domes built to minimize cost showed strut length growing in proportion to radius, which a survey of built domes can check.

The bubble reaches the sphere at once because nothing in it is flat. The dome reaches it by subdivision and pays for each step in joints.
