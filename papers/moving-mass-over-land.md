---
claim: Moving mass over level land costs only friction with the ground and with the air, which hard wheels on hard rails and cars coupled in one line each drive toward zero.
---

# Moving Mass Over Land

A horse on a level iron track draws several times the load it can draw in a cart on a road. The horse is the same and the load is heavier. The question is what the energy of moving a load goes to and how little of it will do.

On level ground the ground holds the weight for nothing. A load moving at steady speed spends energy on two things only, friction with the ground and friction with the air. Drive both to zero and a load once moving would roll on for nothing. Neither reaches zero. A hard wheel on a hard rail brings the first close. Coupling the cars in one line brings the second closer with every car added, because the line breaks the air once and the cars behind share that cost.

We assume level straight track, steady speed and still air. We assume the force to keep a load rolling is its weight times a rolling coefficient $c$ fixed by the wheel and the surface. We assume the air resists a line of $N$ cars with a force $q\,(a + Ns)$, where $q = \tfrac{1}{2}\rho v^2$ for air of density $\rho$ at speed $v$, $a$ is the drag area of the front and rear of the line and $s$ is the drag area of the sides of one car.

**Definition 1.** The *specific energy* $e$ is the energy spent for each unit of mass moved through each unit of distance. At steady speed it is the resisting force divided by the mass.

**Theorem 1.** *For $N$ coupled cars of mass $m$ each, the specific energy is friction with the ground plus friction with the air,*

$$e_N = c\,g + \frac{q\,s}{m} + \frac{q\,a}{N\,m}.$$

*Proof.* The line weighs $Nmg$, so it rolls against a force $c\,Nmg$ and moves through the air against $q\,(a + Ns)$. Dividing the sum by the mass $Nm$ gives $e_N$. $\square$

**Corollary 1.** *Friction with the ground depends on the wheel and the surface and on nothing else.*

It is the first term, $c\,g$. Steel wheels on steel rails have $c$ between 0.001 and 0.002, which is 10 to 20 kilojoules for each tonne moved a kilometer. Rubber tires on pavement have $c$ between 0.006 and 0.010, which is 60 to 100. The loss is the energy of deformation that the wheel and the surface do not give back and a harder pair deforms less.

**Corollary 2.** *Coupling divides the cost of breaking the air among the cars and leaves friction with the ground as it was.*

Only the last term holds $N$. A car running alone is a line of one and pays $q\,a/m$ for its own front. In a line of $N$ that cost is paid once and each car bears $1/N$ of it. The saving grows with speed, since $q$ rises as its square. At a crawl it is nothing.

**Corollary 3.** *A train whose driven wheels carry a fraction $f$ of its weight climbs no slope steeper than $\mu f - c$, where $\mu$ is the grip of wheel on rail.*

*Proof.* The driven wheels push with at most $\mu$ times the weight they carry, which is $\mu f$ times the weight of the train. On a gentle slope the weight pulls back with the slope times the weight and the rolling loss with $c$ times the weight. The first must cover the other two. $\square$

The friction that resists and the friction that pushes fall together. Steel on steel grips with $\mu$ between 0.1 and 0.3, where rubber on a dry road grips with 0.7 or more. A locomotive of 100 tonnes drawing forty cars of 100 tonnes carries one part in forty-one of the weight on its driven wheels, so with a grip of 0.25 it climbs less than half of one percent. The longer the train the less it spends and the flatter its road must be.

The result covers loads that roll on level ground at steady speed. Slopes, curves and stops add energy it does not count. Loads held up by magnets or run through tubes emptied of air lie outside it. It would be false if a wheel and a surface in service rolled with less loss than steel on steel under the same load or if the measured resistance for each tonne of a train did not fall as cars were added.

The horse on the iron track meets the same air and far less give under the wheels.

<figure id="rail-figure">
<canvas style="width:100%;aspect-ratio:3/2;box-sizing:border-box;border:1px solid currentColor" aria-label="A line of coupled cars and the energy for each tonne against the number of cars"></canvas>
<p><label for="rail-cars">Cars</label> <input id="rail-cars" type="range" min="1" max="100" step="1" value="5" style="vertical-align:middle"> <label for="rail-speed" style="margin-left:1rem">Speed</label> <input id="rail-speed" type="range" min="10" max="120" step="5" value="80" style="vertical-align:middle"></p>
<p><output for="rail-cars rail-speed" aria-live="off"></output></p>
<figcaption>Theorem 1 computed for cars of 90 tonnes with a rolling coefficient of 0.0015, a front of 10 square meters and sides of 2 square meters for each car. The curve is the energy for each tonne moved a kilometer. The lower line is what an endless train would spend and the upper line is the same cars running apart.</figcaption>
</figure>
<script src="moving-mass-over-land.js"></script>
