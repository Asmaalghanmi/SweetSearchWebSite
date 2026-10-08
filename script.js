const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const clearBtn = document.getElementById('clearBtn');
const statusMessage = document.getElementById('statusMessage');


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        fetchData(query);
    } else {
        statusMessage.textContent = "Please enter a search term.";
        statusMessage.className = "text-red-500 text-center mb-4";
    }
});


searchInput.addEventListener('keyup', () => {
    statusMessage.textContent = ""; 
});


clearBtn.addEventListener('click', () => {
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }
    statusMessage.textContent = "Results cleared.";
});

async function fetchData(query) {
    try {
        
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        if (data.meals) {
            
            const dessertMeals = data.meals.filter(meal => meal.strCategory === "Dessert");

            if (dessertMeals.length > 0) {
                statusMessage.textContent = `Found ${dessertMeals.length} treats!`;
                statusMessage.className = "text-green-600 text-center mb-4";
                displayResults(dessertMeals);
            } else {
               
                resultsContainer.innerHTML = "";
                statusMessage.textContent = "That dish isn't a dessert! Try 'Cake' or 'Chocolate'.";
                statusMessage.className = "text-orange-500 text-center mb-4";
            }
        } else {
            resultsContainer.innerHTML = "";
            statusMessage.textContent = "No dishes found at all. Try a different search.";
            statusMessage.className = "text-red-500 text-center mb-4";
        }
    } catch (error) {
        statusMessage.textContent = "Connection error. Please try again later.";
        statusMessage.className = "text-red-700 text-center mb-4";
    }
}

function showRecipeModal(meal) {
    
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50";
    modal.id = "recipeModal";

    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button id="closeModal" class="absolute top-4 right-4 text-2xl font-bold hover:text-pink-600">&times;</button>
            <img src="${meal.strMealThumb}" class="w-full h-64 object-cover rounded mb-4">
            <h2 class="text-3xl font-bold mb-2 text-pink-800">${meal.strMeal}</h2>
            <p class="font-semibold text-gray-600 mb-4">${meal.strCategory} | ${meal.strArea}</p>
            <h3 class="text-xl font-bold mb-2 border-b pb-1">Instructions</h3>
            <p class="text-gray-700 whitespace-pre-line">${meal.strInstructions}</p>
        </div>
    `;

    document.body.appendChild(modal);

    
    modal.querySelector('#closeModal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function displayResults(meals) {
    resultsContainer.innerHTML = ""; 

    meals.slice(0, 6).forEach(meal => {
       
        const card = document.createElement('div');
        card.className = "p-4 border rounded shadow-sm bg-white flex flex-col";

        
        
        card.innerHTML = `
            <img src="${meal.strMealThumb}" class="w-full h-40 object-cover rounded">
            <h3 class="text-xl font-bold mt-2">${meal.strMeal}</h3>
            <p class="text-sm text-gray-500">${meal.strCategory} | ${meal.strArea}</p>
            <p class="text-xs mt-2 line-clamp-3 flex-grow">${meal.strInstructions}</p>
            <button class="view-recipe-btn mt-4 bg-pink-500 text-white py-1 px-3 rounded hover:bg-pink-600 transition">
                View Full Recipe
            </button>
        `;
        
        card.querySelector('.view-recipe-btn').addEventListener('click', () => {
            showRecipeModal(meal);
        });

        resultsContainer.appendChild(card); 
    });
}