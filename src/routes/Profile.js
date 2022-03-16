import { authService, dbService } from "fbase";
import React, { useEffect } from "react";

const Profie = ({userObj}) => {
//로그아웃
const onLogoutClick = () => {
    authService.signOut();
};

//내가 작성한 트윗만 모아보기
const getMyTweets = async () => { //where ("필드", "조건", "찾으려는 값") creatId 필드에서 uid와 값은 값을 찾아라
const tweets = 
// await dbService.collection("tweets").where("creatorId", "==", `${userObj.uid}`)
// .orderBy("createdAt", "asc") //오름차순 asc
// .get(); //쿼리값 가져옴
// console.log(tweets);
// };
// //useEffect => 컴포넌트가 랜더링된 이후, 실행 될 함수
// //useEffct(function, deps(배열 OR 빈 배열));
// useEffect( () => {getMyTweets()}, [userObj]);
await dbService
.collection("nweets")
.where("creatorId", "==", userObj.uid)
.orderBy("createdAt")
.get();
console.log(tweets.docs.map((doc) => doc.data()));
};
    
return (
    <>
    <button onClick={onLogoutClick}> 로그아웃 헤헹</button>
    </>
);
};

export default Profie;