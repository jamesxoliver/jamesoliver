---
claim: Entropy is the count of the arrangements that fit a description and a shuffled system is found where the count is largest.
---

# Entropy Is a Count

A new deck of cards comes in suits, ace to king. One shuffle and the order is gone and no number of further shuffles brings it back. Entropy is said to measure this as growing disorder. The question is what it measures.

It counts. Entropy is the number of arrangements that fit a description, written as a logarithm. The order of the new deck is one arrangement out of all that fifty-two cards can take and so is every other exact order, each as likely as the next. What differs is the description. "In suits, ace to king" fits one arrangement and "in any order" fits them all. A shuffle lands where the arrangements are and almost all of them fit no description we would call ordered. Disorder is a name for the larger count.

We assume a deck of distinct cards and a fair shuffle, after which every arrangement is equally likely. For a physical body the matching assumption is that an isolated body at rest is equally likely to be found in each arrangement of its parts that has its energy.

**Definition 1.** An *arrangement* is a complete account of where every part is.

**Definition 2.** A *description* is any statement that some arrangements fit and others do not. Its *count* $\Omega$ is the number that fit.

**Definition 3.** The *entropy* of a description is $S = k \ln \Omega$, where $k$ is a fixed constant.

**Theorem 1.** *After a fair shuffle the chance that the deck fits a description $A$ is $\Omega_A/\Omega$, which is $e^{(S_A - S)/k}$, where $\Omega$ and $S$ are the count and the entropy of "in any order."*

*Proof.* Every arrangement is equally likely, so the chance of a description is the share of arrangements that fit it. The second form follows from Definition 3. $\square$

**Corollary 1.** *Every exact order has the same chance and the same entropy, which is zero.*

An exact order is a description that one arrangement fits. For fifty-two cards the count of all arrangements is $52! \approx 8 \times 10^{67}$, so the chance of the order of a new deck is about $10^{-68}$ and the chance of any other named order is the same. Order has no place in the count.

**Corollary 2.** *A shuffle moves a deck from a description with a small count to one with a large count and does not move it back.*

"Sorted into suits" fits $4!\,(13!)^4 \approx 4 \times 10^{40}$ arrangements, with an entropy of $93\,k$ against $156\,k$ for "in any order." The chance that a shuffle lands in suits is the ratio of the counts, about $4 \times 10^{-28}$. Nothing forbids it. There are too few such arrangements among too many. This is the second law for a deck.

**Corollary 3.** *In a system of parts that each take one of $K$ states, a description that fixes $S$ of the parts has the chance $K^{-S}$ whatever the size of the system.*

A system of $N$ such parts has $K^N$ arrangements and the description fits $K^{N-S}$ of them. The ratio is $K^{-S}$ and $N$ has dropped out. The arrangements outside the description outnumber those inside it by $K^S - 1$ to one, so each further part fixed multiplies the odds against it by about $K$.

**Corollary 4.** *The count predicts what is measured, including where the ordered state has the higher entropy.*

The rules of bonding in ice leave each molecule about three halves ways to face. The count gives ice an entropy of $k \ln \tfrac{3}{2}$ for each molecule that remains at the lowest temperatures, which is 3.4 joules for each mole and kelvin. That is what is measured. Hard spheres crowded past about half the volume of their container settle into a regular crystal. The regular packing leaves each sphere more room to move than the jumbled one, so more arrangements fit it and its entropy is the higher of the two.

The count belongs to a description and changes with it. For a physical body the description is fixed by what is held fixed, its energy, its volume and the number of its parts, which is why its entropy is a definite quantity. The result would be false if an isolated body at rest were found in its arrangements with unequal frequency or if a measured entropy departed from $k \ln \Omega$.

The order of the new deck was one arrangement in $52!$ and so was the order that replaced it.

<figure id="deck-figure">
<canvas style="width:100%;aspect-ratio:4/1;box-sizing:border-box;border:1px solid currentColor" aria-label="A small deck of two suits being shuffled"></canvas>
<p><label for="deck-n">Cards in each suit</label> <input id="deck-n" type="range" min="1" max="6" step="1" value="3" style="vertical-align:middle"></p>
<p><output for="deck-n" aria-live="off"></output></p>
<figcaption>A deck of two suits shuffled again and again. The readout counts how often a shuffle lands sorted into suits and sets it beside the ratio of the counts from Theorem 1. Each card added to a suit makes the sorted deck rarer.</figcaption>
</figure>
<script src="entropy-is-a-count.js"></script>
