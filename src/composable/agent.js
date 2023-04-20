const checkInputData = (username, contactName, password, commission, maxBet) => {
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
    if(!commission){
        tempError.commission = "Commission field is required";
        errorExist = true;
    }
    if(!maxBet){
        tempError.maxBet = "Max Bet field is required";
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

const filterUser = (result, whereArr) => {
    let filterUser = [];

    result.forEach(r => {
        let key = `${r.super_code ? r.super_code : ""}${r.senior_code ? " "+r.senior_code : ""}${r.master_code ? " "+r.master_code : ""}${r.agent_code ? " "+r.agent_code : ""}${r.user_code ? " "+r.user_code : ""}`;
        let keyArr = key.split(" ");

        if(keyArr.length > whereArr.length + 1){
            filterUser.forEach(f => {
                let objectKey = f[0]["objectKey"];
                let objectKeyArr = objectKey.split(" ");

                if(keyArr[keyArr.length - 2] === objectKeyArr[objectKeyArr.length - 1]){
                    f.push(r);
                }
            })
        } else{
            r = {...r, "objectKey": key};
            filterUser.push([r]);
        }
    });
    return filterUser;
}

export {checkInputData, updateCheckInputData, filterUser};