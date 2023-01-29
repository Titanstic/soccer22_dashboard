import * as jose from "jose";

const checkInputData = (username, password) => {
    let errorExist = false;
    let tempError = {};
    if(!username){
        tempError.username = "User name field is required";
        errorExist = true;
    }
    if(!password){
        tempError.password = "Password field is required";
        errorExist = true;
    }

    return {errorExist, tempError};
};

const generateUserToken = (accessToken) => {
    let {user_id} = jose.decodeJwt(accessToken);

    const userToken = JSON.stringify({
        token: accessToken,
        userID: user_id
    });
    window.localStorage.setItem("loggedUser", userToken);
};

const decodeUserToken = () => {
    let userToken = window.localStorage.getItem("loggedUser");

    if(userToken){
        let userData = JSON.parse(userToken);
        return userData;
    }
};

export {checkInputData, generateUserToken, decodeUserToken};