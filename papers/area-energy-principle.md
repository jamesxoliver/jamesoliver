---
claim: To exchange the most energy a thing presents the most surface and to exchange the least it presents the least.
---

# The Area-Energy Principle

Two identical sailboats start a race in the same wind. The hulls, the weight and the crews are matched. One carries a sail twice the size of the other and it reaches the far shore first. Nothing about the wind or the cloth differs between them. Only the area turned to the wind does.

Sugar dissolves faster ground than in a cube and a swimmer in fins outpaces one without, for the same reason. The question is why area, among everything a builder or an organism could change, is so often the thing that changes. The answer is that each unit of surface can exchange only so much. The surroundings fix what arrives at the surface, the material can pass on at most all of it and the area alone has no ceiling. So a system that must exchange the most spreads the most surface. A system that must exchange the least presents the least, which is a sphere.

We consider exchanges that happen across a surface: heat, light, dissolved matter and the momentum of a moving fluid. The established laws for these share one form.

| Exchange | Law |
|---|---|
| Heat through a layer | $\dot{Q} = (k/L)\,\Delta T\,A$ |
| Diffusion through a layer | $J = (D/L)\,\Delta C\,A$ |
| Drag on a body | $F = C_d\,\tfrac{1}{2}\rho v^2\,A$ |
| Power from wind | $P = C_p\,\tfrac{1}{2}\rho v^3\,A$ |
| Light absorbed | $\dot{Q} = \alpha\,G\,A$ |
| Heat radiated | $\dot{Q} = \epsilon\,\sigma\,(T^4 - T_s^4)\,A$ |

In every row the rate is a product of three things: a coefficient set by the material or the shape, a driving term set by the surroundings and the area $A$.

**Definition 1.** An exchange is *area-proportional* when its rate is $Q = c\,g\,A$, where $g$ is the driving term supplied by the surroundings, $c$ is the coefficient of the surface and $A$ is its area.

We assume the system cannot change its surroundings, so $g$ is given. We assume the coefficient has a ceiling $c_{\max}$. For some exchanges the ceiling is a law. A surface absorbs at most all the light that strikes it, so absorptivity is at most one and a rotor takes at most $16/27$ of the power in the wind that passes through it. For others the ceiling is the best material available in the thinnest layer that holds together.

**Theorem 1.** *An area-proportional exchange at rate $Q$ under a driving term $g$ requires a surface of area at least $Q/(c_{\max}\,g)$.*

*Proof.* $Q = c\,g\,A \le c_{\max}\,g\,A$, so $A \ge Q/(c_{\max}\,g)$. $\square$

The theorem is a single inequality. Its content is in what follows from it.

**Corollary 1.** *No improvement in a collector can shrink it below the area at which a perfect collector would do the job.*

Under a clear noon sun about one kilowatt of sunlight reaches each square meter of ground. A collector that must deliver one kilowatt there needs at least one square meter whatever it is made of. A collector that converts a fifth of the light needs five. Past the ceiling of the material every further kilowatt is bought with area.

**Corollary 2.** *For bodies of one shape the exchange per unit of volume falls in inverse proportion to size.*

*Proof.* For a body of length $\ell$ the area grows as $\ell^2$ and the volume as $\ell^3$, so $Q/V = c\,g\,A/V$ falls as $1/\ell$. $\square$

Cut a solid into pieces a tenth the size and the same mass presents ten times the surface. That is why ground sugar dissolves first, why flour is digested faster than whole grain and why grain dust can explode where a sack of grain only smoulders. In the other direction a large warm body loses its heat slowly and a small one quickly, so the smallest warm-blooded animals eat a large share of their weight each day.

**Corollary 3.** *A body whose need for exchange grows faster than the square of its size must fold or branch its exchange surface once it is large enough.*

*Proof.* Let $\ell$ be the length of a body of fixed shape. Its outer surface grows as $\ell^2$. If its need grows as $\ell^d$ with $d>2$, then by Theorem 1 the area it requires grows as $\ell^d$ and the ratio of required area to outer surface grows as $\ell^{d-2}$ without limit. Past some size the outer surface is too small and the required area must be packed inside the body or spread outside it. $\square$

Where the need follows the volume of living tissue, $d$ is 3 and the ratio grows in proportion to size. A flatworm breathes through its skin. A human cannot. A human lung folds tens of square meters of membrane into the chest against less than two square meters of skin. Roots, gills, the lining of the gut and the crown of a tree are the same answer.

