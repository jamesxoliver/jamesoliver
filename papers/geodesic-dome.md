---
claim: The sphere encloses a volume with the least surface, a sphere cannot be built from flat parts and geodesic domes approach it without limit.
---

# The Buildable Sphere

A soap bubble is a sphere. Its film pulls inward until it holds the air with the least surface it can and among all closed surfaces holding a given volume, the sphere has the least area. A builder who wants to enclose a room with the least material faces the same problem and cannot use the same answer, because a builder works with flat panels and a sphere has no flat part. The question is how close a structure built from flat parts can come to the sphere.

We assume that the material in a thin shell is proportional to its area. For a shell of density $\rho$ and thickness $t$ the mass is $M=\rho\,t\,S$, so enclosing a volume with the least material is the same problem as enclosing it with the least surface. We also assume that a buildable structure is made of flat parts joined at finite precision and that it must hold its shape with pinned joints.

The first assumption turns a structural question into a geometric one and the isoperimetric inequality answers it: among all closed surfaces enclosing a volume $V$, the sphere alone has the least area. For a sphere of radius $r$,

$$S_{\mathrm{sphere}}=4\pi r^2,\qquad V_{\mathrm{sphere}}=\tfrac{4}{3}\pi r^3.$$

The same answer covers a dome standing on the ground. Reflected in the ground plane, a dome becomes a closed surface with twice its volume and twice its built area, so the hemisphere is the enclosure of least area that stands on a plane.

The second assumption rules the sphere out. A surface made of flat parts is a polyhedron and a polyhedron enclosing $V$ has more surface than the sphere enclosing $V$. The minimum exists and no buildable structure reaches it. What remains to ask is whether buildable structures can come arbitrarily close.

To hold its shape with pinned joints, a structure needs triangular faces. A triangle cannot change shape without changing the length of a side, while a face with four or more sides can fold at its corners unless its joints resist bending. A convex polyhedron whose faces are all triangles is rigid to first order.

**Definition 1.** Inscribe a regular icosahedron in a sphere, divide each of its faces into $\nu^2$ triangles and project every new vertex outward onto the sphere. The resulting polyhedron $\mathcal{P}_\nu$ is the *geodesic dome of frequency* $\nu$.

Each $\mathcal{P}_\nu$ is convex and every face is a flat triangle, so each is buildable and rigid. As the frequency rises the vertices crowd the sphere and

$$S(\mathcal{P}_\nu)\to S_{\mathrm{sphere}},\qquad V(\mathcal{P}_\nu)\to V_{\mathrm{sphere}}\qquad(\nu\to\infty).$$

**Theorem 1.** *Among enclosures of volume $V$ built from flat parts, no surface area is as small as $S_{\mathrm{sphere}}$ and geodesic domes come arbitrarily close to it. For any $\varepsilon>0$ there is a frequency $\nu$ at which the geodesic dome of volume $V$ has surface area at most $S_{\mathrm{sphere}}+\varepsilon$.*

*Proof.* Every enclosure built from flat parts is a polyhedron and by the isoperimetric inequality its area exceeds that of the sphere of the same volume. For the approach, scale each $\mathcal{P}_\nu$ so that it encloses exactly $V$. Since $V(\mathcal{P}_\nu)\to V_{\mathrm{sphere}}$, the scale factor tends to one and the scaled areas tend to $S_{\mathrm{sphere}}$. Scaling keeps every face flat and triangular, so each scaled dome is still buildable and rigid. $\square$

**Corollary 1.** *A hemispherical dome on the ground covers a volume $V$ with a surface of $(18\pi)^{1/3}V^{2/3}\approx 3.84\,V^{2/3}$. A cube on the ground covers the same volume with walls and a roof of $5\,V^{2/3}$. The dome uses 23 percent less surface and a geodesic dome approaches that figure as its frequency rises.*

**Corollary 2.** *The surface by which a geodesic dome exceeds the sphere of equal volume falls in inverse proportion to its number of joints. With $N$ joints the excess is close to $0.62/N$ of the sphere's area, so halving the excess doubles the joints.*

*Proof.* Each flat triangle lies below the sphere by a distance proportional to the square of its edge and the edge shrinks in proportion to $1/\nu$, so the excess area falls as $1/\nu^2$. A geodesic sphere of frequency $\nu$ has $10\nu^2+2$ joints, which grow as $\nu^2$. The product of the excess and the number of joints therefore settles to a constant. Computed from Definition 1, it is 0.775, 0.671, 0.632, 0.623, 0.621 and 0.620 at frequencies 1, 2, 4, 8, 16 and 32. $\square$

Corollary 2 sets a price on closeness and a price leads to a best frequency once costs are named. We add an assumption the theorem has not needed: each joint costs a fixed amount $c$ and panel material costs a fixed amount $a$ per unit area.

**Corollary 3.** *Under that assumption, the cheapest geodesic dome of radius $r$ has a number of joints proportional to $r$ and struts whose length is proportional to $\sqrt{r}$. At that frequency the spending on joints equals the spending on surface beyond the sphere.*

*Proof.* Let $S_0$ be the area of the sphere and $N$ the number of joints. By Corollary 2 the cost is close to $C(N)=a S_0(1+k/N)+cN$ with $k\approx 0.62$. It is least where $dC/dN=0$, which gives $N^*=\sqrt{k a S_0/c}$. Since $S_0=4\pi r^2$, $N^*$ is proportional to $r$. At that point $cN^*=\sqrt{k a c S_0}=a S_0 k/N^*$, so the two spends are equal. The joints number about $10\nu^2$, so the frequency grows as $\sqrt{r}$ and the struts, whose length is close to $r/\nu$, grow as $\sqrt{r}$. $\square$

A dome four times as wide is cheapest with struts twice as long and with four times as many joints.

The theorem concerns surface area and nothing else. Geodesic domes are one route to the minimum, since any family of convex triangulated polyhedra that converges to the sphere approaches it too. The theorem says nothing about strength under load or about what a joint or a distinct panel costs to make and the number of distinct panels grows with frequency as well.

The theorem would be false if a structure built from flat parts enclosed a volume with less surface than the sphere, which would contradict the isoperimetric inequality, or if the areas of geodesic domes failed to converge to the sphere's, which can be checked by direct computation at any frequency. Corollary 3 rests on its added assumption about cost and it would fail if domes built to minimize cost showed strut length growing in proportion to radius, which a survey of built domes can check.

The bubble reaches the sphere at once because nothing in it is flat. The dome reaches it by subdivision and the gap can be made smaller than any tolerance named in advance.

<figure id="dome-figure">
<canvas style="width:100%;aspect-ratio:1/1;touch-action:none;cursor:grab" aria-label="Geodesic dome of the chosen frequency"></canvas>
<p><label for="dome-frequency">Frequency</label> <input id="dome-frequency" type="range" min="1" max="8" value="3" style="vertical-align:middle"></p>
<p><output for="dome-frequency" aria-live="polite"></output></p>
<figcaption>The geodesic sphere of each frequency, computed from Definition 1. The surface figure compares the polyhedron with a sphere of equal volume. Joints, panel types and strut lengths are counted over the whole sphere and a dome is its upper half. Drag to turn it.</figcaption>
</figure>
<script src="geodesic-dome.js"></script>
