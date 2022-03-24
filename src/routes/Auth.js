//회원가입 /로그인 관련
import { authService,firebaseInstace } from 'fbase';
import React from 'react';

const Auth = () => {
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
            <button onClick={onSocialClick} name = "goggle">
                Continue with Google</button>
            <button onClick={onSocialClick} name = "github">
                Continue with Github</button>
        </div>
    );
}
export default Auth ;