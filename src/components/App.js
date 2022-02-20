//상태관리
import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  //2초마다 authSerivce를 실행하여 콘솔로 찍힘 < () => = function >
  //setInterval(() => console.log(authService.currentUser), 2000);
  
    //fb 로그인 정보를 받게되었을 때(fb가 초기화될 때) 실행되는 useEffect(특정한 시점에 실행되게 함)
  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user); }
        else {
          setIsLoggedIn(false);
        }
        setInit(true);
      });
  }, []);
  return (
    <>
    {init ?  <AppRouter isLoggedIn = {isLoggedIn}/> : "initializing..." }
    <footer>
      {/* copyright */}
      &copy; 
      {/* 현재년도 반환 JS함수 */}
      {new Date().getFullYear()} 
      twitter
    </footer>
    </>
    
  );
}

export default App;
