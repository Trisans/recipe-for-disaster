// Written by Tristan Gottshall
function Account(username, password) {
    this.name = username;
    this.password = password;
    this.pantry = [];
}

// Add an ingredient to the pantry
Account.prototype.addIngredient = function(ingredient, qty, unit) {
    for (let i = 0; i < this.pantry.length; i++) {
        if (ingredient.toLowerCase() == this.pantry[i][0]) {
            console.log("You already have that ingredient in your pantry");
            return -1;
        }
    }
    this.pantry.push([ingredient, qty, unit]);
}

// Remove an ingredient from the pantry
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
    // List of all accounts
    accountList: {
        // Pre-created dev account
        devacc: new Account("devacc", "1234")
    },

    count: 1,

    // keeps track of which account the user is signed into
    currentUser: undefined,

    createAcc(username, password)  {
        if (!(username in this.accountList)) {
            this.accountList[username] = new Account(username, password);
            // increase the account counter
            this.count++;
            console.log(`Created account ${username}.`);
            // Although it is unused, returns the new account object
            return this.accountList[username];
        } else {
            console.log("That account already exists.")
        }
        
    },
    // returns true if user is NOT signed in
    notSignedIn() {
        if (this.currentUser != undefined) {
            return false;
        } else {
            return true;
        }
    },

    signInSuccess(name) {
        // Set current user
        this.currentUser = this.accountList[name];
        console.log(`Successfully signed in as ${this.currentUser.name}.`)
        // Update log in button text content
        core.updateStatus();
    },

    signIn(name, password) {
        // Check if requested account exists
        if (this.accountList[name] != undefined) {
            // Check password
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
        // Unused
        return this.currentUser;
    },

    deleteAccount(name, password) {
        // TODO: Check if account exists
        // Deleting an account requires the account's password
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

// Test
accounts.accountList["devacc"].addIngredient("bread", 5, "unit");
accounts.accountList["devacc"].addIngredient("jasper", 1, "unit");
accounts.accountList["devacc"].addIngredient("cheese", 4, "unit");
