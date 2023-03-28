// Written by Tristan Gottshall 

// calls tagSort to sort DB
core.initialize();

// Buttons
const addRowButton = document.getElementById("addRowButton");
const submitAdd = document.getElementById("submitAdd");
const clearAdd = document.getElementById("clearAddForm");
const submitSearch = document.getElementById("submitSearch");
const searchRow = document.getElementById("searchRow");
const clearSearch = document.getElementById("clearSearch");
const about = document.getElementById("carrotButton");
const signin = document.getElementById("signInButton");
const createAcc = document.getElementById("createAccButton")

// Add a row to the "add" table
addRowButton.addEventListener("click", (event) => {
    event.preventDefault();
    let ingredient = (document.getElementById("ingredient").value).toLowerCase();
    let qty = (document.getElementById("quantity").value).toLowerCase();
    let unit = (document.getElementById("units").value).toLowerCase();

    tables.add.addRow(ingredient, qty, unit);
});

// Submit the add form, adds the recipe
submitAdd.addEventListener("click", () => {
    // Push to db
    
    // Name, ingredients, time info
    let recipeName = (document.getElementById("recipeName").value).toLowerCase();
    let recipeIngredients = tables.add.current;
    let recipeTimeFlr = Number(document.getElementById("prepTime").value);
    let recipeTimeUnitFlr = document.getElementById("timeUnit").value;
    let recipeTime = [recipeTimeFlr, recipeTimeUnitFlr];

    // User-set tags for the added recipe
    let type = document.getElementById("addTypeTagSelect").value;
    let meal = document.getElementById("addMealTagSelect").value;
    let course = document.getElementById("addCourseTagSelect").value;
    let flavor = document.getElementById("addFlavorTagSelect").value;

    let tags = [type, meal, course, flavor];
    
    core.addFood(recipeName, recipeIngredients, tags, recipeTime);

    // Clear the table after the recipe is added
    let table = document.getElementById("addIngredients");

    while (table.getElementsByTagName("tr").length != 1) {
        table.deleteRow(1);
    }
    // Clear the table array
    tables.add.current = [];
});

// Clears the table in the "add recipe" form when the "clear" button is pressed
clearAdd.addEventListener("click", () => {
    let table = document.getElementById("addIngredients");
    // Clear table
    while (table.getElementsByTagName("tr").length != 1) {
        table.deleteRow(1);
    }
    // Clear array
    tables.add.current = [];
});

// Add a row to the "search" table
searchRow.addEventListener("click", (event) => {
    // Prevents the page from reloading, which would clear data
    event.preventDefault();
    // Basic information
    let ingredient = (document.getElementById("searchIngredient").value).toLowerCase();
    let qty = Number(document.getElementById("searchQuantity").value);
    let unit = document.getElementById("searchUnits").value;
    // Add ingredient to table, clear text box
    tables.search.addRow(ingredient, qty, unit);
    document.getElementById("searchIngredient").value = "";
});

// Search the DB with user-defined parameters
submitSearch.addEventListener("click", () => {
    let type = document.getElementById("searchTypeTagSelect").value;
    let meal = document.getElementById("searchMealTagSelect").value;
    let course = document.getElementById("searchCourseTagSelect").value;
    let flavor = document.getElementById("searchFlavorTagSelect").value;
    // Create object with all search parameters
    let srchq = {
        time: [document.getElementById("availableTime").value,
            document.getElementById("availableTimeUnit").value],
        tags: [type, meal, course, flavor]
    }

    // Make sure the ingredient table isn't empty.  If signed in AND table is empty, search with account pantry, else, abort search
    // User can search with their saved pantry by not entering ingredients
    if (tables.search.current.length > 0) {
        srchq.ingredients = tables.search.current;
    } else if (accounts.currentUser != undefined && accounts.currentUser.pantry.length > 0) {
        srchq.ingredients = accounts.currentUser.pantry;
    } else {
        console.log("No ingredients entered, and none in pantry.  Cannot search");
        return -1;
    }
    core.searchFoods(srchq);
    
});

// Clear the ingredients table in the "search" form
clearSearch.addEventListener("click", () => {
    let table = document.getElementById("searchIngredients");
    // Clear table
    while (table.getElementsByTagName("tr").length != 1) {
        table.deleteRow(1);
    }
    // Clear array
    tables.search.current = [];
});

// On page load
document.addEventListener("DOMContentLoaded", () => {
    core.initialize();
    core.updateStatus();
    console.log("Recipe Tool | Food Poisoning Edition");
})

// Sign in
signin.addEventListener("click", () => {
    if (accounts.currentUser == undefined) {
        let name = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if (accounts.signIn(name, password)) {
            // location.href = "../index.html";
        } else {
            console.log("Invalid Sign-in information.");
        }
    } else {
        // View account
    }
},)

// Create account
createAcc.addEventListener("click", () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    accounts.createAcc(username, password);
})