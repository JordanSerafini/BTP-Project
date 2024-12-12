import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";

import PrivateRoute from "./middleware/PrivateRoute";
import Home from "./pages/home/Home";
//import Page404 from "./pages/404/404";


function App() {

  

  return (

      <Router>
        <div className="relative w-screen h-screen">
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            {/*<Route path="*" element={<Page404 />} />*/}
          </Routes>
        </div>
      </Router>

  );
}

export default App;