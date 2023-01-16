import './App.css';
import MainRouter from "./router/MainRouter";
import {BrowserRouter} from "react-router-dom";
import {NavContextProvider} from "./context/NavContext";

function App() {
    return (
        <NavContextProvider>
            <BrowserRouter>
                <MainRouter/>
            </BrowserRouter>
        </NavContextProvider>
    );
}

export default App;
