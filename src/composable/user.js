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

    return {tempWhere, tempRowKey, tempRowValue};
};

const accountCount = (data) => {
    let superAcc = 0,
        seniorAcc =0,
        masterAcc =0,
        agentAcc =0,
        userAcc = 0,
        totalBalance = 0;

    data.forEach(u => {
        let code = `${u.super_code ? u.super_code : ""}${u.senior_code ? u.senior_code : ""}${u.master_code ? u.master_code : ""}${u.agent_code ? u.agent_code : ""}${u.user_code ? u.user_code : ""}`;

        // To get account's count from length
        if(code.length === 3){
            superAcc += 1;
        }
        if(code.length === 6){
            seniorAcc += 1;
        }
        if(code.length === 9){
            masterAcc += 1;
        }
        if (code.length === 12){
            agentAcc += 1;
        }
        if(code.length === 15) {
            userAcc += 1;
        }

        totalBalance += u.balance;
    });

    return {superAcc, seniorAcc, masterAcc, agentAcc, userAcc, totalBalance};
}

export { checkUserRow, whereUserRow, accountCount };