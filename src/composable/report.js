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

export { filterComision }