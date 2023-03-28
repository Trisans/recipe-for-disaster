// Written by Tristan Gottshall
// This file exists:
// 1. Because it's cool
// 2. To potentially reduce search time on a large database

// Tags can be added and the program will still work.  HOWEVER, if tags are removed, all recipes with those tags must be
// modified or the program may produce unexpected results.  HTML document must also be changed
let tags = {
    type: ['fruit', 'vegetable', 'meat', 'baked', 'prepared', 'beverage', 'cooked'],
    meal: ['breakfast', 'lunch', 'dinner'],
    course: ['appetizer', 'entree', 'dessert', 'side'],
    flavor: ['sweet', 'salty', 'sour', 'bitter']
}
let tagKeys = Object.keys(tags);

let tagSort = {
    initialize: {
        runAll() {
            core.foods = { // Empty main recipe list to re-sort
                uncat: {}
            }
            this.fill(); // Fill main recipe list with tags
            this.sortAll(); // Sort all recipes in the database
        }, 

        sortAll() {
            // Call sortIndividual for every food object in the database
            let dbKeys = Object.keys(core.database);
            for (let i = 0; i < dbKeys.length; i++) {
                tagSort.add.sortIndividual(core.database[dbKeys[i]]);
            }
        },

        fill() {
            for (let i = 0; i < tagKeys.length; i++) {
                // Fill the foods object with tags from the tags object (could be done manually, but this way adds scalability)
                core.foods[tagKeys[i]] = {};
                for (let j = 0; j < tags[tagKeys[i]].length; j++) {
                    core.foods[tagKeys[i]][tags[tagKeys[i]][j]] = {};
                }
            }
        }
    },

    add: {
        sortIndividual(food) {
            let theseTags = food.tags;
            let allTags = tags;
            let allTagsKeys = Object.keys(tags);
            for (let i = 0; i < food.tags.length; i++) {
                let toCompare = allTags[allTagsKeys[i]];
                let categorized = false;
                for (let j = 0; j < toCompare.length; j++) {
                    if (theseTags[i] == toCompare[j]) {
                        core.foods[allTagsKeys[i]][toCompare[j]][food.name] = food;
                        categorized = true;
                    }
                }
                if (!categorized && this.uncatDoesNotAlreadyInclude(food.name)) {
                    core.foods["uncat"][food.name] = food;
                }
            }
        },

        uncatDoesNotAlreadyInclude(name) {
            let uncat = core.foods["uncat"];
            let uncatKeys = Object.keys(core.foods["uncat"]);
            for (let i = 0; i < uncatKeys.length; i++) {
                if (uncat[uncatKeys[i]] == name) {
                    return false;
                }
            }
            return true;
        }
    },

    search: {    
        filter(query) {
            // filter recipes
            let filtered = {};
            for (let i = 0; i < tagKeys.length; i++) {
                if (query[i] != "null") {
                    let temp = core.foods[tagKeys[i]][query[i]];
                    let tempKeys = Object.keys(core.foods[tagKeys[i]][query[i]]);
                    for (let j = 0; j < tempKeys.length; j++) {
                        if (!(temp[tempKeys[j]] in filtered)) {
                            filtered[tempKeys[j]] = temp[tempKeys[j]]
                        };
                    }
                }
            }
            // Check if all tags are null
            let uKeys = Object.keys(core.foods.uncat);
            fKeys = Object.keys(filtered);
            if (fKeys.length == 0 && this.noTags(query)) {
                console.log("You did not search with any tags.  Searching the whole database...")
                return core.database;
            }
            // add uncat recipes
            for (let i = 0; i < uKeys.length; i++) {
                if (!(core.foods.uncat[uKeys[i]] in filtered)) {
                    filtered[uKeys[i]] = core.foods.uncat[uKeys[i]];
                }
            }
            // filtered is an object that contains recipes matching query tags and uncategorized recipes
            return filtered;
        },

        // If user didn't input any tags to search with, return true
        noTags(arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] != "null") {
                    return false;
                }
            }
            return true;
        }
    },

    ping() {
        console.log("Tag sorter is loaded")
    }
}