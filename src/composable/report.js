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

     newComisionHistorys.forEach((each, index) => {
        if(newGroups.length > 0){
            newGroups.forEach((group, index) => {
                if(group.user.id === each[key].user.id){
                    // start for total member
                    if(Math.sign(each[key].bet_slip.win_lose_cash) === -1){
                        newGroups[index] = {...group,
                            bet_slip: {
                                ...group.bet_slip,
                                balance: group.bet_slip.balance + each[key].bet_slip.balance,
                                win_lose_cash: group.bet_slip.win_lose_cash - Math.abs(each[key].bet_slip.win_lose_cash)
                            },
                            real_win_lose_cash: each[key].bet_slip.win_lose_cash
                        };
                    }else{
                        newGroups[index] = {...group,
                            bet_slip: {
                                ...group.bet_slip,
                                balance: group.bet_slip.balance + each[key].bet_slip.balance,
                                win_lose_cash: group.bet_slip.win_lose_cash + (each[key].bet_slip.win_lose_cash * 0.95)
                            },
                            real_win_lose_cash: each[key].bet_slip.win_lose_cash

                        };
                    }
                    // end for total member

                    // start for total company
                    if(Math.sign(each[key-1].bet_slip.win_lose_cash) === -1){
                        newCompanyGroups[index] = {...newCompanyGroups[index],
                            bet_slip: {
                                ...newCompanyGroups[index].bet_slip,
                                balance: newCompanyGroups[index].bet_slip.balance + each[key-1].bet_slip.balance,
                                win_lose_cash: newCompanyGroups[index].bet_slip.win_lose_cash - Math.abs(each[key-1].bet_slip.win_lose_cash)
                            },
                            real_win_lose_cash: each[key-1].bet_slip.win_lose_cash
                        };
                    }else {
                        newCompanyGroups[index] = {...newCompanyGroups[index],
                            bet_slip: {
                                ...newCompanyGroups[index].bet_slip,
                                balance: newCompanyGroups[index].bet_slip.balance + each[key-1].bet_slip.balance,
                                win_lose_cash: newCompanyGroups[index].bet_slip.win_lose_cash + (each[key-1].bet_slip.win_lose_cash *0.95)
                            },
                            real_win_lose_cash: each[key-1].bet_slip.win_lose_cash
                        };
                    }
                    // end for total company

                    newItem = false;
                }else{
                    newItem = true
                }
            })

            if(newItem) {
                if(Math.sign(each[key].bet_slip.win_lose_cash) !== -1){
                    newGroups[newGroups.length] = {...each[key],
                        bet_slip: {
                            ...each[key].bet_slip,
                            win_lose_cash: each[key].bet_slip.win_lose_cash * 0.95
                        },
                        real_win_lose_cash: each[key].bet_slip.win_lose_cash
                    };
                }else{
                    newGroups[newGroups.length] = {...each[key], real_win_lose_cash: each[key].bet_slip.win_lose_cash};
                }

                if(Math.sign(each[key-1].bet_slip.win_lose_cash) !== -1) {
                    newCompanyGroups[newCompanyGroups.length] = {
                        ...each[key-1],
                        bet_slip: {
                            ...each[key].bet_slip,
                            win_lose_cash: each[key-1].bet_slip.win_lose_cash * 0.95
                        },
                        real_win_lose_cash: each[key-1].bet_slip.win_lose_cash
                    };
                }else{
                    newGroups[newCompanyGroups.length] = {...each[key-1], real_win_lose_cash: each[key-1].bet_slip.win_lose_cash};
                }

                totalNewGroupComission += Math.abs(each[key].percent_commision);
                totalNewCompanyComission += Math.abs(each[key - 1].percent_commision);
            }else{
                // for total comission
                if(totalNewGroupComission === 0 && totalNewCompanyComission === 0){
                    totalNewGroupComission = each[key].percent_commision;
                    totalNewCompanyComission = each[key - 1].percent_commision;
                }
            }
        }else{
            if(Math.sign(each[key].bet_slip.win_lose_cash) !== -1){
                newGroups[0] = {...each[key],
                    bet_slip: {
                        ...each[key].bet_slip,
                        win_lose_cash: each[key].bet_slip.win_lose_cash * 0.95
                    },
                    real_win_lose_cash: each[key].bet_slip.win_lose_cash
                };
            }else{
                newGroups[0] = {...each[key], real_win_lose_cash: each[key].bet_slip.win_lose_cash};
            }

            if(Math.sign(each[key-1].bet_slip.win_lose_cash) !== -1) {
                newCompanyGroups[0] = {
                    ...each[key-1],
                    bet_slip: {
                        ...each[key-1].bet_slip,
                        win_lose_cash: each[key-1].bet_slip.win_lose_cash * 0.95
                    },
                    real_win_lose_cash: each[key-1].bet_slip.win_lose_cash
                };
            }else{
                newCompanyGroups[0] = {...each[key - 1], real_win_lose_cash: each[key-1].bet_slip.win_lose_cash};
            }
        }

         // Start Total Group and Company
         totalNewGroupBalance += each[key].bet_slip.balance;
         totalNewCompanyBalance += each[key - 1].bet_slip.balance;

         if(Math.sign(each[key].bet_slip.win_lose_cash) === -1){
             totalNewGroupWinLose -= Math.abs(each[key].bet_slip.win_lose_cash);
         }else{
             totalNewGroupWinLose += each[key].bet_slip.win_lose_cash * 0.95;
         }

         if(Math.sign(each[key - 1].bet_slip.win_lose_cash) === -1){
             totalNewCompanyWinLose -= Math.abs(each[key - 1].bet_slip.win_lose_cash);
         }else{
             totalNewCompanyWinLose += each[key - 1].bet_slip.win_lose_cash * 0.95;
         }
         // End Total Group and Company
    });

    return {newGroups, totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose, newCompanyGroups, totalNewCompanyComission, totalNewCompanyBalance, totalNewCompanyWinLose};
};

const filterEachUser = (newComisionHistorys, userID) => {
    let eachUserGroup = [];
    let totalNewGroupComission = 0;
    let totalNewGroupBalance = 0;
    let totalNewGroupWinLose = 0;

    newComisionHistorys.forEach(comision => {
        if(comision[comision.length - 1].user.id === userID) {
            console.log(comision[comision.length-1].bet_slip.win_lose_cash);
            eachUserGroup.push(comision[comision.length - 1]);
            totalNewGroupComission += Math.abs(comision[comision.length - 1].bet_slip.win_lose_cash.toFixed(2) * comision[comision.length - 1].percent_commision.toFixed(3)/100);
            totalNewGroupBalance += comision[comision.length - 1].bet_slip.balance;

            if(Math.sign(comision[comision.length - 1].bet_slip.win_lose_cash) === -1){
                totalNewGroupWinLose -= Math.abs(comision[comision.length - 1].bet_slip.win_lose_cash);
            }else{
                totalNewGroupWinLose += comision[comision.length - 1].bet_slip.win_lose_cash * 0.95;
            }
        }
    });

    return {eachUserGroup, totalNewGroupComission, totalNewGroupBalance, totalNewGroupWinLose,}
};

const checkCompany = (commissionlength, key, whereArrLength) => {
    let showCompany = false;
    // console.log(commissionlength, key, whereArrLength)
    // if(whereArrLength > 0){
    //     showCompany = true;
    // }else{
    //     showCompany = false;
    // }

    return showCompany;
};

export { filterComision, filterGroupComision, filterEachUser, checkCompany}