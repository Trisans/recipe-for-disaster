let accounts = {
    accountList: {

    },

    

    signIn(name, password) {
        if (this.accountList[name] != undefined) {
            if (this.accountList[name].password === password) {
                signInSuccess();
            }
        }
    }
}