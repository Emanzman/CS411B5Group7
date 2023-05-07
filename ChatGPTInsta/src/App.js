import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";
 
/*
//deprecated code

function App() {
  return (
    <Router>
     <UserProvider>
    <Routes>
        <Route exact path="/" Component={Login} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        <Route element={<PrivateRoute />}>
           <Route exact path="/home" element={<Home />} />
         </Route>
      </Routes>
      </UserProvider>
    </Router>
  );
}
*/

function App() {
  return (
    <Router>
     <UserProvider>
    <Routes>
        <Route exact path="/" Component={Login} />
        <Route element={<PrivateRoute />}>
           <Route exact path="/home" element={<Home />} />
         </Route>
      </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;