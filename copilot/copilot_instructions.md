# KCD2 Calculator — Copilot Instructions

## Purpose
This document serves as the authoritative reference for the KCD2 Calculator web application. 

## Related Documents
For detailed information on potion recipes, ingredients, and their properties, refer to: potion_reference.md

---

## Business Rules and Calculation Logic

### Calculate Potions from Available Ingredients

**Purpose:** Given a set of available ingredients with quantities, determine how many of each potion can be successfully crafted.

**Algorithm:**
1. For each potion recipe:
   - For each required ingredient, calculate: `floor(available_batch_quantity / required_batch_quantity)`
   - The craftable batch count for that potion is the **minimum** of all per-ingredient quotients.
   - If any required ingredient is missing (quantity = 0) or unavailable, craftable count = 0.
2. Return a dictionary mapping `potion_id` to `{craftable_batch_count, limiting_ingredient_id}` (optional: list limiting ingredients).

**Example:**
- Available: `{ing_sage: 10, ing_mint: 5, ing_wormwood: 8}`
- Potion `lion` requires: Sage 2, Mint 2
- Calculations:
  - Sage: `10 // 2 = 5`
  - Mint: `5 // 2 = 2`
  - Result: `{craftable_batch_count: 2, limiting_ingredient: ing_mint}`

### Calculate Ingredients Required for Requested Potions

**Purpose:** Given a set of requested potions and their quantities, determine the total ingredients needed.

**Algorithm:**
1. For each requested potion and its desired count:
   - For each ingredient in that potion's recipe:
     - Multiply ingredient quantity by potion count.
     - Accumulate totals per ingredient.
2. Return a dictionary mapping `ingredient_id` to `total_quantity_needed`.

**Example:**
- Request: `{potion_lion: 3, potion_mintha: 2}`
- Potion `lion` needs: Sage 2, Mint 2 per batch
- Potion `mintha` needs: Dandelion 3, Marigold 1, Mint 1 per batch
- variables:
  - expected_batch_size = 1 (default assumption for now)
- Calculations:
  - Sage: `2 × (3 / expected_batch_size)) = 6`
  - Mint: `(2 × (3 / expected_batch_size)) + (1 × (2 / expected_batch_size)) = 8`
  - Dandelion: `3 × (2 / expected_batch_size) = 6`
  - Marigold: `1 × (2 / expected_batch_size) = 2`
- Result: `{ing_sage: 6, ing_mint: 8, ing_dandelion: 6, ing_marigold: 2}`

---

## Validation and Edge Cases

### Quantity Rules
- Quantities must be non-negative integers.
- Integer division (floor) is used when calculating craftable counts.

### Missing or Unavailable Ingredients
- If an ingredient is missing from the available inventory, treat its quantity as 0.
- A potion is **uncraftable** (craftable_batch_count = 0) if any required ingredient is unavailable.
- Return clear error/warning messages indicating which ingredients are missing.

### Over-Requesting
- If requested potion quantities exceed what can be satisfied:
  - Calculate and return full requirement totals.
  - Display difference of required vs. available ingredients to indicate shortfalls.

### Zero Quantities
- If a potion recipe requires 0 of an ingredient (edge case), skip that ingredient.
- If available quantity is 0 and the recipe doesn't require that ingredient, do not penalize craftable count.

---

## Suggested API / Function Interfaces

```python
def calculate_potions_from_ingredients(
    available: Dict[str, float],
    recipes: Dict[str, Potion]
) -> Dict[str, Dict[str, Any]]:
    """
    Calculate how many of each potion can be crafted from available ingredients.
    
    Args:
        available: Dict of {ingredient_id: quantity_available}
        recipes: Dict of {potion_id: Potion object}
    
    Returns:
        Dict of {potion_id: {craftable_count: int, limiting_ingredient: str}}
    """
    pass

def calculate_ingredients_for_potions(
    requested: Dict[str, int],
    recipes: Dict[str, Potion]
) -> Dict[str, float]:
    """
    Calculate total ingredients needed to craft requested potions.
    
    Args:
        requested: Dict of {potion_id: count_requested}
        recipes: Dict of {potion_id: Potion object}
    
    Returns:
        Dict of {ingredient_id: total_quantity_needed}
    """
    pass

def validate_inventory(
    available: Dict[str, float],
    all_ingredients: Dict[str, Ingredient]
) -> List[str]:
    """
    Validate that all available quantities are non-negative and ingredient IDs exist.
    
    Args:
        available: Dict of {ingredient_id: quantity}
        all_ingredients: Reference dict of all valid ingredients
    
    Returns:
        List of error messages (empty if valid)
    """
    pass
```

---

## Implementation Next Steps

1. **Data Storage:**
   - Serialize all potion and ingredient data to JSON or a lightweight database.
   - Example JSON structure (see `/data/potions.json` and `/data/ingredients.json`).

2. **Core Calculation Functions:**
   - Implement `calculate_potions_from_ingredients()`.
   - Implement `calculate_ingredients_for_potions()`.
   - Add comprehensive unit tests for edge cases.

3. **Web API:**
   - Expose calculations via REST endpoints.
   - Example endpoints:
     - `POST /api/calculate/potions` — accepts available ingredients, returns craftable potions.
     - `POST /api/calculate/ingredients` — accepts requested potions, returns required ingredients.

4. **Frontend:**
   - Build UI forms for:
     - Ingredient inventory input.
     - Potion request input.
     - Display results (craftable potions, required ingredients, shortfalls).

5. **Future Enhancements:**
   - Add batch-size multiplier logic per potion strength/outcome.
   - Introduce unit conversion (g ↔ ml, etc.).
   - Add storage persistence (database).
   - Add procurement/shopping list generation.

---

## Summary

This reference document provides:
- **Complete ingredient and potion lists** with precise recipes, steps, and outcomes.
- **Data model definitions** for integration with code.
- **Calculation algorithms** for both primary use cases.
- **Edge case handling** and validation rules.
- **API surface** suggestions for implementation.

Use this document as the source of truth for all potion-crafting logic and data structures throughout the application.
