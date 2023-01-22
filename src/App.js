import './App.css';
import MainRouter from "./router/MainRouter";
import { BrowserRouter } from "react-router-dom";
import { NavContextProvider } from "./context/NavContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./hasura/config";

function App() {
    return (
        <ApolloProvider client={client}>
            <NavContextProvider>
                <BrowserRouter>
                    <MainRouter/>
                </BrowserRouter>
            </NavContextProvider>
        </ApolloProvider>
    );
}

export default App;