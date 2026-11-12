---
claim: We either collect energy already in motion or release energy held in a store and what separates the two is whether the source refills faster than we draw on it.
---

# Collect or Release

A mill on a stream turns when the stream runs. A mill below a pond turns when the miller opens the gate. The first collects energy already in motion and the second releases energy held in a store. The question is whether every source of power is one or the other and what follows from which it is.

Every source is a store with a rate of refilling. Draw less than the refilling and the source lasts without end, though it gives no more than arrives. Draw more and the power is ours to choose, though only until the store is empty. To collect is to draw on a source that holds nothing. To release is to draw on a store that does not refill. Sunlight on a field is the first, a seam of coal is the second and the pond is both at once.

We assume energy is conserved. We assume a source holds an energy $E$, is refilled at a steady rate $r$ and is drawn on at a steady power $P$. Losses in conversion scale every case alike and are left out.

**Definition 1.** To *collect* is to draw on a source with $E = 0$. To *release* is to draw on a source with $r = 0$.

**Theorem 1.** *A source drawn at a power $P \le r$ lasts without end. Drawn at $P > r$ it lasts a time*

$$t = \frac{E}{P - r}.$$

*Proof.* The store changes at the rate $r - P$. Where that is zero or more the store never falls. Where it is less the store falls from $E$ to nothing in the time $E/(P - r)$. $\square$

**Corollary 1.** *A collected source gives at most $r$ at every moment.*

With $E = 0$ any draw above $r$ lasts no time at all. The power follows the flow in its size and in its timing. The flow reaching a collector is the flux times its area, so area and the share captured are the only means of raising it. The energy gathered over time has no limit.

**Corollary 2.** *A released source gives any power for a time $E/P$.*

With $r = 0$ the power and its timing are chosen. The energy is $E$ in total at whatever rate it is drawn. Coal, oil and gas refill over millions of years, so against any human span their $r$ is zero.

**Corollary 3.** *A store placed on a flow gives power above the flow for the time $E/(P - r)$ and no more than the flow on average.*

A pond that holds ten hours of the stream runs the mill at twice the stream's power for ten hours. Over a year the mill does no more work than the stream brought. A reservoir behind a dam, a cell charged by sunlight and a woodlot cut and regrown are the same arrangement. Two numbers describe any source, the size of its store and the rate of its refilling.

Real flows rise and fall and the result then holds moment by moment with the flow of that moment. The gate, the pipe and the engine also cap the power and are not counted here. The theorem is the conservation of energy applied to a store and fails only where that fails. What can be wrong for a given source is the measure of its store and of its refilling.

The stream sets the first mill's hours and the miller sets the second's until the pond runs low.

<figure id="store-figure">
<canvas style="width:100%;aspect-ratio:3/2;box-sizing:border-box;border:1px solid currentColor" aria-label="The energy held in a store over time as it is refilled and drawn on"></canvas>
<p><label for="store-e">Store</label> <input id="store-e" type="range" min="0" max="100" step="5" value="60" style="vertical-align:middle"> <label for="store-r" style="margin-left:1rem">Refill</label> <input id="store-r" type="range" min="0" max="10" step="0.5" value="3" style="vertical-align:middle"> <label for="store-p" style="margin-left:1rem">Draw</label> <input id="store-p" type="range" min="0" max="12" step="0.5" value="6" style="vertical-align:middle"></p>
<p><output for="store-e store-r store-p" aria-live="off"></output></p>
<figcaption>The energy in the store across forty-eight hours, stepped forward minute by minute. Set the store to nothing and the source can only be collected. Set the refill to nothing and it can only be released. The time until the store is empty is counted from the steps and shown beside the theorem's value.</figcaption>
</figure>
<script src="collect-or-release.js"></script>
