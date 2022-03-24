import React, { useState } from "react";
import { authService } from "fbase";


const Profie = ({userObj, refreshUser}) => {
    const [newDisplayname, setNewDisplayName] = useState(userObj.displayName);
   
    const onChange = (event) => {
        const { target : {value} } = event;
       setNewDisplayName(value);
    };
    
    const onSubmit = async (event) => {
        event.preventDefault();
       if (userObj.displayName !== newDisplayname) {
          await userObj.updateProfile ( {displayName: newDisplayname});
          refreshUser();
       }
    
    };
     //로그아웃
     const onLogoutClick = () => {
        authService.signOut();
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
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newDisplayname} type="text" placeholder="닉네임을 입력하세요"  />
            <button onSubmit={onSubmit} type="submit">수정하기</button>
        </form>
        <button onClick={onLogoutClick}> 로그아웃 헤헹</button>
        </>
        );
    };

export default Profie;