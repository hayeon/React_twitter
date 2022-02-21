import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profie from "routes/Profile";
import Navigation from "./Navigation";


const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
          {/* isLoggedIn이 true인 경우, Navigation이 보임  and 연산자 && */}
           {isLoggedIn && <Navigation></Navigation>}
            <Switch>
               {isLoggedIn ? (
                   <>
                   <Route exact path="/">
                       <Home/>
                   </Route>
                   
                   <Route exact path = "/Profile">
                   <Profie/>
               </Route>
                   </>
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