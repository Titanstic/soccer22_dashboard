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

export {checkBalanceInput}