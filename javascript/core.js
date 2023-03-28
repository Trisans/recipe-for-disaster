// Written by Tristan Gottshall

// Food object
function Food(name, ingredients, tags, time) {
    this.name = name;
    this.ingredients = ingredients;
    this.tags = tags;
    this.time = time;
}

let core = {
    foods: {
        // Will have more subcategories once tagSort is called
        uncat: {}
    },
    
    database: {
        // unsorted food objects, imported from database

        // No DB yet, so these are defaults for testing
        toast: new Food(
            "toast",
            [["bread", 1, "unit"], ["butter", 1, "unit"]],
            ["cooked", "breakfast", "entree", "salty"],
            [5, "minute"]
        ),
        sandwich: new Food(
            "sandwich",
            [["bread", 2, "unit"], ["cheese", 1, "unit"]],
            ["prepared", null, "entree", null],
            [10, "minute"]
        ),

    },

    initialize: function() {
        // Calls tagSort, fills core.foods with categories, then sorts all recipes in the DB into those categories
        tagSort.initialize.runAll();
    },

    addFood: function(name, ingredients, tags, time) {
        // Add the submitted information to the database in the form of a new Food
        core.database[name] = new Food(name, ingredients, tags, time);
        // Categorize food, passes the newly created food in the database
        tagSort.add.sortIndividual(core.database[name]);
    },

    // Intermediate function between event listener and search.searchFiltered
    searchFoods: function(query) {
        // Query is an object with all search parameters
        let filtered = tagSort.search.filter(query.tags);
        tables.output.addRow(search.searchFiltered(query, filtered));
    },

    updateStatus() {
        // If signed in, change the text content of the sign in button (log in or view account)
        if (accounts.notSignedIn()) {
            document.getElementById("signInButton").textContent = "Log In";
        } else {
            document.getElementById("signInButton").textContent = "View Account";
        }
    },

    // Used to check if the files can "see" each other
    ping: function() {
        console.log("CORE IS LOADED");
    }
}