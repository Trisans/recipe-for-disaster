// Written by Tristan Gottshall
let search = {
    // Searches the database
    // Assembles a results array by calling getMatch for % scores for each recipe provided by tagSort
    searchFiltered(query, filtered) {
        tables.output.clearOutput();
        let fKeys = Object.keys(filtered);
        let results = {};
        for (let i = 0; i < fKeys.length; i++) {
            let tempC = filtered[fKeys[i]];
            // Individual score for each recipe (based on search params)
            let result = this.getMatch(query, tempC);
            if (result != 0) {
                results[filtered[fKeys[i]].name] = result;
            }
        }
        // object: recipe name : % score
        return results;
    },
    
    // Returns a % score based on whether or not the search params (a) and the individual recipe to be tested (b) match up
    // Considers ingredient name, quantity (with units), and required time
    getMatch(a, b) {
        let query = a.ingredients;
        let splice = b.ingredients;
        const max = splice.length * 2;
        let score = 0;
        for (let i = 0; i < query.length; i++){
            for (let j = 0; j < splice.length; j++) {
                // Check if time matches.  If yes, proceed to check quantities and units, else, do not increase score
                // A recipe gets 100% if the user has all the required ingredients (time and units included) and has enough time
                if (query[i][0] == splice[j][0] && this.timeMatch(a.time, b.time)){
                    score++;
                    if (this.qtyUnitMatch(query[i][1], query[i][2], splice[j][1], splice[j][2])) {
                        score++;
                    }
                }
            }
        }
        // Round result up
        return Math.ceil(score / max * 100);
    },

    qtyUnitMatch(qQty, qUnit, fQty, fUnit) {
        // If names match and available qty is greater than required qty, return true
        if (qQty >= fQty && qUnit == fUnit) {
            return true;
        }
        return false;
    },

    timeMatch(qTime, fTime) {
        let qVal = qTime[0];
        let fVal = fTime[0];
        // Convert time from hours to minutes, if necessary
        if (qTime[1] == "hour") {
            qVal *= 60;
        }
        if (fTime[1] == "hour") {
            fVal *= 60;
        }
        // return true if available time (qVal) is greater than required time (fVal)
        return (qVal >= fVal ? true : false);
    }
}