// API base URL (you'll replace this with your backend server URL)
const apiUrl = 'http://localhost:5000/api';

/* Fetch all recipes and display them on the homepage */
function loadRecipes() {
    fetch(`${apiUrl}/recipes`)
        .then(response => response.json())
        .then(data => {
            const recipesContainer = document.getElementById('recipes-container');
            data.forEach(recipe => {
                const recipeCard = `
                    <div class="recipe-card">
                        <h3>${recipe.title}</h3>
                        <p>${recipe.description}</p>
                        <a href="recipe.html?id=${recipe.id}">View Recipe</a>
                    </div>
                `;
                recipesContainer.innerHTML += recipeCard;
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

/* Fetch a single recipe by ID */
function loadRecipeDetails(recipeId) {
    fetch(`${apiUrl}/recipes/${recipeId}`)
        .then(response => response.json())
        .then(recipe => {
            document.getElementById('recipe-title').textContent = recipe.title;
            document.getElementById('recipe-description').textContent = recipe.description;
            document.getElementById('recipe-ingredients').textContent = recipe.ingredients;
            document.getElementById('recipe-instructions').textContent = recipe.instructions;
        })
        .catch(error => console.error('Error fetching recipe:', error));
}

/* Submit new recipe */
function submitRecipe(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    fetch(`${apiUrl}/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            ingredients,
            instructions
        })
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = 'index.html'; // Redirect to the homepage
    })
    .catch(error => console.error('Error creating recipe:', error));
}

/* Login User */
function loginUser(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'index.html'; // Redirect on successful login
        } else {
            alert('Login failed!');
        }
    })
    .catch(error => console.error('Error logging in:', error));
}
