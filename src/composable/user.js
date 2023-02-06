const checkUserRow = (userData) => {
    return {
        "super_code": userData.super_code,
        "senior_code": userData.senior_code,
        "master_code": userData.master_code,
        "agent_code": userData.agent_code,
        "user_code": userData.user_code
    };
};

let whereUserRow = (userRow) => {
    let tempWhere = {};
    let tempUpperWhere = {};


    let tempRowKey = [];
    let tempRowValue = [];

    // to get lower account
    for(const key in userRow){
        if(userRow[key]){
            tempWhere[key] = { _eq: userRow[key] };
            tempRowValue.push(userRow[key]);
            tempRowKey.push(key);
        }
    }

    // to get upper account
    for (let i = 0; i < tempRowKey.length - 1; i++){
        tempUpperWhere[tempRowKey[i]] = { _eq: tempRowValue[i] };
    }

    return {tempWhere, tempUpperWhere};
};



export { checkUserRow, whereUserRow };