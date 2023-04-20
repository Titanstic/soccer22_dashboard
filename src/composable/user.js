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

const accountCount = (data, whereArrLength) => {
    let superAcc = 0,
        seniorAcc =0,
        masterAcc =0,
        agentAcc =0,
        userAcc = 0,
        totalBalance = 0,
        totalMember = 0;

    data.forEach(u => {
        let code = `${u.super_code ? u.super_code : ""}${u.senior_code ? u.senior_code : ""}${u.master_code ? u.master_code : ""}${u.agent_code ? u.agent_code : ""}${u.user_code ? u.user_code : ""}`;
        // To get account's count from length
        switch (code.length) {
            case 3:
                superAcc += 1;
                break;
            case 6:
                seniorAcc += 1;
                break;
            case 9:
                masterAcc += 1;
                break;
            case 12:
                agentAcc += 1;
                break;
            case 15:
                userAcc += 1;
                break;
        }

        totalBalance += u.balance;
    });

    switch (whereArrLength){
        case 0:
            totalMember += seniorAcc + masterAcc + agentAcc + userAcc;
            break;
        case 1:
            totalMember += masterAcc + agentAcc + userAcc;
            break;
        case 2:
            totalMember += agentAcc + userAcc;
            break;
        case 3:
            totalMember += userAcc;
            break;
    }

    return {superAcc, seniorAcc, masterAcc, agentAcc, userAcc, totalBalance, totalMember};
}

export { checkUserRow, whereUserRow, accountCount };