# KCD2 Potion Calculator - Core Calculation Logic

def calculate_potions_from_ingredients(available, recipes):
    """
    Calculate how many of each potion can be crafted from available ingredients.
    
    Args:
        available: Dict of {ingredient_id: quantity_available}
        recipes: Dict of {potion_id: recipe_data}
    
    Returns:
        Dict of {potion_id: {craftable_count: int, limiting_ingredient_id: str or None}}
    """
    result = {}
    
    for potion_id, recipe in recipes.items():
        craftable_count = float('inf')
        limiting_ingredient = None
        
        for ingredient_req in recipe.get("ingredients", []):
            ingredient_id = ingredient_req["ingredient_id"]
            required_qty = ingredient_req["quantity"]
            available_qty = available.get(ingredient_id, 0)
            
            # Calculate how many times we can make this potion based on this ingredient
            can_make = available_qty // required_qty if required_qty > 0 else 0
            
            # The limiting ingredient is the one that allows the fewest potions
            if can_make < craftable_count:
                craftable_count = can_make
                limiting_ingredient = ingredient_id
        
        # If no ingredients required, assume 0 craftable
        if craftable_count == float('inf'):
            craftable_count = 0
        
        result[potion_id] = {
            "craftable_count": int(craftable_count),
            "limiting_ingredient": limiting_ingredient
        }
    
    return result


def calculate_ingredients_for_potions(requested, recipes):
    """
    Calculate total ingredients needed to craft requested potions.
    
    Args:
        requested: Dict of {potion_id: count_requested}
        recipes: Dict of {potion_id: recipe_data}
    
    Returns:
        Dict of {ingredient_id: total_quantity_needed}
    """
    result = {}
    
    for potion_id, requested_count in requested.items():
        if requested_count <= 0 or potion_id not in recipes:
            continue
        
        recipe = recipes[potion_id]
        for ingredient_req in recipe.get("ingredients", []):
            ingredient_id = ingredient_req["ingredient_id"]
            required_qty = ingredient_req["quantity"]
            
            # Accumulate total requirement
            if ingredient_id not in result:
                result[ingredient_id] = 0
            result[ingredient_id] += required_qty * requested_count
    
    return result


def calculate_ingredient_shortfalls(required, available, all_ingredients):
    """
    Calculate shortfalls for each ingredient (required - available).
    
    Args:
        required: Dict of {ingredient_id: quantity_required}
        available: Dict of {ingredient_id: quantity_available}
        all_ingredients: Dict of all valid ingredients for reference
    
    Returns:
        Dict of {ingredient_id: {required, available, shortfall}}
    """
    result = {}
    
    for ingredient_id, required_qty in required.items():
        available_qty = available.get(ingredient_id, 0)
        shortfall = max(0, required_qty - available_qty)
        
        result[ingredient_id] = {
            "required": required_qty,
            "available": available_qty,
            "shortfall": shortfall
        }
    
    return result
