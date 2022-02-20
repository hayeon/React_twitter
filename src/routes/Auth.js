import { authService } from 'fbase';
import React, { useState } from 'react';
//import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true); // 1.Account를 가지고 있는지 확인
    //2.newAccount 가 필요한 경우 true 
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
            console.log(error);
        }
    };
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} /> 
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>
    );
}
export default Auth ;