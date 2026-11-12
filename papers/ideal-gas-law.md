---
claim: The pressure and the temperature of a thin gas are one molecular motion measured twice, as its energy per unit of volume and as its energy per molecule.
---

# The Ideal Gas Law

A sealed balloon carried from a warm room into the cold shrinks, though no air has left it. Carried back, it swells again. Pressure and temperature are taught as two properties of the air that happen to be linked. The question is why they are linked at all.

They are linked because they are one thing measured twice. Both read the energy of the molecules' motion. Pressure is that energy counted per unit of volume. Temperature, in a thin gas at equilibrium, is that energy counted per molecule. They are two sides of one coin and the ideal gas law says no more than this.

Nothing here is new. Kinetic theory has held all of it since the nineteenth century. The contribution is removal: separating what follows from motion alone from what needs a fact about temperature. This piece supersedes *The Ideal Gas Tautology* and corrects its claim that the law is true by definition.

We assume a gas is $N$ point particles that do not interact, in a rigid container of volume $V$ with no external forces inside it. We assume the particles are spread uniformly, that their distribution does not change with time and that a particle striking a stationary wall has the component of its momentum normal to the wall reversed and the other components left unchanged. We assume the motion is isotropic, which means that averaged over the gas every direction carries the same share. We assume the mechanics of a single particle, whose velocity is the rate at which its energy changes with its momentum, $v = d\varepsilon/dp$.

**Definition 1.** The *pressure* $P$ is the momentum the particles deliver to a wall per unit time per unit area.

**Definition 2.** The *translational energy* $E$ is the total kinetic energy of the particles' motion as wholes, measured in the frame where the gas has no bulk flow. Rotation and vibration within molecules are not part of it. We write $u = E/V$ for its density and $n = N/V$ for the number of particles per unit volume.

**Theorem 1.** *If the energy of a particle rises as the power $s$ of its momentum, then $P = (s/3)\,u$. For slow particles with mass, $s = 2$ and $PV = \tfrac{2}{3}E$. For light, $s = 1$ and $P = \tfrac{1}{3}u$.*

*Proof.* Consider one wall. A particle approaching it with momentum component $p_x$ rebounds and delivers $2p_x$. Because the particles are spread uniformly, half of them are moving toward the wall and those within a distance $v_x t$ reach it within a time $t$, so the momentum delivered per unit time per unit area is $P = n\langle p_x v_x\rangle$. By isotropy the product divides equally among three directions, so $\langle p_x v_x\rangle = \tfrac{1}{3}\langle p\,v\rangle$. Where $\varepsilon$ rises as the power $s$ of $p$, $p\,v = p\,d\varepsilon/dp = s\,\varepsilon$. Hence $P = (s/3)\,n\langle\varepsilon\rangle = (s/3)\,u$. For slow particles of mass $m$, $\varepsilon = p^2/2m$ and $s = 2$. For light, $\varepsilon = pc$ and $s = 1$. $\square$

Temperature has not appeared. For slow particles with mass, speed enters the pressure twice, since a faster particle strikes harder and arrives sooner, so its push grows with the square of its speed as its energy does.

**Corollary 1.** *The speed of the molecules of a gas follows from its pressure and its density alone: $\langle v^2\rangle = 3P/\rho$.*

*Proof.* For slow particles $E = \tfrac{1}{2}M\langle v^2\rangle$, where $M$ is the mass of the gas, so Theorem 1 gives $P = \tfrac{1}{3}\rho\langle v^2\rangle$ with $\rho = M/V$. $\square$

Air at sea level is thin enough to meet the assumptions closely. Its pressure is near 101 kilopascals and its density near 1.2 kilograms per cubic meter, which gives a root mean square speed near 500 meters per second. A barometer and a scale measure how fast the molecules move.

Temperature here is absolute thermodynamic temperature. Bodies at the same temperature placed in contact exchange no net energy and the absolute scale fixes its value. It is not defined as an energy. We add one assumption, which is a theorem of classical statistical mechanics: in classical thermal equilibrium at absolute temperature $T$, each independent quadratic momentum term in a particle's energy carries on average $\tfrac{1}{2}k_B T$.

**Theorem 2.** *Where that assumption holds, $PV = N k_B T$.*

