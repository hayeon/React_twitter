import { authService } from "fbase";


const Profie = () => {



//로그아웃
const onLogoutClick = () =>   
    authService.signOut();


return (
    <>
    <button onClick={onLogoutClick}> 로그아웃 헤헹</button>
    </>
);
};

export default Profie;