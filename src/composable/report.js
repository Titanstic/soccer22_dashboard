const filterComision = (comisionHistorys, whereArr) => {
    let newComisionHistorys = [];
    let newItem = false;

    // outer looping
    comisionHistorys.forEach(comision => {
        if(newComisionHistorys.length === 0){
            newComisionHistorys.push([comision]);
        }else{
            // inner looping
            newComisionHistorys.forEach(newCom => {
                if(newCom[0].slip_id === comision.slip_id){
                    newCom.unshift(comision);
                    newItem = false;
                }else{
                    newItem = true;
                }
            });

            if(newItem){
                newComisionHistorys.push([comision]);
            }
        }
    });

    if(whereArr.length > 0){
        newComisionHistorys.map(history => {
            history.splice(0, whereArr.length);
        })
    }

    return {newComisionHistorys};
};

const filterGroupComision = (newComisionHistorys, key) => {
    let newGroups = [];
    let totalNewGroupComission = 0;
    let totalNewGroupBalance = 0;
    let totalNewGroupWinLose = 0;
    let newCompanyGroups = [];
    let totalNewCompanyComission = 0;
    let totalNewCompanyBalance = 0;
    let totalNewCompanyWinLose = 0;
    let newItem = false;

     newComisionHistorys.forEach(each => {
        if(newGroups.length > 0){
            newGroups.forEach((group, index) => {
                if(group.user.id === each[key].user.id){
                    // for total member
                     newGroups[index] = {...group,
                         bet_slip: {
                             ...group.bet_slip,
                             balance: group.bet_slip.balance + each[key].bet_slip.balance,
                             win_lose_cash: group.bet_slip.win_lose_cash + each[key].bet_slip.win_lose_cash
                         }
                     };

                     // for total company
                    newCompanyGroups[index] = {...newCompanyGroups[index],
                        bet_slip: {
                            ...newCompanyGroups[index].bet_slip,
                            balance: newCompanyGroups[index].bet_slip.balance + each[key-1].bet_slip.balance,
                            win_lose_cash: newCompanyGroups[index].bet_slip.win_lose_cash + each[key-1].bet_slip.win_lose_cash
                        }
                    };

                    newItem = false;
                }else{
                    newItem = true
                }
            })

            if(newItem) {
                newGroups.push(each[key]);
                newCompanyGroups.push(each[key-1]);

                totalNewGroupComission += each[key].percent_commision;
                totalNewCompanyComission += each[key - 1].percent_commision;

            }else{
                if(totalNewGroupComission === 0 && totalNewCompanyComission === 0){
                    totalNewGroupComission = each[key].percent_commision;
                    totalNewCompanyComission = each[key - 1].percent_commision;
                }
            }
        }else{
            newGroups.push(each[key]);
            newCompanyGroups.push(each[key-1]);
        }

         totalNewGroupBalance += each[key].bet_slip.balance;
         totalNewGroupWinLose += each[key].bet_slip.win_lose_cash;

         totalNewCompanyBalance += each[key - 1].bet_slip.balance;
         totalNewCompanyWinLose += each[key - 1].bet_slip.win_lose_cash;
    });

    return {newGroups, totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose, newCompanyGroups, totalNewCompanyComission, totalNewCompanyBalance, totalNewCompanyWinLose};
};

const filterEachUser = (newComisionHistorys, userID) => {
    let eachUserGroup = [];
    let totalNewGroupComission = 0;
    let totalNewGroupBalance = 0;
    let totalNewGroupWinLose = 0;

    newComisionHistorys.map(comision => {
        if(comision[comision.length - 1].user.id === userID) {
            eachUserGroup.push(comision[comision.length - 1]);

            totalNewGroupComission += comision[comision.length - 1].percent_commision;
            totalNewGroupBalance += comision[comision.length - 1].bet_slip.balance;
            totalNewGroupWinLose += comision[comision.length - 1].bet_slip.win_lose_cash;
        }
    });

    return {eachUserGroup, totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose,}
};

const checkCompany = (commissionlength, key, whereArrLength) => {
    let showCompany = false;
    console.log(commissionlength, key, whereArrLength)
    // if(whereArrLength > 0){
    //     showCompany = true;
    // }else{
    //     showCompany = false;
    // }

    return showCompany;
}
export { filterComision, filterGroupComision, filterEachUser, checkCompany}