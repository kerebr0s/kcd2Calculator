# KCD2 Potion Calculator - Flask Web Application

from flask import Flask, render_template, request, jsonify
from data import INGREDIENTS, POTIONS
from calculator import (
    calculate_potions_from_ingredients,
    calculate_ingredients_for_potions,
    calculate_ingredient_shortfalls
)

app = Flask(__name__)


@app.route('/')
def index():
    """Render the main calculator page."""
    return render_template('index.html', ingredients=INGREDIENTS, potions=POTIONS)


@app.route('/api/calculate/potions', methods=['POST'])
def api_calculate_potions():
    """
    API endpoint to calculate craftable potions from available ingredients.
    
    Expected JSON:
    {
        "available": {"ingredient_id": quantity, ...}
    }
    """
    try:
        data = request.get_json()
        available = data.get('available', {})
        
        # Convert string keys to integers
        available = {k: int(v) for k, v in available.items() if v}
        
        # Calculate craftable potions
        result = calculate_potions_from_ingredients(available, POTIONS)
        
        # Format result for frontend
        craftable = {}
        for potion_id, info in result.items():
            craftable[potion_id] = info['craftable_count']
        
        return jsonify({
            'success': True,
            'craftable': craftable
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400


@app.route('/api/calculate/ingredients', methods=['POST'])
def api_calculate_ingredients():
    """
    API endpoint to calculate required ingredients for requested potions.

    Expected JSON:
    {
        "requested": {"potion_id": quantity, ...},
        "available": {"ingredient_id": quantity, ...}
    }
    """
    try:
        data = request.get_json()
        requested = data.get('requested', {})
        available = data.get('available', {})

        # Convert string keys to integers
        requested = {k: int(v) for k, v in requested.items() if v}
        available = {k: int(v) for k, v in available.items() if v}

        # Calculate required ingredients
        required = calculate_ingredients_for_potions(requested, POTIONS)

        # Calculate shortfalls
        shortfalls = calculate_ingredient_shortfalls(required, available, INGREDIENTS)

        # Format result for frontend
        result = {}
        for ingredient_id, info in shortfalls.items():
            ingredient_name = INGREDIENTS[ingredient_id]['name']
            result[ingredient_id] = {
                'name': ingredient_name,
                'required': info['required'],
                'available': info['available'],
                'shortfall': info['shortfall']
            }

        return jsonify({
            'success': True,
            'requirements': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
