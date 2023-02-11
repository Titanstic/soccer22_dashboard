const checkInputData = (username, contactName, password) => {
    let errorExist = false;
    let tempError = {};

    if(!username){
        tempError.username = "User name field is required";
        errorExist = true;
    }
    if(!contactName){
        tempError.contactName = "Contact field is required";
        errorExist = true;
    }
    if(!password){
        tempError.password = "Password field is required";
        errorExist = true;
    }
    return {errorExist, tempError};
};

const updateCheckInputData = (password) => {
    let errorExist = false;
    let tempError = {};

    if(!password){
        tempError.password = "Password field is required";
        errorExist = true;
    }
    return {errorExist, tempError};
};

export {checkInputData, updateCheckInputData};