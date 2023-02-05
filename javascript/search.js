// Written by Tristan Gottshall
let search = {
    searchFiltered(query, filtered) {
        // clearOutput();
        let fKeys = Object.keys(filtered);
        let results = {};
        for (let i = 0; i < fKeys.length; i++) {
            let tempC = filtered[fKeys[i]];
            let result = this.getMatch(query, tempC);
            if (result != 0) {
                results[filtered[fKeys[i]].name] = result;
            }
        }
        return results;
    },
    
    getMatch(a, b) {
        let query = a.ingredients;
        let splice = b.ingredients;
        const max = splice.length * 2;
        let score = 0;
        for (let i = 0; i < query.length; i++){
            for (let j = 0; j < splice.length; j++) {
                if (query[i][0] == splice[j][0] && this.timeMatch(a.time, b.time)){
                    score++;
                    if (this.qtyUnitMatch(query[i][1], query[i][2], splice[j][1], splice[j][2])) {
                        score++;
                    }
                }
            }
        }
        return Math.ceil(score / max * 100);
    },

    qtyUnitMatch(qQty, qUnit, fQty, fUnit) {
        if (qQty >= fQty && qUnit == fUnit) {
            return true;
        }
        return false;
    },

    timeMatch(qTime, fTime) {
        let qVal = qTime[0];
        let fVal = fTime[0];
        if (qTime[1] == "hour") {
            qVal *= 60;
        }
        if (fTime[1] == "hour") {
            fVal *= 60;
        }

        return (qVal >= fVal ? true : false);
    }
}