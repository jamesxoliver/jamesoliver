---
claim: In a thin gas temperature is the motion of the molecules and pressure is that motion times their number in each unit of volume, so pressure is temperature times number.
---

# The Ideal Gas Law

A sealed balloon carried from a warm room into the cold shrinks, though no air has left it. Carried back, it swells again. Pressure and temperature are taught as two properties of the air that happen to be linked. The question is why they are linked at all.

They are linked because both measure the motion of the molecules. In a thin gas, with each line holding up to a fixed constant,

<p style="margin-left:2rem">temperature = motion<br>
pressure = motion × number per volume<br>
pressure = temperature × number per volume</p>

The third line follows from the first two and it is the ideal gas law. Seen this way every relation among pressure, temperature and number is plain. Warm the gas with the number fixed and the pressure must rise, because the two are reading the same motion. The work is to show the first two lines.

Nothing here is new. Kinetic theory has held all of it since the nineteenth century. The contribution is removal: two names are traced back to the one motion they both measure. This piece supersedes *The Ideal Gas Tautology* and corrects its claim that the law is true by definition.

We assume a gas is $N$ point particles that do not interact, in a rigid container of volume $V$ with no external forces inside it. We assume the particles are spread uniformly, that their distribution does not change with time and that a particle striking a stationary wall has the component of its momentum normal to the wall reversed and the other components left unchanged. We assume the motion is isotropic, which means that averaged over the gas every direction carries the same share. We assume the mechanics of a single particle, whose velocity is the rate at which its energy changes with its momentum, $v = d\varepsilon/dp$.

**Definition 1.** The *motion* $w$ is the average energy of a particle's movement as a whole, measured in the frame where the gas has no bulk flow. Rotation and vibration within a molecule are not part of it.

**Definition 2.** The *number per volume* is $n = N/V$.

**Definition 3.** The *pressure* $P$ is the momentum the particles deliver to a wall per unit time per unit area.

**Theorem 1.** *Pressure is two-thirds of the motion times the number per volume, $P = \tfrac{2}{3}\,n\,w$. More generally, if the energy of a particle rises as the power $s$ of its momentum, then $P = (s/3)\,n\,w$, so that for light the factor is one-third.*

*Proof.* Consider one wall. A particle approaching it with momentum component $p_x$ rebounds and delivers $2p_x$. Because the particles are spread uniformly, half of them are moving toward the wall and those within a distance $v_x t$ reach it within a time $t$, so the momentum delivered per unit time per unit area is $P = n\langle p_x v_x\rangle$. By isotropy the product divides equally among three directions, so $\langle p_x v_x\rangle = \tfrac{1}{3}\langle p\,v\rangle$. Where $\varepsilon$ rises as the power $s$ of $p$, $p\,v = p\,d\varepsilon/dp = s\,\varepsilon$. Hence $P = (s/3)\,n\langle\varepsilon\rangle = (s/3)\,n\,w$. For slow particles of mass $m$, $\varepsilon = p^2/2m$ and $s = 2$. For light, $\varepsilon = pc$ and $s = 1$. $\square$

Temperature has not appeared. For slow particles with mass, speed enters the pressure twice, since a faster particle strikes harder and arrives sooner, so its push grows with the square of its speed as its energy does.

**Corollary 1.** *The speed of the molecules of a gas follows from its pressure and its density alone: $\langle v^2\rangle = 3P/\rho$.*

*Proof.* For slow particles of mass $m$, $w = \tfrac{1}{2}m\langle v^2\rangle$, so Theorem 1 gives $P = \tfrac{1}{3}\,n\,m\langle v^2\rangle = \tfrac{1}{3}\rho\langle v^2\rangle$, where $\rho = n\,m$ is the density. $\square$

Air at sea level is thin enough to meet the assumptions closely. Its pressure is near 101 kilopascals and its density near 1.2 kilograms per cubic meter, which gives a root mean square speed near 500 meters per second. A barometer and a scale measure how fast the molecules move.

Temperature $T$ is absolute thermodynamic temperature, which is defined without reference to molecules. Bodies at the same temperature placed in contact exchange no net energy and the absolute scale fixes its value. We add one assumption, which is a theorem of classical statistical mechanics: in classical thermal equilibrium at absolute temperature $T$, each independent quadratic momentum term in a particle's energy carries on average $\tfrac{1}{2}k_B T$.

