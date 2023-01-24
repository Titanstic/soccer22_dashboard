import {useContext, useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../gql/auth";
import {useNavigate} from "react-router-dom";
import {checkInputData, decodeUserToken, generateUserToken} from "../composable/login";
import AlertContext from "../context/AlertContext";
import ShowAlert from "../component/alert/ShowAlert";

const LoginView = () => {
    // useState
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({username: "", password: ""});
    // useNavigate
    const navigate = useNavigate();
    // useContext
    const {alert, setAlert, setAlertError} = useContext(AlertContext);

    // Start Useful Function
    const showAlert = (message, bool) => {
        setAlert(message);
        setAlertError(bool);
        setTimeout(() => {
            setAlert("");
            setAlertError(false);
        }, 3000);
    };
    // End Useful Function

    // Start useEffect
    useEffect(() => {
        const userData = decodeUserToken();

        if(userData){
            navigate("/profile");
        }
    }, []);
    // End useEffect

    //--------Start Mutation
    // accountLogin mutation
    const [ accountLogin ] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error);
        },
        onCompleted: (result) => {
            setUsername("");
            setPassword("")
            setError({username: "", password: ""});

            if(result.AdminLogIn.error){
                showAlert(result.AdminLogIn.message, true);
            }

            if(result.AdminLogIn.accessToken){
                generateUserToken(result.AdminLogIn.accessToken);

                showAlert("login successfully", false);
                navigate("/profile");
            }

        }
    })
    //------- End Mutation

    // Start Function

    // account sign in function
    const signInAccount = () => {
        setLoading(true);
        setError({username: "", password: ""});

        let {errorExist, tempError} = checkInputData(username, password);
        if(errorExist){
            setError(tempError);
        }

        if(username && password){
            accountLogin({ variables: { username, password }});
        }
        setLoading(false);
    };

    // End Function

    return (
        <div className="h-screen bg-gray-50 flex justify-center items-center overflow-hidden relative px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="">
                    <h1 className="text-4xl font-bold tracking-tight text-center text-gray-900 mt-6">Soccer 22 Dashboard</h1>
                </div>

                {/*Start Login Form*/}
                <div className="space-y-8 mt-8">
                    <div className="-space-y-px rounded-sm shadow-sm">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input type="text" id="username" className={`block w-full rounded-none rounded-t-md border ${error.username ? "border-red-300" : "border-gray-300"}  text-gray-900 relative px-3 py-3 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm`} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input type="password" id="password" className={`block w-full rounded-none rounded-t-md border ${error.password ? "border-red-300" : "border-gray-300"}  text-gray-900 relative px-3 py-3 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                        </div>
                    </div>

                    <div>
                        <button className={`block w-full bg-indigo-500 text-white text-sm font-medium border border-transparent rounded shadow ${loading ? "cursor-progress" : "cursor-pointer hover:bg-indigo-600"} px-4 py-3 focus:ring-2 focus:indigo-500 focus:ring-offset-2`} onClick={signInAccount} disabled={loading}>Sign in</button>
                    </div>
                </div>
                {/*End Login Form*/}
            </div>

            {/*Start Alert Component*/}
            {
                alert && <ShowAlert/>
            }
            {/*End Alert Component*/}
        </div>
    )
};

export default LoginView;