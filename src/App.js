import './App.css';
import MainRouter from "./router/MainRouter";
import { BrowserRouter } from "react-router-dom";
import { NavContextProvider } from "./context/NavContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./hasura/config";
import {AlertContextProvider} from "./context/AlertContext";

function App() {
    return (
        <ApolloProvider client={client}>
            <AlertContextProvider>
                <NavContextProvider>
                    <BrowserRouter>
                        <MainRouter/>
                    </BrowserRouter>
                </NavContextProvider>
            </AlertContextProvider>
        </ApolloProvider>
    );
}

export default App;