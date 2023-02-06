import {useMutation} from "@apollo/client";
import {BALANCE_DEDUCT} from "../../gql/payment";
import {useContext} from "react";
import AlertContext from "../../context/AlertContext";
import PaymentGqlContext from "../../context/PaymentGqlContext";

const DeductAllPayment = ({deductAllModal, resultPayment, resultUpperAcc, userCode, userBalance}) => {
    // useContext
    const {showAlert} = useContext(AlertContext);
    const { resultHistory } = useContext(PaymentGqlContext);

    //Start Mutation
    const [balanceDeduct] = useMutation(BALANCE_DEDUCT, {
        onError: (error) => {
            console.log(error);
        },
        onCompleted: (result) => {
            console.log(result);
            showAlert("Deduct Successfully", false);

            resultHistory.refetch();
            resultPayment.refetch();
            resultUpperAcc.refetch();
        }
    });
    //End Mutation

    const deductAll = () => {
        try {
            balanceDeduct({variables: {balance: userBalance, detuctCode: userCode}});
        }catch (e) {
            console.log(e.message);
        }

        deductAllModal(null, null);
    };

    return (
        <div className="w-10/12 h-full bg-gray-200 flex justify-center items-center bg-opacity-90 overflow-hidden absolute top-0">
            <div className="w-2/5 bg-white rounded shadow shadow-gray-400 mx-auto">
                <div className="py-10 px-4">
                    <p className="text-xl text-gray-900">Are you sure you want to deduct all balance from this account?</p>
                </div>

                <div className="w-full bg-gray-200 flex justify-end py-3">
                    <button className="bg-white font-medium shadow border rounded mr-4 px-5 py-2 hover:bg-gray-50" onClick={() => deductAllModal(null, null)}>Cancel</button>
                    <button className="bg-red-600 text-white font-medium shadow border rounded mr-4 px-5 py-2 hover:bg-red-500" onClick={deductAll}>Deduct All</button>
                </div>
            </div>
        </div>
    );
};

export default DeductAllPayment;