**Theorem 2.** *Where that assumption holds, temperature is two-thirds of the motion, $k_B T = \tfrac{2}{3}\,w$.*

*Proof.* A slow particle's energy of movement $(p_x^2 + p_y^2 + p_z^2)/2m$ holds three quadratic momentum terms, so $w = \tfrac{3}{2}k_B T$. $\square$

The two theorems are the first two lines of the opening with their constants.

$$k_B T = \tfrac{2}{3}\,w,\qquad P = \tfrac{2}{3}\,n\,w.$$

The third line follows by putting one into the other, $P = n\,k_B T$, which is the ideal gas law $PV = N k_B T$. Pressure is temperature times the number per volume because pressure is the motion times that number and temperature is the motion. Nothing in the law goes beyond the two theorems. What it contains lies in them, each of which rests on its conditions and can fail.

**Corollary 2.** *Every relation among pressure, temperature, number and volume can be read off $P = n\,k_B T$.*

Add molecules at a fixed temperature and the pressure rises, which is what pumping a tire does. Warm the gas with the number fixed and the pressure rises. Shrink the volume with the number and the temperature fixed and the number per volume rises, so the pressure rises, which is Boyle's law. Cool the gas while adding molecules and the pressure goes whichever way the larger change pushes it. Charles's law and Gay-Lussac's law are the same line with a different quantity held fixed. The mass of the molecule appears nowhere in it, so equal volumes of any two thin gases at the same pressure and temperature hold equal numbers of molecules. Heavier molecules move more slowly by exactly the amount that keeps their push the same.

**Corollary 3.** *The two theorems fail separately.*

In a free, nonrelativistic gas of electrons packed so densely that quantum rules keep them moving as temperature approaches zero, pressure is still two-thirds of the motion times the number per volume as Theorem 1 requires, while classical equipartition fails and Theorem 2 fails with it. In a classical gas whose molecules attract and repel, the reverse holds. Equipartition of the energy of movement survives, while the forces between molecules add a contribution to pressure that the free-particle calculation lacks, so Theorem 1 no longer gives the pressure. Attraction lowers the pressure, repulsion raises it and molecules of finite size, which repel on contact, press harder than points would.

The interacting gas also settles whether the law is true by definition. Define temperature as the motion and such a gas still departs from $PV = N k_B T$ while the definition stands. The law rests on a physical condition, that the particles do not interact, which no definition supplies.

Where motion favors one direction, isotropy fails and pressure differs from wall to wall. Where energy is not a single power of momentum, the relation $P = \tfrac{1}{3}n\langle p\,v\rangle$ remains while the ratio of pressure to energy density need not be constant. The result for light holds for any isotropic radiation.

Within their conditions the two results are theorems and a gas that violates the conditions shows only that the conditions matter. What can fail is the claim about the world, which is that real gases at equilibrium, held at a fixed temperature, approach the conditions of the first assumption as their density falls, so that measured values of $PV/(N k_B T)$ approach one. It would be broken by a real gas at equilibrium and fixed temperature whose ratio did not approach one as its density fell, by isotropic radiation pressing with other than one-third of its energy density or by a classical gas in equilibrium whose motion differed from $\tfrac{3}{2}k_B T$.

The balloon in the cold lost no air. Its molecules slowed and at the same volume their push on the skin fell, so the balloon contracted until the outward push of the gas again balanced the pull of the stretched skin and the pressure of the air outside.

<figure id="gas-figure">
<canvas style="width:100%;aspect-ratio:3/2;box-sizing:border-box;border:1px solid currentColor" aria-label="Point particles bouncing in a box"></canvas>
<p><label for="gas-speed">Motion</label> <input id="gas-speed" type="range" min="50" max="200" step="1" value="100" style="vertical-align:middle"> <label for="gas-count" style="margin-left:1rem">Number</label> <input id="gas-count" type="range" min="20" max="400" step="10" value="150" style="vertical-align:middle"></p>
<p><output for="gas-speed gas-count" aria-live="off"></output></p>
<figcaption>Point particles that do not interact, drawn in two dimensions, where the factor of two-thirds becomes one. The pressure is counted from the momentum the particles deliver to the walls and shown beside the motion times the number per area. The temperature is the motion alone. The first slider moves both. The second moves the pressure and leaves the temperature where it was.</figcaption>
</figure>
<script src="ideal-gas-law.js"></script>
