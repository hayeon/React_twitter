//트윗작성 콤포넌트, 실시간 트윗 가져옴
import Tweet from "components/Tweet";
import WriteTweet from "components/WriteTweet";
import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Profie from "./Profile";

const Home = ({userObj}) => {
//트윗 게시물을 목록으로 만들기
const [tweets, setTweets] = useState([]);

//실시간 트윗 가져오기 useEffect => 컴포넌트가 랜더링된 이후, 실행될 함수  useEffct(function, deps(배열 OR 빈 배열));
useEffect(() => { //map 함수는 순회하며 만든 배열을 return 하여 1번만 setTweets 함수에 전달하여 효율적
    dbService.collection("tweets")
   // .orderBy("createdAt", "desc") //최신순으로 정렬
    .onSnapshot((snapshot) =>{
        const newArray = snapshot.docs.map((document) => ({
            id: document.id, 
            ...document.data(),
        }));
        setTweets(newArray);
    });
}, []);

    return (
    <div className="container">
    {/* 트윗 작성 컴포넌트 노출 */}
    <WriteTweet userObj = {userObj}/>

     {/* 트윗보여줌 */}
        <div style={{marginTop : 30}}>
         {/* map(): 배열을 순회하는 함수  
            tweets.map(tweet)는 tweets에 있는 tweet에 Function을 실행하고, Function에서 나온 값을 저장해서 배열을 return하여
            tweets에 tweet을 추가함*/}
        
            {tweets.map((tweet) => 
            (
                
                //Tweet 컴포넌트 추가 //key는 React가 어떤 항목을 변경할지 식별하는 것을 돕는다. key는 element에 안정적 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정
            <Tweet key={tweet.id} tweetObj= {tweet}  //작성자 ID===로그인 아이디
            isWriter = {tweet.creatorID === userObj.uid} />
            
            
            
            
            ))}
            
        </div>
    </div>
    )
};

export default Home;