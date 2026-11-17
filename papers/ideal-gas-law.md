---
claim: Temperature is the energy each molecule of a thin gas carries and pressure is the push the crowd of molecules delivers to a surface, so they are two measurements of one motion and the gas law relates them.
---

# The Ideal Gas Law

<style>
#gas-figure { margin: 1.5rem 0 2rem; --t: #d65a1f; --p: #7041c9; --v: #2f62cf; }
@media (prefers-color-scheme: dark) { #gas-figure { --t: #ff8a4c; --p: #b694ff; --v: #7ea2ff; } }
#gas-figure canvas { width: 100%; display: block; }
#gas-figure i { font-family: "STIX Two Text", "Cambria Math", "Times New Roman", serif; }
#gas-figure .laws { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; font-size: 1.6rem; margin: 0 0 .5rem; }
#gas-figure .row { display: grid; grid-template-columns: 1.5rem 1fr; gap: .75rem; align-items: center; margin: .4rem 0; font-size: 1.2rem; }
#gas-figure input[type=range] { width: 100%; margin: 0; }
#gas-figure .out { display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; margin-top: .9rem; font-size: 1.2rem; }
#gas-figure .out b { display: block; font-weight: normal; font-variant-numeric: tabular-nums; font-size: 1.35rem; }
#gas-figure .frac { display: inline-flex; flex-direction: column; align-items: center; font-size: 1rem; line-height: 1.1; }
#gas-figure .frac > span:first-child { border-bottom: 1px solid currentColor; padding: 0 3px; }
#gas-figure .gap { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
#gas-figure .t { color: var(--t); } #gas-figure .p { color: var(--p); } #gas-figure .v { color: var(--v); }
</style>
<figure id="gas-figure" style="margin-left:0;margin-right:0">
<p class="laws" aria-label="k T equals two thirds w. P equals two thirds n w."><span><i>k</i><i class="t">T</i> = ⅔ <i>w</i></span><span class="gap"> and </span><span><i class="p">P</i> = ⅔ <i>n w</i></span></p>
<canvas role="img" aria-label="Particles bounce in a closed box. Pressure is measured at the walls, where each hit flashes and fills a gauge. Temperature is measured from the particles themselves, as the spread of their speeds."></canvas>
<div class="row"><label for="gas-speed"><i>w</i></label><input id="gas-speed" type="range" min="0" max="100" step="1" value="50" aria-label="Motion of each particle"></div>
<div class="row"><label for="gas-count"><i>N</i></label><input id="gas-count" type="range" min="40" max="400" step="10" value="150" aria-label="Number of particles"></div>
<div class="out" aria-live="off">
<div><i class="t">T</i><b id="gas-T" class="t">1.00</b></div>
<div><i class="p">P</i><b id="gas-P" class="p">1.00</b></div>
<div><span class="frac"><span><i class="p">P</i><i class="v">V</i></span><span><i>N k</i><i class="t">T</i></span></span><b id="gas-Z">1.00</b></div>
</div>
</figure>
<script src="ideal-gas-law.js"></script>

A sealed balloon carried from a warm room into the cold shrinks, though no air has left it. Pressure and temperature are taught as two properties of the air that happen to be linked. The question is what each one is and why they are linked.

Neither belongs to a single molecule. Each is a measurement of the crowd. Temperature measures the energy each molecule carries in its movement. Pressure measures the push the crowd delivers to a surface, which depends on that same energy and on how many molecules there are in each unit of volume. The two measurements are different and the gas law holds because one motion sets both. In a thin gas, with each line holding up to a fixed constant,

<p style="margin-left:2rem">temperature = motion per molecule<br>
pressure = motion per molecule × number per volume<br>
pressure = temperature × number per volume</p>

The third line follows from the first two and it is the ideal gas law. The work is to show the first two and then to show where the two measurements come apart.

We assume a gas is $N$ point particles of mass $m$ that do not interact, spread uniformly through a volume $V$ and moving with no preferred direction. We write $n = N/V$ for the number per volume.

**Definition 1.** The *motion* $w$ is the average energy of a particle's movement, $w = \tfrac{1}{2}m\langle v^2\rangle$.

The first measurement is made at a wall.

**Theorem 1.** *Pressure is two-thirds of the motion times the number per volume, $P = \tfrac{2}{3}\,n\,w$.*

*Proof.* Pressure is the momentum delivered to a wall per unit time per unit area. A particle approaching the wall with velocity component $v_x$ rebounds and delivers $2mv_x$. Half the particles are moving toward the wall and those within a distance $v_x t$ reach it within a time $t$, so $P = n\,m\langle v_x^2\rangle$. With no preferred direction $\langle v_x^2\rangle = \tfrac{1}{3}\langle v^2\rangle$. Hence $P = \tfrac{1}{3}\,n\,m\langle v^2\rangle = \tfrac{2}{3}\,n\,w$. $\square$

The second measurement needs no wall. Temperature is what a thermometer reads and a thermometer reads the state that two bodies share once heat stops flowing between them. We assume the gas is in classical thermal equilibrium at absolute temperature $T$, where statistical mechanics gives each of the three directions of a particle's movement an average energy of $\tfrac{1}{2}k_B T$. This assumption carries the physics of the piece. It says that bodies exchanging heat settle to equal energy of movement per molecule.

**Theorem 2.** *Temperature is two-thirds of the motion, $k_B T = \tfrac{2}{3}\,w$.*

*Proof.* Three directions each carry $\tfrac{1}{2}k_B T$, so $w = \tfrac{3}{2}k_B T$. $\square$

The number per volume appears in Theorem 1 and is absent from Theorem 2. That absence is the difference between the two measurements. Putting one theorem into the other gives $P = n\,k_B T$, which is the ideal gas law.

**Corollary 1.** *Adding molecules at a fixed motion raises the pressure in proportion and leaves the temperature unchanged.*

*Proof.* With $w$ fixed, Theorem 1 makes $P$ proportional to $n$ and Theorem 2 fixes $T$. $\square$

**Corollary 2.** *Two thin gases separated by a fixed wall that lets heat through settle to equal temperatures and their pressures then stand in the ratio of their numbers per volume.*

*Proof.* Heat flows through the wall until the two share a temperature, so by Theorem 2 they share a motion $w$. By Theorem 1 their pressures are $\tfrac{2}{3}n_1 w$ and $\tfrac{2}{3}n_2 w$. $\square$

A wall free to move would also equalize the pressures, which is why the wall in Corollary 2 is fixed. Across it the two measurements part. The gases agree on temperature and disagree on pressure for as long as their numbers per volume differ.

They part in the other direction too. A beam of molecules all moving one way at one speed pushes on any surface it strikes and the push depends on which way the surface faces. Its energy is not shared among the three directions, so it is not in the equilibrium Theorem 2 assumes and it has no single temperature. The push needs only motion and number. The temperature needs the motion to have settled.

The result stops where the assumptions do. Molecules that take up room add to the push and their attraction takes from it, so a dense gas departs from the law. The arithmetic of the two theorems cannot fail. The claim about the world is the assumption behind Theorem 2 and it would be false if two thin gases on either side of a fixed wall that lets heat through settled to unequal energies of movement per molecule, or if a real gas at equilibrium did not approach $P = n\,k_B T$ as its density fell.

The balloon in the cold lost no air. Its molecules slowed, each carried less energy and the balloon shrank until the slower, more crowded molecules pushed back as hard as the air outside.
