import { HashRouter as Router,  Redirect,  Route, Switch } from "react-router-dom"
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profie from "routes/Profile";
import Navigation from "./Navigation";
import Tweet from "./Tweet";


const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
          {/* isLoggedIn이 true인 경우, Navigation이 보임  and 연산자 && */}
           {isLoggedIn && <Navigation userObj={userObj}></Navigation>}
            <Switch>
                <>
               {isLoggedIn ? (
                   <div
                       style= {
                           {
                               maxWidth: 890,
                               width : "100%",
                               margin : "0 auto",
                               marginTop : 80,
                               display: "flex",
                               justifyContent: "center",
                           }
                       } >
                   <Route exact path="/">
                       <Home userObj ={userObj}/>
                   </Route>
                   <Route exact path = "/Profile">
                   <Profie refreshUser= {refreshUser}  userObj = {userObj}/>
               </Route>
              
               
               </div>
               ) : (
                <Route exact path ="/">
                <Auth />
                </Route>
                )}
                {/* /에 있지 않을 경우 /로 돌아가라  => /Profile로 이동(로그아웃) 됐을 때 돌아가라*/}
                <Redirect from="*" to ="/" />
                </>
           </Switch>
        </Router>
    );
};

export default AppRouter;