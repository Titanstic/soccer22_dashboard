const filterTransferUsers = (data, arr) => {
    let filterUser = [];

    if(arr.length > 0){
        data.forEach(u => {
            let code = `${u.super_code ? u.super_code : ""}${u.senior_code ? u.senior_code : ""}${u.master_code ? u.master_code : ""}${u.agent_code ? u.agent_code : ""}${u.user_code ? u.user_code : ""}`;
            // to check each length and return
            if(code.length === (arr.length * 3) + 3){
                filterUser.push(u);
            }
        });

        return filterUser;
    }

    data.forEach(u => {
        let code = `${u.super_code ? u.super_code : ""}${u.senior_code ? u.senior_code : ""}${u.master_code ? u.master_code : ""}${u.agent_code ? u.agent_code : ""}${u.user_code ? u.user_code : ""}`;

        // to check each length and return
        if(code.length === (arr.length + 3)){
            filterUser.push(u);
        }
    });

    return filterUser;
}

const checkBalanceInput = (senderBalance, receiveBalance) => {
    let tempError = "",
        errorExist = false;

    if(receiveBalance <= 0){
        errorExist = true;
        tempError = "Balance is greater than 0";
    }

    if(senderBalance < receiveBalance){
        errorExist = true;
        tempError = "Insufficient Amount";
    }
    return {tempError, errorExist}
};

const getReceiverCode = (data, user) => {
    let receiverCode = "",
        receiver = "",
        sender = "",
        transfer = false;

    // Start Get Receiver
    if(data.super_code){
        receiverCode += data.super_code;
        receiver += data.super_code;
    }
    if(data.senior_code){
        receiverCode += `_${data.senior_code}`;
        receiver += data.senior_code;
    }
    if(data.master_code){
        receiverCode += `_${data.master_code}`;
        receiver += data.master_code;
    }
    if(data.agent_code){
        receiverCode += `_${data.agent_code}`;
        receiver += data.agent_code;
    }
    if(data.user_code){
        receiverCode += `_${data.user_code}`;
        receiver += data.user_code;
    }
    // End Get Receiver

    // Start Get Sender
    if(user.super_code){
        sender += user.super_code;
    }
    if(user.senior_code){
        sender += user.senior_code;
    }
    if(user.master_code){
        sender += user.master_code;
    }
    if(user.agent_code){
        sender += user.agent_code;
    }
    if(user.user_code){
        sender += user.user_code;
    }
    // End Get Sender

    transfer = receiver.length === sender.length + 3;

    return {receiverCode, transfer};
};

const getCurrentDate = () => {
    let date = new Date();

    let currentDate = date.toISOString().split("T")[0];
    let createdDate = `${currentDate}T00:00:00+00:00`;

    let updatedDate = `${currentDate}T24:00:00+00:00`;

    return {currentDate, createdDate, updatedDate};
};

export {filterTransferUsers, checkBalanceInput, getReceiverCode, getCurrentDate};