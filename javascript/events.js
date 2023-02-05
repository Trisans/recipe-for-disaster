// Written by Tristan Gottshall 
core.initialize();
tagSort.initialize.runAll();

const addRowButton = document.getElementById("addRowButton");
const submitAdd = document.getElementById("submitAdd");
const clearAdd = document.getElementById("clearAddForm");
const submitSearch = document.getElementById("submitSearch");
const searchRow = document.getElementById("searchRow");
const clearSearch = document.getElementById("clearSearch");
const about = document.getElementById("carrotButton");

// "Add" form submit event listener (Table)
addRowButton.addEventListener("click", (event) => {
    event.preventDefault();
    let ingredient = (document.getElementById("ingredient").value).toLowerCase();
    let qty = (document.getElementById("quantity").value).toLowerCase();
    let unit = (document.getElementById("units").value).toLowerCase();

    tables.add.addRow(ingredient, qty, unit);
});

// Add a recipe to db
submitAdd.addEventListener("click", () => {
    // Push to db
    
    if ((document.getElementById("recipeName").value).toLowerCase() != "tristan"){
        let recipeName = (document.getElementById("recipeName").value).toLowerCase();
        let recipeIngredients = tables.add.current;
        let recipeTimeFlr = Number(document.getElementById("prepTime").value);
        let recipeTimeUnitFlr = document.getElementById("timeUnit").value;
        let recipeTime = [recipeTimeFlr, recipeTimeUnitFlr];

        // let tags = TODO: Add tag input
        let tags = ["fruit", null, null, null];
        
        core.addFood(recipeName, recipeIngredients, tags, recipeTime);

        // Then clear
        let table = document.getElementById("addIngredients");

        while (table.getElementsByTagName("tr").length != 1) {
            table.deleteRow(1);
        }
        // Clear array
        tables.add.current = [];
    } else {
        location.href = 'https://tenor.com/view/jasper-screaming-oddlylinda-gif-26528820';
        // document.getElementById("title").innerHTML = "Stop misbehaving";
        // setTimeout(() => {
        //     document.getElementById("title").innerHTML = "Recipe Tool";
        // }, 3000)
    }
});

// Clear search table
clearAdd.addEventListener("click", () => {
    let table = document.getElementById("addIngredients");
    // Clear table
    while (table.getElementsByTagName("tr").length != 1) {
        table.deleteRow(1);
    }
    // Clear array
    tables.add.current = [];
});

// "Search" form submit event listener (Table)
searchRow.addEventListener("click", (event) => {
    event.preventDefault();
    let ingredient = (document.getElementById("searchIngredient").value).toLowerCase();
    let qty = Number(document.getElementById("searchQuantity").value);
    let unit = document.getElementById("searchUnits").value;

    tables.search.addRow(ingredient, qty, unit);
    document.getElementById("searchIngredient").value = "";
});

// Search the
submitSearch.addEventListener("click", () => {
    let srchq = {
        ingredients: tables.search.current,
        time: [document.getElementById("availableTime").value,
            document.getElementById("availableTimeUnit").value],
        tags: ["fruit", "breakfast", "appetizer", "sweet"]
    }
    core.searchFoods(srchq);
});

clearSearch.addEventListener("click", () => {
    let table = document.getElementById("searchIngredients");
    // Clear table
    while (table.getElementsByTagName("tr").length != 1) {
        table.deleteRow(1);
    }
    // Clear array
    tables.search.current = [];
});