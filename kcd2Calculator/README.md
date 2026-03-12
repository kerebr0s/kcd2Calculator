# KCD2 Potion Calculator

A web-based calculator for Kingdom Come: Deliverance 2 potion crafting that allows you to:
1. **Calculate craftable potions** from your available ingredients
2. **Calculate ingredient requirements** for desired potions and see shortfalls

## Features

- **Two-column interface**: Ingredients on the left, Potions on the right
- **Dual calculation modes**:
  - "Calculate Potions from Ingredients" → Updates potion text boxes with craftable quantities
  - "Calculate Ingredients for Desired Potions" → Shows required ingredients and shortfalls (doesn't modify inputs)
- **Integer input validation**: All inputs limited to 0-9999 range
- **Complete potion database**: All 27 potions with accurate ingredient requirements
- **Responsive design**: Works on desktop and mobile devices

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. Navigate to the project directory:
   ```bash
   cd kcd2Calculator
   ```

2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask application:
   ```bash
   python app.py
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Usage

### Calculate Potions from Ingredients
1. Enter the quantities of ingredients you have in the left column
2. Click "Calculate Potions from Ingredients"
3. The right column will automatically populate with the number of each potion you can craft
4. Each potion quantity represents the maximum you can create with your current ingredients

### Calculate Ingredients for Desired Potions
1. Enter the desired quantities of potions in the right column
2. Click "Calculate Ingredients for Desired Potions"
3. A results panel will appear below showing:
   - **Required**: Total quantity of each ingredient needed
   - **Available**: Current quantity of each ingredient
   - **Shortfall**: How many more of each ingredient you need (if any)

## Project Structure

```
kcd2Calculator/
├── app.py                    # Flask web application
├── calculator.py             # Core calculation logic
├── data.py                   # Ingredient and potion database
├── requirements.txt          # Python dependencies
├── templates/
│   └── index.html           # Main HTML template
└── static/
    ├── style.css            # Stylesheet
    └── app.js               # Frontend JavaScript logic
```

## Data Models

### Ingredient
- ID: Unique identifier
- Name: Display name

### Potion
- ID: Unique identifier
- Name: Display name
- Type: Category (Potion, Poison, Perfume, Gunpowder, Other)
- Ingredients: List of required ingredients with quantities per successful batch

### Calculations
All ingredient quantities refer to one successful batch. The batch-size multiplier (which determines how many potions are produced per batch) is currently fixed at 1 and can be extended in future versions.

## Notes

- All quantities are integers (0-9999)
- Integer division (floor) is used when calculating craftable potion counts
- Shortfall calculations show only positive shortfalls (0 if you have enough)
- The application uses a responsive design and works best on screens 768px and wider

## Future Enhancements

- Batch-size multiplier per potion based on perks
- Persistent storage (database)
- Shopping/Gathering list generation
- Advanced filtering and sorting options
- Display recipe details when clicking on potion
- Dark mode UI option
