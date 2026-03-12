// KCD2 Potion Calculator - Frontend Logic

// Auto-save state management
let autoSaveTimer = null;
let confirmDialogCallback = null;

document.addEventListener('DOMContentLoaded', function() {
    const calculatePotionsBtn = document.getElementById('calculatePotionsBtn');
    const calculateIngredientsBtn = document.getElementById('calculateIngredientsBtn');
    const clearIngredientsBtn = document.getElementById('clearIngredientsBtn');
    const clearPotionsBtn = document.getElementById('clearPotionsBtn');

    calculatePotionsBtn.addEventListener('click', calculatePotionsFromIngredients);
    calculateIngredientsBtn.addEventListener('click', calculateIngredientsForPotions);
    clearIngredientsBtn.addEventListener('click', () => showClearConfirmation('ingredients'));
    clearPotionsBtn.addEventListener('click', () => showClearConfirmation('potions'));

    // Setup auto-save on input changes
    document.querySelectorAll('.ingredient-input, .potion-input').forEach(input => {
        input.addEventListener('change', () => debounceAutoSave());
        input.addEventListener('input', () => debounceAutoSave());
    });

    // Setup confirmation dialog buttons
    document.getElementById('dialogCancel').addEventListener('click', cancelConfirmation);
    document.getElementById('dialogConfirm').addEventListener('click', confirmConfirmation);

    // ESC key to cancel dialog
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cancelConfirmation();
        }
    });

    // Load state on page load
    loadCalculatorState();
});

/**
 * Debounce auto-save: wait 1 second after last input before saving
 */
function debounceAutoSave() {
    // Clear existing timer
    if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
    }

    // Set new timer
    autoSaveTimer = setTimeout(() => {
        saveCalculatorState();
    }, 1000);
}

/**
 * Save calculator state to localStorage
 */
function saveCalculatorState() {
    try {
        const ingredients = {};
        const potions = {};

        // Collect all ingredient values
        document.querySelectorAll('.ingredient-input').forEach(input => {
            const id = input.dataset.id;
            const value = parseInt(input.value) || 0;
            ingredients[id] = value;
        });

        // Collect all potion values
        document.querySelectorAll('.potion-input').forEach(input => {
            const id = input.dataset.id;
            const value = parseInt(input.value) || 0;
            potions[id] = value;
        });

        // Create state object
        const state = {
            timestamp: new Date().toISOString(),
            ingredients: ingredients,
            potions: potions
        };

        // Save to localStorage
        localStorage.setItem('kcd2_calculator_state', JSON.stringify(state));
        console.log('Auto-saved calculator state');
    } catch (error) {
        console.error('Error saving state:', error);
    }
}

/**
 * Load calculator state from localStorage
 */
function loadCalculatorState() {
    try {
        const stateJson = localStorage.getItem('kcd2_calculator_state');
        if (!stateJson) {
            return; // No saved state
        }

        const state = JSON.parse(stateJson);

        // Populate ingredients
        Object.entries(state.ingredients).forEach(([ingredientId, quantity]) => {
            const input = document.getElementById(`ing_${ingredientId}`);
            if (input) {
                input.value = quantity;
            }
        });

        // Populate potions
        Object.entries(state.potions).forEach(([potionId, quantity]) => {
            const input = document.getElementById(`pot_${potionId}`);
            if (input) {
                input.value = quantity;
            }
        });

        console.log('Loaded calculator state from localStorage');
    } catch (error) {
        console.error('Error loading state:', error);
        // Silently fail - continue with default values
    }
}

/**
 * Show confirmation dialog for clearing a column
 */
function showClearConfirmation(columnType) {
    const columnName = columnType === 'ingredients' ? 'Ingredients' : 'Potions';
    const message = `This action will reset all values in the ${columnName} column to 0. This cannot be undone. Continue?`;

    showConfirmationDialog(message, () => {
        clearColumn(columnType);
    });
}

/**
 * Show a confirmation dialog with a callback
 */
function showConfirmationDialog(message, onConfirm) {
    const overlay = document.getElementById('confirmationDialog');
    const content = document.getElementById('dialogContent');

    content.textContent = message;
    confirmDialogCallback = onConfirm;

    overlay.classList.remove('hidden');
}

/**
 * Cancel confirmation dialog
 */
function cancelConfirmation() {
    const overlay = document.getElementById('confirmationDialog');
    overlay.classList.add('hidden');
    confirmDialogCallback = null;
}

/**
 * Confirm and execute callback
 */
function confirmConfirmation() {
    const overlay = document.getElementById('confirmationDialog');
    overlay.classList.add('hidden');
    if (confirmDialogCallback) {
        confirmDialogCallback();
        confirmDialogCallback = null;
    }
}

/**
 * Clear all values in a column
 */
function clearColumn(columnType) {
    const selector = columnType === 'ingredients' ? '.ingredient-input' : '.potion-input';
    const inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.value = 0;
    });

    // Clear results panel
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    resultsContainer.classList.remove('active');

    // Trigger auto-save
    saveCalculatorState();
}

