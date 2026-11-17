---
claim: A system that removes errors more slowly than they arrive has a lifespan and one that removes them faster has only a half-life.
---

# Why Some Systems Last and Others Decay

A wooden ship left at anchor rots within a human lifetime. The same ship with a crew replacing its planks can sail for centuries. A body replaces most of its own parts and still fails within a century, while the unbroken line of cells that produced it has not failed in billions of years. We ask what separates the things that last from the things that decay.

The answer is one number. Every such system gains errors at some rate and removes them at some rate. The ratio of removal to arrival decides its fate. Below one, the system has a lifespan, fixed by how many errors it can carry. Above one, it has no lifespan at all. It can still fail by chance, but its chance of failing is the same at every age, and the expected wait grows exponentially with the errors it can carry. The ship and the body obey the same law because the ratio has no units.

This paper presents no new data. The mechanisms described here are established across information theory, reliability theory, probability and thermodynamics. The contribution is integration: making explicit the chain that connects them, so the unified pattern becomes visible and usable. Shannon showed that messages survive a noisy channel with any desired reliability below a critical rate [1]. Von Neumann showed that reliable systems can be built from unreliable parts below a critical fault rate [2]. Landauer showed that erasing information has a minimum cost in energy [3]. We join these into one threshold for the persistence of any system through time.

**Definition 1 (system and reference).** A system is anything that can be in one of many distinguishable states. Its reference is the state, or set of states, in which it does what it is for.

**Definition 2 (error).** An error is one countable departure of the system from its reference: a rotted plank, a flipped bit, a miscopied letter, an altered base. We write $n$ for the number of errors the system carries.

**Definition 3 (margin).** The margin $M$ is the number of errors at which the system stops functioning. It functions while $n$ is below $M$ and has failed when $n$ reaches $M$. Redundancy is margin: spare planks, spare cells, spare copies.

**Definition 4 (rates and ratio).** Errors arise at random at an average rate $a$ per unit time. While the system carries at least one error, correction removes errors at random at an average rate $r$ per unit time. The persistence ratio is $\rho = r/a$. Both rates count the same kind of error over the same unit of time, so the units cancel and $\rho$ is a pure number. It can be compared between a ship and a cell with no conversion.

**Theorem 1 (the persistence threshold).** *Let the lifetime $T$ be the expected time for a system that starts with no errors to reach its margin $M$. For large $M$,*

$$\rho < 1:\quad T \approx \frac{M}{a - r} \qquad\qquad \rho > 1:\quad T \approx \frac{\rho^{M+1}}{a(\rho-1)^{2}}$$

*Below the threshold the lifetime grows in proportion to the margin. Above it the lifetime grows exponentially with the margin. At exactly one it grows as the square of the margin.*

*Proof.* Let $t_k$ be the expected time to go from $k$ errors to $k+1$. From zero errors only an arrival can occur, so $t_0 = 1/a$. From $k \ge 1$ errors the next event is an arrival, which completes the step, or a removal, after which the system must climb from $k-1$ back to $k$ and then on to $k+1$. Averaging over the two gives

$$t_k = \frac{1}{a} + \rho\, t_{k-1} = \frac{1}{a}\left(1 + \rho + \dots + \rho^{k}\right)$$

The lifetime is the sum of $t_k$ for $k$ from $0$ to $M-1$. When $\rho < 1$ each $t_k$ approaches $1/(a-r)$ and the sum approaches $M/(a-r)$. When $\rho > 1$ the last terms dominate and the sum approaches $\rho^{M+1}/a(\rho-1)^2$. When $\rho = 1$ each $t_k$ equals $(k+1)/a$ and the sum is $M(M+1)/2a$. $\square$

Take a system that gains one error a day and fails at twenty. Removing half an error a day, it lasts 38 days. Removing one a day, it lasts 210 days. Removing two a day, it lasts 2,097,130 days, about 5,700 years. Doubling the removal rate across the threshold multiplies the lifetime ten thousand times.

**Corollary 1.1 (lifespan and half-life).** *Below the threshold a system ages. Above it a system is ageless and still mortal.*

Below the threshold errors pile up at the steady net rate $a - r$, so the error count is a clock. Failure comes near the time $M/(a-r)$, and the chance of failing soon rises as that time approaches. A rising chance of failure with age is what aging is. The system has a lifespan.

Above the threshold correction pulls the system back toward zero errors after every arrival, so the system sits near zero and keeps no record of its age. Failure needs a rare unbroken run of bad luck that carries it from near zero all the way to $M$. Each such attempt starts fresh, so the chance of failure per unit time is constant, and waiting times for rare excursions of this kind are known to follow the exponential law [4]. An old system of this kind is exactly as likely to survive the coming year as a new one. It has a half-life, $t_{1/2} = T \ln 2$, and no lifespan. A radioactive atom persists in the same way.

**Corollary 1.2 (the price of persistence).** Suppose a system must last a thousand times longer. Below the threshold its margin must grow a thousandfold, since $T$ is proportional to $M$. Above the threshold, at $\rho = 2$, ten more units of margin suffice, since each unit doubles $T$. In general the margin needed for a lifetime $T$ is

$$\rho < 1:\quad M \approx (a - r)\,T \qquad\qquad \rho > 1:\quad M \approx \frac{\ln T}{\ln \rho}$$

