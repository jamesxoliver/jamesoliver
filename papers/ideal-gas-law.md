---
claim: In a thin gas temperature is the motion of the molecules and pressure is that motion times their number in each unit of volume, so pressure is temperature times number.
---

# The Ideal Gas Law

A sealed balloon carried from a warm room into the cold shrinks, though no air has left it. Pressure and temperature are taught as two properties of the air that happen to be linked. The question is why they are linked at all.

They are linked because both measure the motion of the molecules. In a thin gas, with each line holding up to a fixed constant,

<p style="margin-left:2rem">temperature = motion<br>
pressure = motion × number per volume<br>
pressure = temperature × number per volume</p>

The third line follows from the first two and it is the ideal gas law. The work is to show the first two.

We assume a gas is $N$ point particles of mass $m$ that do not interact, spread uniformly through a volume $V$ and moving with no preferred direction. We write $n = N/V$ for the number per volume.

**Definition 1.** The *motion* $w$ is the average energy of a particle's movement, $w = \tfrac{1}{2}m\langle v^2\rangle$.

**Theorem 1.** *Pressure is two-thirds of the motion times the number per volume, $P = \tfrac{2}{3}\,n\,w$.*

*Proof.* Pressure is the momentum delivered to a wall per unit time per unit area. A particle approaching the wall with velocity component $v_x$ rebounds and delivers $2mv_x$. Half the particles are moving toward the wall and those within a distance $v_x t$ reach it within a time $t$, so $P = n\,m\langle v_x^2\rangle$. With no preferred direction $\langle v_x^2\rangle = \tfrac{1}{3}\langle v^2\rangle$. Hence $P = \tfrac{1}{3}\,n\,m\langle v^2\rangle = \tfrac{2}{3}\,n\,w$. $\square$

We assume the gas is in classical thermal equilibrium at absolute temperature $T$, where statistical mechanics gives each of the three directions of a particle's movement an average energy of $\tfrac{1}{2}k_B T$.

**Theorem 2.** *Temperature is two-thirds of the motion, $k_B T = \tfrac{2}{3}\,w$.*

*Proof.* Three directions each carry $\tfrac{1}{2}k_B T$, so $w = \tfrac{3}{2}k_B T$. $\square$

Putting one theorem into the other gives $P = n\,k_B T$, which is the ideal gas law.

**Corollary 1.** *Every relation among pressure, temperature and number can be read off $P = n\,k_B T$.*

Add molecules at a fixed temperature and the pressure rises. Warm the gas with the number fixed and the pressure rises. Cool the gas while adding molecules and the pressure goes whichever way the larger change pushes it.

The result stops where the assumptions do. Molecules that attract and repel add to the pressure, so a dense gas departs from the law. It would be false if a real gas at equilibrium did not approach $P = n\,k_B T$ as its density fell.

The balloon in the cold lost no air. Its molecules slowed and their push on the skin fell.

<figure id="gas-figure">
<canvas style="width:100%;aspect-ratio:3/2;box-sizing:border-box;border:1px solid currentColor" aria-label="Point particles bouncing in a box"></canvas>
<p><label for="gas-speed">Motion</label> <input id="gas-speed" type="range" min="50" max="200" step="1" value="100" style="vertical-align:middle"> <label for="gas-count" style="margin-left:1rem">Number</label> <input id="gas-count" type="range" min="20" max="400" step="10" value="150" style="vertical-align:middle"></p>
<p><output for="gas-speed gas-count" aria-live="off"></output></p>
<figcaption>Point particles that do not interact, drawn in two dimensions, where the factor of two-thirds becomes one. The pressure is counted from the momentum the particles deliver to the walls and shown beside the motion times the number per area. The temperature is the motion alone. The first slider moves both. The second moves the pressure and leaves the temperature where it was.</figcaption>
</figure>
<script src="ideal-gas-law.js"></script>
