---
claim: To move mass over land with the least energy roll it on hard wheels over hard rails in one long line and the energy for each tonne falls toward the rolling loss of the wheel.
---

# Moving Mass Over Land

A horse on a level iron track draws several times the load it can draw in a cart on a road. The horse is the same and the load is heavier. The question is what sets the least energy that will move a tonne a kilometer over land and how close we can come to it.

On level ground the ground carries the weight for nothing, so a moving load pays for two things only. It pays for the give of the wheel and the surface as it rolls and it pays for the air it pushes aside. A hard wheel on a hard rail cuts the first. Coupling the cars in one line cuts the second, because the line breaks the air once and every car behind shares that cost. With each car added the energy for each tonne falls toward the rolling loss of the wheel alone. It never arrives. The same hardness that makes the rolling cheap leaves little grip, so a train can neither climb nor stop quickly and needs a flat road built for it.

We assume level straight track, steady speed and still air. We assume the force to keep a load rolling is its weight times a rolling coefficient $c$ fixed by the wheel and the surface. We assume the air resists a line of vehicles with a force $q\,(a + Ns)$, where $q = \tfrac{1}{2}\rho v^2$ for air of density $\rho$ at speed $v$, $a$ is the drag area of the front and rear of the line, $s$ is the drag area of the sides of one car and $N$ is the number of cars. Losses in the drive multiply every case alike and are left out.

**Definition 1.** The *specific energy* $e$ is the energy spent for each unit of mass moved through each unit of distance. At steady speed it is the resisting force divided by the mass.

**Theorem 1.** *For $N$ coupled cars of mass $m$ each,*

$$e_N = c\,g + \frac{q\,s}{m} + \frac{q\,a}{N\,m}.$$

*It falls with every car added and approaches $e_\infty = c\,g + q\,s/m$ without reaching it. For the same cars running apart it is $c\,g + q\,(s + a)/m$ whatever their number.*

*Proof.* The line weighs $Nmg$, so it rolls against a force $c\,Nmg$ and moves through the air against $q\,(a + Ns)$. Dividing the sum by the mass $Nm$ gives $e_N$. Only the last term holds $N$ and it falls as $1/N$, which is positive for every finite $N$. A car running alone is a line of one and pays for its own front. $\square$

**Corollary 1.** *At low speed the floor is $c\,g$, which depends on the wheel and the surface and on nothing else.*

As $v$ falls $q$ falls with its square and the air terms vanish. Steel wheels on steel rails have $c$ between 0.001 and 0.002, which puts the floor between 10 and 20 kilojoules for each tonne moved a kilometer. Rubber tires on pavement have $c$ between 0.006 and 0.010, which puts it between 60 and 100. The rolling loss is the energy of deformation that the wheel and the surface do not give back and a harder pair deforms less.

**Corollary 2.** *A train whose driven wheels carry a fraction $f$ of its weight climbs no slope steeper than $\mu f - c$ and stops in no less than $v^2/2\mu g$, where $\mu$ is the grip of wheel on rail.*

*Proof.* The driven wheels can push with at most $\mu$ times the weight they carry, which is $\mu f$ times the weight of the train. On a gentle slope the weight pulls back with the slope times the weight and the rolling loss with $c$ times the weight. The first must cover the other two. In braking every wheel can hold back with at most $\mu$ times its load, so the train slows at no more than $\mu g$. $\square$

Steel on steel grips with $\mu$ between 0.1 and 0.3, where rubber on a dry road grips with 0.7 or more. A locomotive of 100 tonnes drawing forty cars of 100 tonnes carries one part in forty-one of the weight on its driven wheels, so with a grip of 0.25 it climbs less than half of one percent. A truck with half its weight on its driven wheels climbs slopes many times steeper. The longer the train the nearer it comes to the floor and the flatter its road must be.

The result covers loads that roll on level ground at steady speed. Slopes, curves and stops add energy the theorem does not count. Loads held up by magnets or run through tubes emptied of air lie outside it. It would be false if a wheel and a surface in service rolled with less loss than steel on steel under the same load or if the measured resistance for each tonne of a train did not fall as cars were added.

The horse on the iron track meets the same air and a tenth of the give under the wheels.

<figure id="rail-figure">
<canvas style="width:100%;aspect-ratio:3/2;box-sizing:border-box;border:1px solid currentColor" aria-label="A line of coupled cars and the energy for each tonne against the number of cars"></canvas>
<p><label for="rail-cars">Cars</label> <input id="rail-cars" type="range" min="1" max="100" step="1" value="5" style="vertical-align:middle"> <label for="rail-speed" style="margin-left:1rem">Speed</label> <input id="rail-speed" type="range" min="10" max="120" step="5" value="80" style="vertical-align:middle"></p>
<p><output for="rail-cars rail-speed" aria-live="off"></output></p>
<figcaption>Theorem 1 computed for cars of 90 tonnes with a rolling coefficient of 0.0015, a front of 10 square meters and sides of 2 square meters for each car. The curve is the energy for each tonne moved a kilometer. The lower line is the floor it approaches and the upper line is the same cars running apart.</figcaption>
</figure>
<script src="moving-mass-over-land.js"></script>