function getAvailableIngredients() {
    const available = {};
    const inputs = document.querySelectorAll('.ingredient-input');

    inputs.forEach(input => {
        const id = input.dataset.id;
        const value = parseInt(input.value) || 0;
        available[id] = value;
    });

    return available;
}

function getRequestedPotions() {
    const requested = {};
    const inputs = document.querySelectorAll('.potion-input');

    inputs.forEach(input => {
        const id = input.dataset.id;
        const value = parseInt(input.value) || 0;
        if (value > 0) {
            requested[id] = value;
        }
    });

    return requested;
}

function calculatePotionsFromIngredients() {
    const available = getAvailableIngredients();
    const resultsContainer = document.getElementById('resultsContainer');

    // Show loading state
    resultsContainer.innerHTML = '<p>Calculating...</p>';
    resultsContainer.classList.add('active');

    fetch('/api/calculate/potions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updatePotionInputs(data.craftable);
            displayPotionsResults(data.craftable);
            // Save state after calculation completes
            saveCalculatorState();
        } else {
            resultsContainer.innerHTML = `<div class="error-box">Error: ${data.error}</div>`;
        }
    })
    .catch(error => {
        resultsContainer.innerHTML = `<div class="error-box">Error: ${error.message}</div>`;
        console.error('Error:', error);
    });
}

function calculateIngredientsForPotions() {
    const requested = getRequestedPotions();
    const available = getAvailableIngredients();
    const resultsContainer = document.getElementById('resultsContainer');

    if (Object.keys(requested).length === 0) {
        resultsContainer.innerHTML = '<div class="warning-box">Please select at least one potion with a quantity greater than 0.</div>';
        resultsContainer.classList.add('active');
        return;
    }

    // Show loading state
    resultsContainer.innerHTML = '<p>Calculating...</p>';
    resultsContainer.classList.add('active');

    fetch('/api/calculate/ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requested, available })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayIngredientsResults(data.requirements);
            // Save state after calculation completes
            saveCalculatorState();
        } else {
            resultsContainer.innerHTML = `<div class="error-box">Error: ${data.error}</div>`;
        }
    })
    .catch(error => {
        resultsContainer.innerHTML = `<div class="error-box">Error: ${error.message}</div>`;
        console.error('Error:', error);
    });
}

function updatePotionInputs(craftableData) {
    Object.entries(craftableData).forEach(([potionId, count]) => {
        const input = document.getElementById(`pot_${potionId}`);
        if (input) {
            input.value = count;
        }
    });
}

function displayPotionsResults(craftableData) {
    const resultsContainer = document.getElementById('resultsContainer');
    let html = '<div class="results-title">📊 Craftable Potions</div>';
    html += '<div class="results-grid">';

    let hasAnyPotion = false;

    Object.entries(craftableData).forEach(([potionId, count]) => {
        const potionInput = document.getElementById(`pot_${potionId}`);
        const potionName = potionInput ? potionInput.previousElementSibling.textContent : potionId;

        if (count > 0) {
            hasAnyPotion = true;
            html += `
                <div class="result-card success-value">
                    <div class="result-card-title">✓ ${potionName}</div>
                    <div class="result-card-content">
                        <p>You can craft: <span class="result-value">${count}</span></p>
                    </div>
                </div>
            `;
        }
    });

    if (!hasAnyPotion) {
        html += `<div class="info-box">You don't have enough ingredients to craft any potions. Try adding more ingredients!</div>`;
    }

    html += '</div>';
    resultsContainer.innerHTML = html;
}

function displayIngredientsResults(requirements) {
    const resultsContainer = document.getElementById('resultsContainer');
    let html = '<div class="results-title">📋 Ingredient Requirements</div>';

    const hasShortfalls = Object.values(requirements).some(req => req.shortfall > 0);

    if (hasShortfalls) {
        html += '<div class="warning-box">⚠️ Some ingredients are in short supply. See details below.</div>';
    } else {
        html += '<div class="info-box">✓ You have enough ingredients for all requested potions!</div>';
    }

    html += '<div class="results-grid">';

    Object.entries(requirements).forEach(([ingredientId, info]) => {
        const cardClass = info.shortfall > 0 ? 'shortfall' : 'no-shortfall';
        const shortfallHTML = info.shortfall > 0 
            ? `<p>Missing: <span class="shortfall-value">${info.shortfall}</span></p>`
            : `<p>Surplus: <span class="success-value">${info.available - info.required}</span></p>`;

        html += `
            <div class="result-card ${cardClass}">
                <div class="result-card-title">${info.name}</div>
                <div class="result-card-content">
                    <p>Required: <span class="result-value">${info.required}</span></p>
                    <p>Available: <span class="result-value">${info.available}</span></p>
                    ${shortfallHTML}
                </div>
            </div>
        `;
    });

    html += '</div>';
    resultsContainer.innerHTML = html;
}
