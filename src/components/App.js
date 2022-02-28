//useState 상태관리
import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App () {
  // 초기화 상태
  const [init, setInit] = useState(false);
  //로그인여부
  const [isLoggedIn, setIsLoggedIn] = useState(false); //초기값 false
 //로그인자의 정보 관리
  const [userObj, setUserObj] = useState(null);
  //2초마다 authSerivce를 실행하여 콘솔로 찍힘 < () => = function >
  //setInterval(() => console.log(authService.currentUser), 2000);
  
    //fb 로그인 정보를 받게되었을 때(fb가 초기화될 때) 실행되는 useEffect(특정한 시점에 실행되게 함)
  useEffect( () => { //인증관련 상태가 바뀌는 것을 감지하는 함수
    authService.onAuthStateChanged((user) => {
      if (user) { //user 값이 있는 경우, isLoggedIn을 user로 설정
        setIsLoggedIn(user);
        setUserObj(user);
       }
        else { 
          setIsLoggedIn(false);    
        }
        setInit(true);
      });
  }, []);
  //삼항 연산자로 init 상태 검사
  return (
    <> 
    {/* init이 참: 라우터isLoggedIn / userObj,  거짓: 초기화중 출력  */}
    {init ? ( <AppRouter isLoggedIn = {isLoggedIn} userObj={userObj}/> 
    ):( "initializing..."  ) }

    <footer>
      {/* copyright */}
      &copy; 
      {/* 현재년도 반환 JS함수 */} 
      {new Date().getFullYear()} twitter  </footer>
    </>
  );
}

export default App;