**Corollary 4.** *Exchange can be raised without limit only through area and lowered without limit only through the coefficient.*

*Proof.* To raise $Q$ with $g$ fixed, $c$ stops at $c_{\max}$ while $A$ has no upper bound. To lower $Q$, $A$ stops at the area of the sphere that encloses the body's volume $V$, which is $(36\pi)^{1/3}V^{2/3}$ and the least any closed surface can have, while $c$ can be driven toward zero by a thicker layer, a poorer conductor or a more reflective face. $\square$

So the things that gather are broad and thin and the things that keep are compact and wrapped. A leaf, a sail and a radiator spread. A flask, an igloo and a seal in cold water round up and add a barrier.

The principle covers exchange across a surface and nothing else. It gives area no ceiling, while in anything built or grown each unit of area costs material and support and that cost sets how far a surface spreads. It does not explain why a submarine is shaped like a fish. A long tapered body has more surface than a sphere of the same volume and still moves through water more easily, because its shape lowers the coefficient of drag many times over. That is exchange lowered through the coefficient, as Corollary 4 allows. The shape itself lies outside the principle.

The theorem would be false if an area-proportional exchange exceeded $c_{\max}\,g\,A$, which for light would mean a surface absorbing more than strikes it. Corollary 3 would fail if large bodies whose needs outgrow their skin were found exchanging through a smooth outer surface alone. Corollary 4 would fail if a coefficient were raised past its ceiling or a volume enclosed in less surface than a sphere.

The larger sail wins because the wind was given and the cloth was already doing what cloth can do, which left area.

<figure id="shape-figure">
<canvas style="width:100%;height:9rem" aria-label="One volume drawn as a sphere, a disc or a sheet"></canvas>
<p><label for="shape-spread">Shape</label> <input id="shape-spread" type="range" min="0" max="300" step="1" value="0" style="vertical-align:middle;width:60%"></p>
<p><output for="shape-spread" aria-live="polite"></output></p>
<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;text-align:center;font-size:0.85em">
<div><div style="display:flex;gap:0.6rem;align-items:flex-end">
<div><svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><rect x="13" y="10" width="14" height="26" rx="5"/><rect x="15.5" y="4" width="9" height="6" rx="1.5"/><path d="M13 18h14"/></svg><br>flask</div>
<div><svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M3 34A17 17 0 0 1 37 34Z"/><path d="M15 34v-6a5 5 0 0 1 10 0v6"/><path d="M6.5 25h8M25.5 25h8M13 17h14M20 17v-6.5M11 25v-8M29 25v-8"/></svg><br>igloo</div>
<div><svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M5 31C12 32 22 33 27 30C31 27.500 32 22 32.500 17C35 16 36.500 13 35 10.500C33 8 29 9 28 12C27 18 21 21 14 23.500C9 25.500 6 28 5 31Z"/><path d="M5 31L1.500 27M5 31L1 34M23 30.500L27 35.500"/><circle cx="32.500" cy="12" r="0.7" fill="currentColor"/></svg><br>seal</div>
</div><div style="margin-top:0.4rem"><em>keep</em></div></div>
<div><div style="display:flex;gap:0.6rem;align-items:flex-end">
<div><svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M20 3C32 11 32 25 20 34C8 25 8 11 20 3Z"/><path d="M20 3V38M20 13l6-4M20 13l-6-4M20 21l8-5M20 21l-8-5M20 28l6-4M20 28l-6-4"/></svg><br>leaf</div>
<div><svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M17 3V31"/><path d="M19 4C27 12 33 21 35 29H19Z"/><path d="M15 9L6 29H15Z"/><path d="M4 32H37L33 37H9Z"/></svg><br>sail</div>
<div><svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M5 8V34M10 8V34M15 8V34M20 8V34M25 8V34M30 8V34M35 8V34"/><path d="M3 12H37M3 30H37"/></svg><br>radiator</div>
</div><div style="margin-top:0.4rem"><em>gather</em></div></div>
</div>
<figcaption>One volume in different shapes, drawn to scale from the side. The surface is computed for a spheroid of the proportions shown. The sketches show which way each thing leans and are not placed to scale.</figcaption>
</figure>
<script src="area-energy-principle.js"></script>
