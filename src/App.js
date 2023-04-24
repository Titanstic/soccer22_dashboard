import './App.css';
import MainRouter from "./router/MainRouter";
import { BrowserRouter } from "react-router-dom";
import { NavContextProvider } from "./context/NavContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./hasura/config";
import {AlertContextProvider} from "./context/AlertContext";
import {AuthContextProvider} from "./context/AuthContext";
import {PaymentGqlContextProvider} from "./context/GqlContext";

function App() {
    return (
        <ApolloProvider client={client}>
            <AuthContextProvider>
                <AlertContextProvider>
                    <NavContextProvider>
                        <PaymentGqlContextProvider>
                            <BrowserRouter>
                                <MainRouter/>
                            </BrowserRouter>
                        </PaymentGqlContextProvider>
                    </NavContextProvider>
                </AlertContextProvider>
            </AuthContextProvider>
        </ApolloProvider>
    );
}

export default App;