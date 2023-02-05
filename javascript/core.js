// Written by Tristan Gottshall
function Food(name, ingredients, tags, time) {
    this.name = name;
    this.ingredients = ingredients;
    this.tags = tags;
    this.time = time;
}

let core = {
    foods: {
        uncat: {}
    },
    
    database: {
        // unsorted food objects, imported from database
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
        console.log("Recipe Tool | Food Poisoning Edition");
    },

    addFood: function(name, ingredients, tags, time) {
        core.database[name] = new Food(name, ingredients, tags, time);
        tagSort.add.sortIndividual(core.database[name]);
    },

    searchFoods: function(query) {
        let filtered = tagSort.search.filter(query.tags);
        // console.dir(filtered);
        tables.output.addRow(search.searchFiltered(query, filtered));
    },

    ping: function() {
        console.log("CORE IS LOADED");
    }
}
