import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = ({userObj}) => {
 const [tweet, setTweet] = useState("");
//트윗 게시물을 목록으로 만들기
const [tweets, setTweets] = useState([]);

//실시간 트윗 읽어오기
//useEffect => 컴포넌트가 마운트된 이후, 문서를 처리해주는 함수
//useEffct(function, deps(배열));
useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) =>{
        const newArray = snapshot.docs.map((document) => ({
            id: document.id, 
            ...document.data(),
        }));
        setTweets(newArray);
    });
}, []);
//useEffect는 async-await문을 사용한 함수를 인자로 사용할 시 따로 정의하고 사용해야함

const onSubmit = async (event) => {
    event.preventDefault();
    //promise 반환하여 async-await문 사용
    //tweets 컬렉션 생성하는 dbService
    //.add를 사용하여 해당 컬렉션에 문서 생성
    await dbService.collection("tweets").add({
        text: tweet,
        createdAT:Date.now(),
        creatorID: userObj.uid,
    }); 
    //db로 전송 후, setTweet으로 tweet을 빈 문자열로 초기화
    setTweet("");
    
};

const onChange = (event) => {
    event.preventDefault();
    const {
        target: {value},
    } = event;
    setTweet(value);
    };


return (
    <>
    <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?"
        maxLength={120} />
        <input type={"submit"} value = "Tweet"/>
    </form>
    
    {/* 트윗보여줌 */}
    <div>
        {/* map(): 배열을 순회하는 함수  
        tweets.map(tweet)는 tweets에 있는 tweet에 Function을 실행하고, Function에서 나온 값을 저장해서 배열을 return
        tweets에 tweet을 추가함*/}
        {tweets.map((tweet) => (
            <div key={tweet.id}>
                <h4>{tweet.text}</h4>
            </div>
        ))}
    </div>
    </>
);
};

export default Home;