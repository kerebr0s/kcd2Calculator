# KCD2 Potion Calculator - Quick Start Guide

## Getting Started

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Application
```bash
python app.py
```

### 3. Open in Browser
Navigate to `http://localhost:5000`

---

## UI Layout

```
┌─────────────────────────────────────────────────────────┐
│                  KCD2 Potion Calculator                 │
│  Calculate potion yields from ingredients or needs      │
└─────────────────────────────────────────────────────────┘

┌───────────────────────────┬───────────────────────────┐
│  Available Ingredients    │        Potions            │
├───────────────────────────┼───────────────────────────┤
│ ☐ Belladonna      [0    ] │ ☐ Aesop            [0    ] │
│ ☐ Boar's Tusk     [0    ] │ ☐ Aqua Vitalis     [0    ] │
│ ☐ Comfrey         [0    ] │ ☐ Artemisia        [0    ] │
│ ☐ Dandelion       [0    ] │ ☐ Bane             [0    ] │
│ ... (26 ingredients total)│ ... (27 potions total)     │
│                           │                           │
│ [Calculate Potions ▼]     │ [Calculate Ingredients ▼] │
└───────────────────────────┴───────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      Results                            │
│                                                         │
│ (Results appear here when you click a button)           │
└─────────────────────────────────────────────────────────┘
```

---

## Workflow Examples

### Example 1: Calculate Craftable Potions
**Goal:** I have 10 Sage, 4 Mint. How many "Lion" potions can I make?

**Steps:**
1. In left column, enter:
   - Sage: 10
   - Mint: 4
2. Click "Calculate Potions from Ingredients"
3. Right column updates automatically:
   - Lion potion shows: 2 (limited by Mint: 4÷2=2)

---

### Example 2: Calculate Ingredient Shortfalls
**Goal:** I want to make 3 "Aesop" potions. What ingredients do I need?
- Aesop requires: 1 Belladonna, 1 Boar's Tusk, 2 Comfrey per batch

**Steps:**
1. In left column, enter your current ingredients (e.g., Belladonna: 2, Boar's Tusk: 1, Comfrey: 3)
2. In right column, enter:
   - Aesop: 3
3. Click "Calculate Ingredients for Desired Potions"
4. Results show:
   - Belladonna: Required 3, Available 2, **Shortfall 1**
   - Boar's Tusk: Required 3, Available 1, **Shortfall 2**
   - Comfrey: Required 6, Available 3, **Shortfall 3**

---

## Key Features

### Calculate Potions from Ingredients
- **Updates:** Potion input fields
- **Shows:** Maximum craftable quantity for each potion
- **Limiting factor:** Ingredient with lowest availability

### Calculate Ingredients for Desired Potions
- **Does NOT update:** Any input fields
- **Shows:** Message panel with:
  - Required quantity for each ingredient
  - Available quantity
  - Shortfall (how many more you need)

---

## Input Constraints

- **Range:** 0 to 9999
- **Type:** Integer only
- **Default:** 0

---

## Data Integrity

✓ All 26 ingredients cataloged
✓ All 27 potions with accurate recipes
✓ No duplicate potion IDs
✓ Consistent ingredient references across recipes

---

## Troubleshooting

**Issue:** Page won't load
- Solution: Ensure Flask is running (`python app.py` shows "Running on http://localhost:5000")
- Solution: Check firewall isn't blocking port 5000

**Issue:** Calculations seem wrong
- Verify you're entering the correct ingredient quantities
- Remember: Integer division means 5 ÷ 2 = 2 (not 2.5)

**Issue:** Templates/static files not found
- Ensure you're running `app.py` from the `kcd2Calculator` directory
- Check that `templates/` and `static/` directories exist

---

## API Endpoints (for advanced users)

### POST `/api/calculate/potions`
**Request:**
```json
{
  "available": {
    "ing_sage": 10,
    "ing_mint": 4
  }
}
```

**Response:**
```json
{
  "success": true,
  "craftable": {
    "potion_lion": 2,
    "potion_aesop": 0,
    ...
  }
}
```

### POST `/api/calculate/ingredients`
**Request:**
```json
{
  "requested": {
    "potion_aesop": 3,
    "potion_lion": 2
  },
  "available": {
    "ing_sage": 10,
    "ing_belladonna": 2
  }
}
```

**Response:**
```json
{
  "success": true,
  "requirements": {
    "ing_belladonna": {
      "name": "Belladonna",
      "required": 3,
      "available": 2,
      "shortfall": 1
    },
    ...
  }
}
```

---

## Architecture

```
app.py (Flask)
    ├── Routes: / (index), /api/calculate/potions, /api/calculate/ingredients
    ├── Uses: data.py (INGREDIENTS, POTIONS)
    └── Uses: calculator.py (calculation functions)

calculator.py
    ├── calculate_potions_from_ingredients()
    ├── calculate_ingredients_for_potions()
    └── calculate_ingredient_shortfalls()

templates/index.html
    └── Renders form with inputs for all ingredients and potions

static/app.js
    ├── Collects form inputs
    ├── Sends POST requests to API
    └── Renders results dynamically

static/style.css
    └── Responsive styling for all UI elements
```

---

## Next Steps for Expansion

1. **Database Integration:** Store user inventories persistently
2. **Batch Multipliers:** Different potion strengths yield different quantities
3. **Unit Conversion:** Support weight (g) and volume (ml) units
4. **Import/Export:** Save and load inventory snapshots
5. **Advanced Filters:** Sort by potion type, ingredient availability, etc.
