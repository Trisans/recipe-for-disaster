// Written by Tristan Gottshall
let tags = {
    type: ['fruit', 'vegetable', 'meat', 'baked', 'prepared', 'beverage', 'cooked'],
    meal: ['breakfast', 'lunch', 'dinner'],
    course: ['appetizer', 'entree', 'dessert', 'side', 'beverage'],
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
            let filtered = {};
            for (let i = 0; i < tagKeys.length; i++) {
                let temp = core.foods[tagKeys[i]][query[i]];
                let tempKeys = Object.keys(core.foods[tagKeys[i]][query[i]]);
                for (let j = 0; j < tempKeys.length; j++) {
                    if (!(temp[tempKeys[j]] in filtered)) {
                        filtered[tempKeys[j]] = temp[tempKeys[j]]
                    };
                }
            }
            let uKeys = Object.keys(core.foods.uncat);
            for (let i = 0; i < uKeys.length; i++) {
                if (!(core.foods.uncat[uKeys[i]] in filtered)) {
                    filtered[uKeys[i]] = core.foods.uncat[uKeys[i]];
                }
            }
            return filtered;
        }
    },

    ping() {
        console.log("Tag sorter is loaded")
    }
}