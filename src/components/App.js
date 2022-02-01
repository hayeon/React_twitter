//상태관리
import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
 
  return (
    <>
  <AppRouter isLoggedIn = {isLoggedIn}/>
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
