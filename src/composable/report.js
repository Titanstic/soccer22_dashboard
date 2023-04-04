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
    let newCompanyGroups = [];

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

                     // for total company
                    newCompanyGroups[index] = {...newCompanyGroups[index],
                        actual_commision: newCompanyGroups[index].actual_commision + each[0].actual_commision,
                        bet_slip: {
                            ...newCompanyGroups[index].bet_slip,
                            balance: newCompanyGroups[index].bet_slip.balance + each[0].bet_slip.balance,
                            win_lose_cash: newCompanyGroups[index].bet_slip.win_lose_cash + each[0].bet_slip.win_lose_cash
                        }
                    }
                }else{
                    newGroups.push(each[key]);
                    newCompanyGroups.push(each[0]);
                }
            })
        }else{
            newGroups.push(each[key]);
            newCompanyGroups.push(each[0]);
        }
    });
    return {newGroups, newCompanyGroups};
};

const filterEachUser = (newComisionHistorys, key) => {
    let eachUserGroup = [];

    newComisionHistorys.map(comision => {
        eachUserGroup.push(comision[key])
    });
    return {eachUserGroup}
}
export { filterComision, filterGroupComision, filterEachUser }