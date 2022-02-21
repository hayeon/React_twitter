//회원가입 /로그인 관련
import { authService,firebaseInstace } from 'fbase';
import React, { useState } from 'react';

const Auth = () => {
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
    //소셜로그인 구글/깃허브
    const onSocialClick = async (event) => {
        const {target : {name},} = event;
        let provider;
        if(name === "goggle") {
            provider = new firebaseInstace.auth.GoogleAuthProvider();
        }
        else if (name ==="github") {
            provider = new firebaseInstace.auth.GithubAuthProvider();
        }

        //소셜 로그인 팝업 signInWithPopup는 비동기 작업이기 때문에 aysnc-await문 사용
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} /> 
            <p>{error}</p>
        </form>
        {/* 토글버튼 */}
        <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
        </span>
        <div>
            <button onClick={onSocialClick} name = "goggle">
                Continue with Google</button>
            <button onClick={onSocialClick} name = "github">
                Continue with Github</button>
        </div>
    </div>
    );
}
export default Auth ;