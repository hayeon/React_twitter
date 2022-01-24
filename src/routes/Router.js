//import { Router } from "express"
import { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
    const [isLoogedIn, setIsLoggedIn]= useState(true);
    return (
        <Router>
            <Switch>
               {isLoogedIn ? (
                   <Route exact path="/">
                       <Home/>
                   </Route>
               ) : (
                <Route exact path ="/">
                <Auth />
                </Route>

               )}
           </Switch>
        </Router>
    );
};

export default AppRouter;