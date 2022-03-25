//회원가입 /로그인 관련
import { authService } from 'fbase';
import React, { useState } from 'react';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true); // 1.Account를 가지고 있는지 확인
   
   //2.newAccount 가 필요한 경우 true 
   const [error, setError] = useState(""); //error처리함수
   const onChange = (event) => {
       const {target: {name, value}} = event;
       if(name === "email") {
           setEmail(value)
       } else if (name === "password") {
           setPassword(value)
       }
   }
   
   const onSubmit = async (event) => { // createUserWithEmailAndPassword는 
     //promise를 return 하기 때문에 async로 비동기화 시킴
       event.preventDefault();
       try {
           let data;
           if (newAccount) {
             data = await authService.createUserWithEmailAndPassword(
               email,
               password
             );
           } else {
             data = await authService.signInWithEmailAndPassword(email, password);
            }
           console.log(data);
       } catch(error) {
           setError(error.message);
       }
   };
   //setNewAccount 함수에 newAccount의 이전값 가져옴 (prev) =>prev의 반대값 리턴
   const toggleAccount = () => setNewAccount((prev) => !prev);

return(

<div>
<form onSubmit={onSubmit} className = "containter">
    <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} className="authInput"/>
    <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput"/>
    <input type="submit" value={newAccount ? "Create Account" : "Log In"}  className="authInput authSubmit" /> 
    <p>{error && <span className="authError">{error}</span>}</p>
 </form>

{/* 토글버튼 */}
<span onClick={toggleAccount} className="authSwitch">
{newAccount ? "로그인하기" : "계정 만들기"}
</span>
</div>
)
};
export default AuthForm;