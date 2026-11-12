---
claim: The sphere encloses a volume with the least surface, a sphere cannot be built from flat parts, and geodesic domes approach it without limit.
---

# The Buildable Sphere

*This paper presents no new results. The isoperimetric inequality, the rigidity of convex triangulated polyhedra, and the convergence of inscribed tessellations are established mathematics. The contribution is integration: making explicit the chain that connects them.*

A soap bubble forms a sphere. Surface tension shrinks the film until it holds the air with the least surface, and the sphere is that shape.

A builder cannot make that shape. Panels are cut flat, carried flat and joined at finite precision, and a sphere has no flat part. Every structure that can be built therefore has more surface than the sphere enclosing the same volume. The question is how close a buildable structure can come.

**The problem.** Enclose a given volume with the least material.

**P1. Material.** For a thin shell of density $\rho$ and thickness $t$, mass is $M=\rho\,t\,S$. Material is proportional to surface area $S$.

**P2. Buildability.** A structure is built from flat parts, joined at finite precision, and it must hold its shape.

**F1. The sphere is the minimum.** Among all closed surfaces enclosing volume $V$, the sphere alone has the least surface area. For radius $r$,

$$S_{\mathrm{sphere}}=4\pi r^2,\qquad V_{\mathrm{sphere}}=\tfrac{4}{3}\pi r^3,\qquad \frac{S}{V}=\frac{3}{r}.$$

A dome standing on the ground inherits this by reflection across the ground plane, so the hemisphere is the least-area enclosure on a plane.

**F2. Triangles are rigid.** A triangle cannot change shape without changing the length of an edge. A convex polyhedron whose faces are all triangles is first-order rigid.

**F3. Geodesic subdivision converges.** Inscribe a regular icosahedron in a sphere. Subdivide each face into $\nu^2$ triangles and project the new vertices onto the sphere. The result is a convex triangulated polyhedron $\mathcal{P}_\nu$ with

$$S(\mathcal{P}_\nu)\to S_{\mathrm{sphere}},\qquad V(\mathcal{P}_\nu)\to V_{\mathrm{sphere}}\quad\text{as }\nu\to\infty.$$

**Theorem.** *Among flat-faced enclosures of fixed volume $V$, surface area has infimum $S_{\mathrm{sphere}}$, which none attains. Geodesic domes are rigid flat-faced enclosures that approach it: for any $\varepsilon>0$ there exists a frequency $\nu$ with $S(\mathcal{P}_\nu)\le S_{\mathrm{sphere}}+\varepsilon$ at volume $V$.*

**Proof.**

1. Least material at fixed volume means least surface area at fixed volume. (P1)
2. The least surface area is $S_{\mathrm{sphere}}$, attained only by the sphere. (F1)
3. A buildable enclosure is a polyhedron, so its surface area exceeds $S_{\mathrm{sphere}}$. (P2, F1)
4. Each $\mathcal{P}_\nu$ is flat-faced and rigid. Rescaled to enclose exactly $V$, its surface area converges to $S_{\mathrm{sphere}}$, since the scale factor tends to one. (F2, F3)

Hence for any $\varepsilon>0$ some $\nu$ satisfies $S(\mathcal{P}_\nu)\le S_{\mathrm{sphere}}+\varepsilon$. $\square$

**Corollary.** A hemispherical dome on the ground encloses volume $V$ under a surface of $(18\pi)^{1/3}\,V^{2/3}\approx 3.84\,V^{2/3}$. A cube on the ground encloses the same volume under walls and a roof of $5\,V^{2/3}$. The dome covers the same space with 23 percent less surface, and a geodesic dome approaches that figure as its frequency rises.

**Boundary.** The theorem concerns surface area alone. Any sequence of convex triangulated polyhedra converging to the sphere approaches the same minimum, so the geodesic family is one route to it. The theorem makes no statement about strength under load, the number of joints, or the number of distinct panels, each of which grows with frequency.

**Falsification.** The theorem would be false if a buildable enclosure had less surface than the sphere at the same volume, or if the surface areas of a geodesic sequence failed to converge to the sphere's. The second is a finite computation at every frequency. No such case is known.

The soap bubble reaches the sphere because nothing in it is flat. A builder's materials are flat, so the dome approaches the sphere by subdivision. Each increase in frequency brings its surface closer to the minimum, and the remaining gap can be made smaller than any stated tolerance.
