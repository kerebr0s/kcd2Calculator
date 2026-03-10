// KCD2 Potion Calculator - Frontend Logic

document.addEventListener('DOMContentLoaded', function() {
    const calculatePotionsBtn = document.getElementById('calculatePotionsBtn');
    const calculateIngredientsBtn = document.getElementById('calculateIngredientsBtn');
    const resultsContainer = document.getElementById('resultsContainer');

    calculatePotionsBtn.addEventListener('click', calculatePotionsFromIngredients);
    calculateIngredientsBtn.addEventListener('click', calculateIngredientsForPotions);
});

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
