import {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import AuthContext from "../../context/AuthContext";
import {checkBalanceInput} from "../../composable/payment";
import {INSERT_BALANCE_TRANSFER_HISTORY, UPDATE_USER_BALANCE_BY_PK} from "../../gql/payment";
import AlertContext from "../../context/AlertContext";
import PaymentGqlContext from "../../context/PaymentGqlContext";

const UpdatePayment = ({updateModalHandle, balance, userdata}) => {
    // useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addBalance, setAddBalance] = useState(null);
    // useContext
    const {decodeToken} = useContext(AuthContext);
    const {showAlert} = useContext(AlertContext);
    const { resultHistory } = useContext(PaymentGqlContext);

    // Start Mutation
    const [updateUserBalance] = useMutation(UPDATE_USER_BALANCE_BY_PK, {
        onError: (error) => {
            console.log("update balance", error);
        },
        onCompleted: (result) => {
            console.log(result);
        }
    });

    const [insertBalanceTransferHistory] = useMutation(INSERT_BALANCE_TRANSFER_HISTORY, {
        onError: (error) => {
            console.log("insert balance transfer history", error);
        },
        onCompleted: (result) => {
            showAlert("Transfer Successfully", false);
            resultHistory.refetch();
            setError(null);
            setAddBalance(0);
        }
    })
    // End Mutation

    //Start Function
    const inputHandle = (e) => {
        setAddBalance(Number(e.target.value));
    }

    const updateBalance = () => {
        setLoading(true);
        let {tempError, errorExist} = checkBalanceInput(balance, addBalance);

        if(errorExist){
           setError(tempError);
        }else{
            let add = addBalance + userdata.balance;
            let sub = balance - addBalance;

            try{
                // update sender balance account
                updateUserBalance({variables: {balance: sub, id: decodeToken.userID}});
                // update receiver balance account
                updateUserBalance({variables: {balance: add, id: userdata.id}});
                insertBalanceTransferHistory({variables: {receiver_id: userdata.id, sender_id: decodeToken.userID, transfer_amount: addBalance}});
            }catch (e) {
                console.log(e.message);
            }
            setLoading(false);
            updateModalHandle(null, 0);
        }
    }
    // End Function

    return (
        <div className="w-10/12 h-full bg-gray-200 flex justify-center items-center bg-opacity-90 overflow-hidden absolute top-0">
            <div className="w-2/3 bg-white rounded shadow shadow-gray-400 mx-auto py-5 px-3">
                <p className="text-2xl font-bold leading-4 pt-4 pl-5">Add Payment for {userdata.contact_name}</p>

                <hr className="my-5"/>
                
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2 relative">
                        <div className="flex shadow rounded-md shadow-sm mt-1">
                            <span className="w-24 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500">Balance</span>
                            <input type="text" className={`block w-full flex-1 rounded-none rounded-r-md border ${error ? "border-red-400" : "border-gray-400"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3 py-3`} value={addBalance ? addBalance : 0} onChange={(e) => inputHandle(e)} placeholder=" Balance" />
                        </div>
                        {
                            error && <div className="absolute top-full right-0"><span className="text-sm text-red-400">{error}</span></div>
                        }
                    </div>
                </div>

                <div className="text-right mt-8">
                    <button className="bg-red-500 text-white rounded shadow hover:bg-red-400 mr-3 px-4 py-3" onClick={() => updateModalHandle(null, 0)}>Cancel</button>
                    <button className={`${loading ? "bg-blue-400" : "bg-blue-500"} text-white rounded shadow hover:bg-blue-400 px-4 py-3`} onClick={updateBalance} disabled={loading}>Add Balance</button>
                </div>
            </div>
        </div>
    )
};

export default UpdatePayment;