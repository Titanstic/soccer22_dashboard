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
    for(const key in userRow){
        if(userRow[key]){
            tempWhere[key] = { _eq: userRow[key] };
        }
    }

    return tempWhere;
}

export { checkUserRow, whereUserRow };