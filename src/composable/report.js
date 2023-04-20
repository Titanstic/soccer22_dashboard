const filterComision = (comisionHistorys) => {
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
                         actual_commision: group.actual_commision + each[key].actual_commision,
                         bet_slip: {
                             ...group.bet_slip,
                             balance: group.bet_slip.balance + each[key].bet_slip.balance,
                             win_lose_cash: group.bet_slip.win_lose_cash + each[key].bet_slip.win_lose_cash
                         }
                     };

                     // console.log(newGroups);

                     // for total company
                    newCompanyGroups[index] = {...newCompanyGroups[index],
                        actual_commision: newCompanyGroups[index].actual_commision + each[key-1].actual_commision,
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
            }
        }else{
            newGroups.push(each[key]);
            newCompanyGroups.push(each[key-1]);
        }

         totalNewGroupComission += each[key].actual_commision;
         totalNewGroupBalance += each[key].bet_slip.balance;
         totalNewGroupWinLose += each[key].bet_slip.win_lose_cash;

         totalNewCompanyComission += each[key - 1].actual_commision;
         totalNewCompanyBalance += each[key - 1].bet_slip.balance;
         totalNewCompanyWinLose += each[key - 1].bet_slip.win_lose_cash;
    });

    return {newGroups, totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose, newCompanyGroups, totalNewCompanyComission, totalNewCompanyBalance, totalNewCompanyWinLose};
};

const filterEachUser = (newComisionHistorys, key, userID) => {
    let eachUserGroup = [];
    let totalNewGroupComission = 0;
    let totalNewGroupBalance = 0;
    let totalNewGroupWinLose = 0;

    newComisionHistorys.map(comision => {
        if(comision[key].user.id === userID) {
            eachUserGroup.push(comision[key]);

            totalNewGroupComission += comision[key].actual_commision;
            totalNewGroupBalance += comision[key].bet_slip.balance;
            totalNewGroupWinLose += comision[key].bet_slip.win_lose_cash;
        }
    });
    return {eachUserGroup, totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose,}
}
export { filterComision, filterGroupComision, filterEachUser }