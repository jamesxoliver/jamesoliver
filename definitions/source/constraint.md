# Constraint

**Constraint:** A boundary that makes at least one possible configuration or transition unavailable.

Let Ω be a possibility space and let C be the configurations or transitions permitted after a constraint is imposed. A constraint produces a proper subset:

> C ⊊ Ω

For a finite space, |C| < |Ω|. In a continuous space, a proper subset can differ by measure zero. For the constraint to add measurable information under the chosen measure, the measure must decrease:

> μ(C) < μ(Ω)

If C = Ω, the proposed constraint eliminates nothing and adds no information. If C is empty, the constraints are incompatible because no configuration or transition satisfies them together.

Adding a constraint does not necessarily add new information. Two constraints may eliminate the same possibilities, so the second is redundant. What matters is the independent reduction in the possibility space, not the number of constraints stated.

Constraint and information describe the same reduction from opposite sides. Constraint is the boundary imposed. Information is the possibility eliminated.
