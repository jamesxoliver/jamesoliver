---
claim: In a thin gas temperature is the motion of the molecules and pressure is that motion times their number in each unit of volume, so pressure is temperature times number.
---

# The Ideal Gas Law

A sealed balloon carried from a warm room into the cold shrinks, though no air has left it. Pressure and temperature are taught as two properties of the air that happen to be linked. The question is why they are linked at all.

They are linked because both measure the motion of the molecules. In a thin gas, with each line holding up to a fixed constant,

<p style="margin-left:2rem">temperature = motion<br>
pressure = motion × number per volume<br>
pressure = temperature × number per volume</p>

The third line follows from the first two and it is the ideal gas law. Seen this way every relation among pressure, temperature and number is plain. The work is to show the first two lines. Nothing here is new. Kinetic theory has held all of it since the nineteenth century. This piece supersedes *The Ideal Gas Tautology* and corrects its claim that the law is true by definition.

We assume a gas is $N$ point particles of mass $m$ that do not interact, spread uniformly through a rigid container of volume $V$. We assume the gas is at rest as a whole, unchanging in time and moving with no preferred direction. We assume a particle striking a wall rebounds with the component of its velocity normal to the wall reversed.

**Definition 1.** The *motion* $w$ is the average energy of a particle's movement as a whole, $w = \tfrac{1}{2}m\langle v^2\rangle$. Rotation and vibration within a molecule are not part of it.

**Definition 2.** The *number per volume* is $n = N/V$.

**Definition 3.** The *pressure* $P$ is the momentum the particles deliver to a wall per unit time per unit area.

**Theorem 1.** *Pressure is two-thirds of the motion times the number per volume, $P = \tfrac{2}{3}\,n\,w$.*

*Proof.* Consider one wall. A particle approaching it with velocity component $v_x$ rebounds and delivers momentum $2mv_x$. Half the particles are moving toward the wall and those within a distance $v_x t$ reach it within a time $t$, so the momentum delivered per unit time per unit area is $P = n\,m\langle v_x^2\rangle$. With no preferred direction $\langle v_x^2\rangle = \tfrac{1}{3}\langle v^2\rangle$. Hence $P = \tfrac{1}{3}\,n\,m\langle v^2\rangle = \tfrac{2}{3}\,n\,w$. $\square$

**Corollary 1.** *The speed of the molecules follows from the pressure and the density $\rho = n\,m$ alone: $\langle v^2\rangle = 3P/\rho$.*

Air at sea level has a pressure near 101 kilopascals and a density near 1.2 kilograms per cubic meter, which gives a speed near 500 meters per second. A barometer and a scale measure how fast the molecules move.

Temperature $T$ is absolute temperature, which is defined without reference to molecules. We assume the gas is in classical thermal equilibrium, where statistical mechanics gives each of the three directions of a particle's movement an average energy of $\tfrac{1}{2}k_B T$.

**Theorem 2.** *Temperature is two-thirds of the motion, $k_B T = \tfrac{2}{3}\,w$.*

*Proof.* Three directions each carry $\tfrac{1}{2}k_B T$, so $w = \tfrac{3}{2}k_B T$. $\square$

Putting one theorem into the other gives $P = n\,k_B T$, which is the ideal gas law $PV = N k_B T$.

**Corollary 2.** *Every relation among pressure, temperature, number and volume can be read off $P = n\,k_B T$.*

Add molecules at a fixed temperature and the pressure rises, which is what pumping a tire does. Warm the gas with the number fixed and the pressure rises. Shrink the volume and the number per volume rises, so the pressure rises, which is Boyle's law. Cool the gas while adding molecules and the pressure goes whichever way the larger change pushes it. The mass of the molecule appears nowhere, so equal volumes of any two thin gases at the same pressure and temperature hold equal numbers of molecules.

The two theorems fail separately. Slow electrons packed densely keep moving as temperature approaches zero, so Theorem 1 holds while Theorem 2 fails. Molecules that attract and repel keep Theorem 2 while their forces add to the pressure, so Theorem 1 fails. The second case shows the law is not true by definition. Define temperature as the motion and an interacting gas still departs from $PV = N k_B T$.

The claim about the world is that real gases approach these conditions as their density falls, so that measured values of $PV/(N k_B T)$ approach one. A real gas at equilibrium whose ratio did not approach one as its density fell would break it.

The balloon in the cold lost no air. Its molecules slowed, their push on the skin fell and the balloon shrank until the push balanced again.

<figure id="gas-figure">
<canvas style="width:100%;aspect-ratio:3/2;box-sizing:border-box;border:1px solid currentColor" aria-label="Point particles bouncing in a box"></canvas>
<p><label for="gas-speed">Motion</label> <input id="gas-speed" type="range" min="50" max="200" step="1" value="100" style="vertical-align:middle"> <label for="gas-count" style="margin-left:1rem">Number</label> <input id="gas-count" type="range" min="20" max="400" step="10" value="150" style="vertical-align:middle"></p>
<p><output for="gas-speed gas-count" aria-live="off"></output></p>
<figcaption>Point particles that do not interact, drawn in two dimensions, where the factor of two-thirds becomes one. The pressure is counted from the momentum the particles deliver to the walls and shown beside the motion times the number per area. The temperature is the motion alone. The first slider moves both. The second moves the pressure and leaves the temperature where it was.</figcaption>
</figure>
<script src="ideal-gas-law.js"></script>
