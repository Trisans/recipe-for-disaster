function Account(username, password) {
    this.name = username;
    this.password = password;
    this.pantry = [];
}

Account.prototype.addIngredient = function(ingredient, qty, unit) {
    for (let i = 0; i < this.pantry.length; i++) {
        if (ingredient.toLowerCase() == this.pantry[i][0]) {
            console.log("You already have that ingredient in your pantry");
            return -1;
        }
    }
    this.pantry.push([ingredient, qty, unit]);
}

Account.prototype.removeIngredient = function(name) {
    for (let i = 0; i < this.pantry.length; i++) {
        if (name.toLowerCase() == this.pantry[i][0]) {
            this.pantry.splice(i, 1);
            console.log(`Removed ${name} from your pantry.`)
            return 1;
        }
    }
    console.log("You can't remove an ingredient that doesn't exist.");
    return -1;
}

let accounts = {
    accountList: {
        devacc: new Account("devacc", "1234")
    },

    count: 1,

    currentUser: undefined,

    createAcc(username, password)  {
        this.accountList[username] = new Account(username, password);
        this.count++;
        return this.accountList[username];
    },

    notSignedIn() {
        if (this.currentUser != undefined) {
            return false;
        } else {
            return true;
        }
    },

    signInSuccess(name) {
        this.currentUser = this.accountList[name];
        console.log(`Successfully signed in as ${this.currentUser.name}.`)
        core.updateStatus();
    },

    signIn(name, password) {
        if (this.accountList[name] != undefined) {
            if (this.accountList[name].password === password) {
                this.signInSuccess(name);
                return this.currentUser;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    logOut() {
        this.currentUser = undefined;
        console.log("Logged out.")
        return this.currentUser;
    },

    deleteAccount(name, password) {
        if (this.accountList[name].password === password) {
            delete this.accountList[name];
            console.log(`Deleted account: ${name}`);
            return this.accountList;
        } else {
            console.log("Invalid password");
            return -1;
        }
    }
}

accounts.accountList["devacc"].addIngredient("bread", 5, "unit");
accounts.accountList["devacc"].addIngredient("jasper", 1, "unit");
accounts.accountList["devacc"].addIngredient("cheese", 4, "unit");