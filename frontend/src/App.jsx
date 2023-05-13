import {Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Search from "./pages/Search.jsx";
import List from "./pages/List.jsx";
import {useState} from "react";
import Main from "./layout/Main.jsx";

function App() {
    const [user, setUser] = useState(null)
    //TODO: get token if could to remember user state
  return (
        <Routes>
            <Route path="/" element={<Main user={user} />}>
                <Route index path="/" element={<Home />}/>
                <Route path="/signup" element={<SignUp setUser={setUser} />}/>
                <Route path="/signin" element={<SignIn setUser={setUser} />}/>
                <Route path="/search" element={<Search />}/>
                <Route path="/list" element={<List />}/>
            </Route>
        </Routes>
  );
}

export default App;
