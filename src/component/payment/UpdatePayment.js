import {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {checkBalanceInput} from "../../composable/payment";
import {BALANCE_DEDUCT, BALANCE_DEPOSIT, BALANCE_WITHDRAW} from "../../gql/payment";
import AlertContext from "../../context/AlertContext";
import PaymentGqlContext from "../../context/PaymentGqlContext";

const UpdatePayment = ({updateModalHandle, resultPayment, balance, userCode, userBalance, accStatus, action}) => {
    // useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addBalance, setAddBalance] = useState(null);
    // useContext
    const {showAlert} = useContext(AlertContext);
    const { resultHistory, eachHistoryResult } = useContext(PaymentGqlContext);

    // Start Mutation
    const [balanceWithDraw] = useMutation(BALANCE_WITHDRAW, {
        onError: (error) => {
            console.log("update balance", error);
        },
        onCompleted: (result) => {
            console.log(result);
            if(result.BalanceWithdraw.error === 1){
                showAlert(result.BalanceWithdraw.message, true);
            }
            if (result.BalanceWithdraw.error == 2){
                showAlert(result.BalanceWithdraw.message, true);
            }
            showAlert("Transfer Successfully", false);
            setError(null);
            setAddBalance(0);

            resultHistory.refetch();
            eachHistoryResult.refetch();
            resultPayment.refetch();
        }
    });

    const [balanceDeposit] = useMutation(BALANCE_DEPOSIT, {
        onError: (error) => {
            console.log(error);
        },
        onCompleted: (result) => {
            console.log(result);
            showAlert("Transfer Successfully", false);

            setError(null);
            setAddBalance(0);

            resultHistory.refetch();
            eachHistoryResult.refetch();
            resultPayment.refetch();
        }
    });

    const [balanceDeduct] = useMutation(BALANCE_DEDUCT, {
        onError: (error) => {
            console.log(error);
        },
        onCompleted: (result) => {
            console.log(result);
            showAlert("Deduct Successfully", false);

            setError(null);
            setAddBalance(0);

            resultHistory.refetch();
            eachHistoryResult.refetch();
            resultPayment.refetch();
        }
    });

    // End Mutation

    //Start Function
    const inputHandle = (e) => {
        if(isNaN(e.target.value)){
            setError("Please Enter a number only");
        }else{
            setError(null);
            setAddBalance(Number(e.target.value));
        }
    };

    const updateBalance = () => {
        setLoading(true);
        let {tempError, errorExist} = checkBalanceInput(balance, addBalance);

        if(errorExist){
           setError(tempError);
        }else{
            try{
                if(accStatus === "lower" && action === "transfer"){
                    balanceWithDraw({variables: {balance: addBalance, receiverCode: userCode}});
                }else{
                    balanceDeposit({ variables: {balance: addBalance, receiverCode: userCode}});
                }

            }catch (e) {
                console.log(e.message);
            }
            updateModalHandle(null, null, null, null, null);
        }
        setLoading(false);
    };

    const deductBalance = () => {
        setLoading(true);
        let {tempError, errorExist} = checkBalanceInput(userBalance, addBalance);

        if(errorExist){
            setError(tempError);
        }else{
            try {
                if(accStatus === "lower" && action === "deduct"){
                    balanceDeduct({ variables: {balance: addBalance, detuctCode: userCode}});
                }
            }catch (e) {
                console.log(e.message);
            }

            updateModalHandle(null, null, null, null, null, null);
        }

        setLoading(false);
    };
    // End Function

    return (
        <div className="w-full h-full bg-gray-200 flex justify-center items-center bg-opacity-90 overflow-hidden absolute top-0 sm:w-10/12">
            <div className="w-5/6 bg-white rounded shadow shadow-gray-400 mx-auto py-5 px-3 sm:w-2/6">
                <p className="text-xl font-bold leading-4 pt-4 sm:text-2xl">Add Payment for {userCode}</p>

                <hr className="my-5"/>

                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 relative">
                        <div className="flex shadow rounded-md shadow-sm mt-1">
                            <span className="w-16 sm:w-18 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Balance</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={addBalance ? addBalance : 0} onChange={(e) => inputHandle(e)} placeholder=" Balance" />
                        </div>
                        {
                            error && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error}</span></div>
                        }
                    </div>
                </div>

                <div className="text-right mt-8">
                    <button className="bg-red-500 text-sm text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-2 sm:py-3 sm:text-base" onClick={() => updateModalHandle(null, null, null, null, null)}>Cancel</button>
                    {
                        action === "transfer" ?
                            <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-sm text-white rounded shadow hover:bg-blue-400 px-4 py-2 sm:py-3 sm:text-base`} onClick={updateBalance} disabled={loading}>Transfer</button>
                            :
                            <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-sm text-white rounded shadow hover:bg-blue-400 px-4 py-2 sm:py-3 sm:text-base`} onClick={deductBalance} disabled={loading}>Deduct</button>
                    }
                </div>
            </div>
        </div>
    )
};

export default UpdatePayment;