*Proof.* A slow particle's translational energy $(p_x^2 + p_y^2 + p_z^2)/2m$ holds three quadratic momentum terms, so $E = \tfrac{3}{2}N k_B T$. With Theorem 1, $PV = \tfrac{2}{3}E = N k_B T$. $\square$

Temperature enters at this step and at no other. Set side by side, the two theorems read

$$P = \frac{2}{3}\,\frac{E}{V},\qquad k_B T = \frac{2}{3}\,\frac{E}{N}.$$

Pressure and temperature are the same energy of motion divided two ways, by the volume and by the number of molecules. Divide the first by the second and the energy cancels, which leaves the gas law, $P = (N/V)\,k_B T$. At fixed volume and particle number the two cannot change independently, because there is only one thing to change.

**Corollary 2.** *The three gas laws are one relation and it holds nothing about the kind of molecule.*

Holding $T$ fixed gives Boyle's law, holding $P$ fixed gives Charles's law and holding $V$ fixed gives Gay-Lussac's law. The mass of the molecule appears nowhere in $PV = N k_B T$, so equal volumes of any two thin gases at the same pressure and temperature hold equal numbers of molecules. Heavier molecules move more slowly by exactly the amount that keeps their push the same.

**Corollary 3.** *The two theorems fail separately.*

In a free, nonrelativistic gas of electrons packed so densely that quantum rules keep them moving as temperature approaches zero, pressure still equals two-thirds of the kinetic energy density as Theorem 1 requires, while classical equipartition fails and Theorem 2 fails with it. In a classical gas whose molecules attract and repel, the reverse holds. Equipartition of translational energy survives, while the forces between molecules add a contribution to pressure that the free-particle calculation lacks, so Theorem 1 no longer gives the pressure. Attraction lowers the pressure, repulsion raises it and molecules of finite size, which repel on contact, press harder than points would.

The interacting gas also settles whether the law is true by definition. Define temperature as average kinetic energy and such a gas still departs from $PV = N k_B T$ while the definition stands. The law rests on a physical condition, that the particles do not interact, which no definition supplies.

Where motion favors one direction, isotropy fails and pressure differs from wall to wall. Where energy is not a single power of momentum, the relation $P = \tfrac{1}{3}n\langle p\,v\rangle$ remains while the ratio of pressure to energy density need not be constant. The result for light holds for any isotropic radiation.

Within their conditions the two results are theorems and a gas that violates the conditions shows only that the conditions matter. What can fail is the claim about the world, which is that real gases at equilibrium, held at a fixed temperature, approach the conditions of the first assumption as their density falls, so that measured values of $PV/(N k_B T)$ approach one. It would be broken by a real gas at equilibrium and fixed temperature whose ratio did not approach one as its density fell, by isotropic radiation pressing with other than one-third of its energy density or by a classical gas in equilibrium whose translational kinetic energy per particle differed from $\tfrac{3}{2}k_B T$.

A pressure gauge counts impacts. In a thin classical gas a thermometer reads the energy of the same motion. The balloon in the cold lost no air. Its molecules slowed and at the same volume their push on the skin fell, so the balloon contracted until the outward push of the gas again balanced the pull of the stretched skin and the pressure of the air outside.

<figure id="gas-figure">
<canvas style="width:100%;aspect-ratio:3/2;box-sizing:border-box;border:1px solid currentColor" aria-label="Point particles bouncing in a box"></canvas>
<p><label for="gas-speed">Speed</label> <input id="gas-speed" type="range" min="50" max="200" step="1" value="100" style="vertical-align:middle"> <label for="gas-count" style="margin-left:1rem">Particles</label> <input id="gas-count" type="range" min="20" max="400" step="10" value="150" style="vertical-align:middle"></p>
<p><output for="gas-speed gas-count" aria-live="off"></output></p>
<figcaption>Point particles that do not interact, drawn in two dimensions. The pressure is counted from the momentum the particles deliver to the walls and shown beside the energy of their motion per unit of area, which is what Theorem 1 requires in two dimensions. The temperature is the same energy per particle. Speed moves both. Adding particles raises the pressure and leaves the temperature where it was.</figcaption>
</figure>
<script src="ideal-gas-law.js"></script>