Above the threshold any lifetime can be bought with a margin that grows only as its logarithm. Below the threshold no finite margin buys more than a proportionate lifetime. Shannon's theorem for the noisy channel has the same form: below a critical rate, added redundancy drives the chance of error toward zero exponentially fast, and above it no redundancy does [1].

This holds when added margin does not bring added arrivals in proportion. Where margin comes from spare parts that are themselves exposed to error, $a$ grows with $M$ and the ratio holds only if removal grows with it, as when each part is repaired where it sits. A system whose arrivals grow with its spares while its removal stays fixed is pushed below the threshold by its own redundancy.

Theorem 1 takes the two rates as given. Two further results and a remark say when a system can hold its ratio above one.

**Theorem 2 (the corrector must be better than it is bad).** *Let the corrector attempt repairs at rate $s$. Let each attempt remove an error with probability $f$ and create a new one with probability $c$. Then the effective ratio is*

$$\rho_{\text{eff}} = \frac{s f}{a + s c} < \frac{f}{c}$$

*and it exceeds one only if $f > c$ and $s > a/(f-c)$.*

*Proof.* Attempts remove errors at rate $sf$ and add them at rate $sc$ on top of the arrivals $a$. The ratio of removal to total arrival is $sf/(a+sc)$, which rises toward $f/c$ as $s$ grows and never reaches it. Setting it above one gives $s(f-c) > a$. $\square$

A corrector that breaks as much as it fixes cannot preserve a system at any speed. Working faster helps only a corrector that is already more often right than wrong. Von Neumann found the same kind of limit for circuits built from faulty parts: below a critical fault rate redundancy makes the whole reliable, and above it nothing does [2].

**Theorem 3 (the reference must itself persist).** *If correction restores the system toward a stored reference and the reference gains errors at rate $a_R$ with no correction of its own, then the lifetime grows only in proportion to the margin, as $M/a_R$ plus the delay of copying, however large $\rho$ is.*

*Proof.* Correction returns each part to the reference's version of it. An error in the reference is therefore written into the system when correction next reaches that part, and it is never removed afterward, since the system has nothing else to compare against. Such errors enter at the long-run rate $a_R$ and are permanent. By Theorem 1 with removal zero, permanent errors arriving at rate $a_R$ reach the margin in a time $M/a_R$. $\square$

So the reference needs a persistence ratio above one in its own right, and the reference of the reference after it. The regress closes in two known ways. The first is comparison: several copies are checked against one another and the majority restores the minority, so the reference lives in the agreement among copies and in no single one [2]. The second is selection: many copies exist, those that fail are discarded and those that work are copied again. Selection needs no stored reference, because function itself is the test. It removes errors by removing their carriers, and it has a threshold of its own on how many errors each copying may add [5].

**Remark (removal costs work).** Returning a part from many possible states to one erases information, and erasing information dissipates a minimum of energy [3]. A system cut off from energy therefore has $r = 0$ and decays in a time $M/a$. Persistence belongs only to systems that energy flows through.

The same results read in four materials. A ship at anchor has $r = 0$ and rots in the time $M/a$. A ship with a crew, timber and its builder's lines has a corrector, an energy supply and a reference, and it lasts while the crew replaces planks faster than they rot. A text copied by hand drifts with every copy unless each copy is checked against a count of its letters, which is comparison. A stored message survives on unreliable hardware when its redundant copies are compared and rewritten faster than they flip. A living body replaces most of its parts and so holds most of itself above the threshold, while the parts it cannot replace sit below it and set its lifespan. The line of cells that passes from parent to offspring is kept by selection and has persisted since life began.

**Boundaries.** The theorems assume errors that are countable, of comparable weight and independent, arriving one at a time at steady rates. A single blow that delivers the whole margin at once lies outside the model and adds a constant chance of failure to any system, ageless or aging. Where the corrector itself weakens as errors accumulate, $r$ falls as $n$ rises and a system that begins above the threshold can cross below it. The same happens where errors breed further errors, so that $a$ rises with $n$. Its failure then starts slowly and accelerates. Theorem 1 applies within each stretch where the rates hold steady.

**Falsification.** The theorems follow from the definitions. The claim that can fail is that real systems fit them. The framework would be false if a system measured below the threshold outlasted $M/(a-r)$ many times over, if a system held above the threshold at steady rates showed a chance of failure that rose with its age, if a system persisted with a corrector that broke as much as it fixed or if a system persisted with no energy flowing through it.

Nothing lasts by being made of lasting material. Planks rot, ink fades, molecules break. What lasts is a pattern whose errors are removed faster than they arrive, measured against a reference that is itself kept and paid for in work. Where that holds, age stops counting. Where it fails, the margin is a clock.

**References**

1. Shannon, C. E. (1948). A mathematical theory of communication. *Bell System Technical Journal*, 27, 379–423 and 623–656.
2. von Neumann, J. (1956). Probabilistic logics and the synthesis of reliable organisms from unreliable components. In *Automata Studies* (pp. 43–98). Princeton University Press.
3. Landauer, R. (1961). Irreversibility and heat generation in the computing process. *IBM Journal of Research and Development*, 5(3), 183–191.
4. Keilson, J. (1979). *Markov Chain Models: Rarity and Exponentiality*. Springer.
5. Eigen, M. (1971). Selforganization of matter and the evolution of biological macromolecules. *Naturwissenschaften*, 58, 465–523.
