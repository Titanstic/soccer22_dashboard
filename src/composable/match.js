const inputErrorValidation = (form) => {
    let errorDetail = {};
    let errors = false;

    if(form.homeTeam === ""){
        errorDetail.homeTeam = "Please Enter Home";
        errors = true;
    }
    if(form.awayTeam === ""){
        errorDetail.awayTeam = "Please Enter Away";
        errors = true;
    }
    if(form.league === ""){
        errorDetail.league = "Please Enter league";
        errors = true;
    }
    if(form.rate1 === "" && form.rate2 === ""){
        errorDetail.rate1 = "Please Enter Rate 1";
        errors = true;
    }
    if(form.rate2 === "" && form.rate1 === ""){
        errorDetail.rate2 = "Please Enter Rate 2";
        errors = true;
    }
    if(form.goPaung === ""){
        errorDetail.goPaung = "Please Enter Go Paung";
        errors = true;
    }
    if((form.match === "false" && form.halfScore1 === "") || form.halfScore1 === null){
        errorDetail.halfScore1 = "Please Enter Half Score 1";
        errors = true;
    }
    if((form.match === "false" && form.halfScore2 === "") || form.halfScore2 === null){
        errorDetail.halfScore2 = "Please Enter Half Score 2";
        errors = true;
    }
    if(form.matchTime === ""){
        errorDetail.matchTime = "Please Choose Match Time";
        errors = true;
    }

    return {errorDetail, errors};
};

const inputEndMatchValidation = (form) => {
    let errorDetail = {};
    let errors = false;

    if(form.score1 === ""){
        errorDetail.score1 = "Please Enter Score1";
        errors = true;
    }
    if(form.score2 === ""){
        errorDetail.score2 = "Please Enter Score2";
        errors = true;
    }

    return {errorDetail, errors};
}

export {inputErrorValidation, inputEndMatchValidation};