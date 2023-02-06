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

const getUpperCode = (data, user) => {
    let upperCode = "",
        receiver = "",
        sender = "",
        transfer = false;

    // Start Get Receiver
    if(data.super_code){
        upperCode += data.super_code;
        receiver += data.super_code;
    }
    if(data.senior_code){
        upperCode += `_${data.senior_code}`;
        receiver += data.senior_code;
    }
    if(data.master_code){
        upperCode += `_${data.master_code}`;
        receiver += data.master_code;
    }
    if(data.agent_code){
        upperCode += `_${data.agent_code}`;
        receiver += data.agent_code;
    }
    if(data.user_code){
        upperCode += `_${data.user_code}`;
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

    transfer = receiver.length === sender.length - 3;

    return {upperCode, transfer};
}

export {checkBalanceInput, getReceiverCode, getUpperCode};