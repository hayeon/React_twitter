import { authService, dbService } from "fbase";
import React, { useState, useEffect } from "react";


const Profie = ({userObj}) => {
    const [newDisplayname, setNewDisplayName] = useState(userObj.displayName);
    console.log(userObj);
    //로그아웃
    const onLogoutClick = () => {
        authService.signOut();
    };
    const onChange = (event) => {
        const { target : {value} } = event;
        setNewDisplayName(value);
    };


    const onSumbit = async (event) => {
        event.preventDefault();
       if (userObj.displayName !== newDisplayname) {
           await 
       }
    };
// //내가 작성한 트윗만 모아보기
// const getMyTweets = async () => { //where ("필드", "조건", "찾으려는 값") creatId 필드에서 uid와 값은 값을 찾아라
// const tweets = await dbService.collection("tweets").where("creatorId", "==", `${userObj.uid}`)
// .orderBy("createdAt", "asc") //오름차순 asc
// .get(); //쿼리값 가져옴
// console.log(tweets.docs.map((doc) => doc.data() )); //비어있는 로그가 출력되는데 왤까...
// };

// //useEffect => 컴포넌트가 랜더링된 이후, 실행 될 함수
// //useEffct(function, deps(배열 OR 빈 배열));
// useEffect( () => {getMyTweets()}, [userObj]);
    
    return (
        <>
        <form onSumbit = {onSumbit}>
            <input onChange={onChange} type="text" placeholder="닉네임을 입력하세요" value={userObj.displayName}/>
            <input type="submit" value="수정하기"/>
        </form>
        <button onClick={onLogoutClick}> 로그아웃 헤헹</button>
        </>
        );
    };

export default Profie;