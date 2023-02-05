// Written by Tristan Gottshall
let tables = {
    add: {
        current: [

        ],

        alreadyIncludes(ingredient) {
            for (let i = 0; i < this.current.length; i++) {
                if (this.current[i][0].toLowerCase() === ingredient.toLowerCase()) {
                    return true;
                }
            }
        
            return false;
        },

        addRow(ingredient, qty, unit) {
            if (this.alreadyIncludes(ingredient)) {
                console.log("That ingredient already exists");
            } else {
                console.log(ingredient, qty, unit);
                // Add recipe to addCurrent
                this.current.push([ingredient, qty, unit]);
                // Create row
                let table = document.getElementById("addIngredients");
                let row = table.insertRow(-1);
                let cell1 = row.insertCell(-1);
                let cell2 = row.insertCell(-1);
                let cell3 = row.insertCell(-1);
                let deleteCell = row.insertCell(-1);
                // Assign
                cell1.innerHTML = ingredient;
                cell2.innerHTML = qty;
                cell3.innerHTML = unit;
                // Delete cell has a button that calls Remove, passes itself
        
                let btnRemove = document.createElement("input");
                btnRemove.type = "button";
                btnRemove.value = "X";
                btnRemove.className = "del";
                btnRemove.setAttribute("onclick",
                "tables.common.removeIngredient('addIngredients', this)");

                deleteCell.appendChild(btnRemove);
            }
        }
    },

    search: {
        current: [
            /* ex:
            1: ["tomato", 1, "unit"],
            2: ["bread", 2, "slice"]
            */
        ],
        alreadyIncludes(ingredient) {
            for (let i = 0; i < this.current.length; i++) {
                if (this.current[i][0].toLowerCase() === ingredient.toLowerCase()) {
                    return true;
                }
            }
        
            return false;
        },
        addRow(ingredient, qty, unit) {
            if (this.alreadyIncludes(ingredient)) {
                console.log("That ingredient already exists");
            } else {
                console.log(ingredient, qty, unit);
                // Add recipe to addCurrent
                this.current.push([ingredient, qty, unit]);
                // Create row
                let table = document.getElementById("searchIngredients");
                let row = table.insertRow(-1);
                let cell1 = row.insertCell(-1);
                let cell2 = row.insertCell(-1);
                let cell3 = row.insertCell(-1);
                let deleteCell = row.insertCell(-1);
                // Assign
                cell1.innerHTML = ingredient;
                cell2.innerHTML = qty;
                cell3.innerHTML = unit;
                // Delete cell has a button that calls Remove, passes itself
        
                let btnRemove = document.createElement("input");
                btnRemove.type = "button";
                btnRemove.value = "X";
                btnRemove.className = "del";
                btnRemove.setAttribute("onclick",
                "tables.common.removeIngredient('searchIngredients', this)");

                deleteCell.appendChild(btnRemove);
            }
        }
    },

    output: {
        addRow(searchResults) {
            let resultKeys = Object.keys(searchResults);
            this.clearOutput();
            for (let i = 0; i < resultKeys.length; i++) {
                let table = document.getElementById("output");
                let row = table.insertRow(-1);
                let nameC = row.insertCell(-1);
                let matchC = row.insertCell(-1);
                let timeC = row.insertCell(-1);

                nameC.innerHTML = core.database[resultKeys[i]].name;
                matchC.innerHTML = searchResults[resultKeys[i]];
                timeC.innerHTML = `${core.database[resultKeys[i]].time[0]} ${core.database[resultKeys[i]].time[1]}(s)`;
            }


        },
        clearOutput() {
            let table = document.getElementById("output");
            // Clear table
            while (table.getElementsByTagName("tr").length != 1) {
                table.deleteRow(1);
            }
        }
    },

    common: {
        removeIngredient(tableID, button) {
            let table = document.getElementById(tableID);
            let row = button.parentNode.parentNode.rowIndex;
            tables.search.current.splice(row - 1, 1);
        
            table.deleteRow(row);
        }
    }
}