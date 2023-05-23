import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Search from "./pages/Search.jsx";
import List from "./pages/List.jsx";
import { useState } from "react";
import Main from "./layout/Main.jsx";
import AfterSearch from "./pages/AfterSearch.jsx";
import http from "./axios/index.js";
import axios from "axios";
const stores = await http.get("v1/storeplace")

function App() {
  const [user, setUser] = useState(null);
  const [searchResult, setSearchResult] = useState([
    {
      image:
        "https://media.istockphoto.com/id/1344089225/photo/modern-warehouse-with-automated-goods-movement-system.jpg?b=1&s=170667a&w=0&k=20&c=gSNmRE4EgOUWLttyOMI3byG2fLANAiVbwtVq0chZhvQ=",
      address: "Room, 20 sqm Givataym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
    {
      image:
        "https://media.istockphoto.com/id/1405246054/photo/empty-warehouse-in-logistic-center.jpg?b=1&s=170667a&w=0&k=20&c=sNDJa2o9NLuVqkEVHFy21Xxj-BJMCLbkWcM69vAE5SQ=",
      address: "Room, 20 sqm Givataym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
    {
      image:
        "https://media.istockphoto.com/id/1299083810/photo/parcels-on-conveyor-belt-in-a-warehouse.jpg?b=1&s=170667a&w=0&k=20&c=gcKD93K_UvTRyb1zZ0OFAWOWjF9pvCpuxwjmk0k1kAQ=",
      address: "Room, 20 sqm Givataym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
    {
      image:
        "https://media.istockphoto.com/id/1299083810/photo/parcels-on-conveyor-belt-in-a-warehouse.jpg?b=1&s=170667a&w=0&k=20&c=gcKD93K_UvTRyb1zZ0OFAWOWjF9pvCpuxwjmk0k1kAQ=",
      address: "Room, 20 sqm Givataacaym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
    {
      image:
        "https://media.istockphoto.com/id/1299083810/photo/parcels-on-conveyor-belt-in-a-warehouse.jpg?b=1&s=170667a&w=0&k=20&c=gcKD93K_UvTRyb1zZ0OFAWOWjF9pvCpuxwjmk0k1kAQ=",
      address: "Room, 20 sqm Givataacdvdvdaym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
    {
      image:
        "https://media.istockphoto.com/id/1299083810/photo/parcels-on-conveyor-belt-in-a-warehouse.jpg?b=1&s=170667a&w=0&k=20&c=gcKD93K_UvTRyb1zZ0OFAWOWjF9pvCpuxwjmk0k1kAQ=",
      address: "Room, 20 sqm Givaacactaacdvdvdaym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
    {
      image:
        "https://media.istockphoto.com/id/1299083810/photo/parcels-on-conveyor-belt-in-a-warehouse.jpg?b=1&s=170667a&w=0&k=20&c=gcKD93K_UvTRyb1zZ0OFAWOWjF9pvCpuxwjmk0k1kAQ=",
      address: "Room, 20 sqm Givataacdvdacacvdaym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
  ]);
  //TODO: get token if could to remember user state
  return (
    <Routes>
      <Route path="/" element={<Main user={user} setUser={setUser} />}>
        <Route index path="/" element={<Home stores={stores.data} />} />
        <Route
          path="/search"
          element={<Search setResult={setSearchResult} />}
        />
        {searchResult !== null && (
          <Route
            path="/search-result"
            element={<AfterSearch result={searchResult} />}
          />
        )}
        {user === null ? (
          <>
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
          </>
        ) : (
          <Route path="/list" element={<List user={user} />} />
        )}
      </Route>
    </Routes>
  );
}

export default App;
