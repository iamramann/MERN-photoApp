/* eslint-disable no-unused-vars */
import Register from "./components/Signup/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/404/404";
import Profile from "./components/Profile/Profile";

import { Switch, Route } from "react-router-dom";
import UserMain from "./components/UserMain/UserMain";
import Home from "./components/Home/Home";
// import "./common/style.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path={["/", "/login"]}>
          <Login />
        </Route>
        <Route exact path="/userMain">
          <UserMain />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
