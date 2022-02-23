import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = () => {
const [tweet, setTweet] = useState("");

//트윗 읽어오기
const getTweets = async() => {
    const dbTweets = await dbService.colletion("tweets").get();
    console.log(dbTweets);
};
//useEffect => 컴포넌트가 마운트된 이후, 문서를 처리해주는 함수
//useEffect(function, deps(배열));
useEffect(() => {
    getTweets();
}, []);
//getTweets을 밖에다 정의하고, useEffect 안에 넣는 이유 => useEffect는 async-await문을 사용한 함수를 인자로 사용할 시 따로 정의하고 사용해야함

const onSubmit = async (event) => {
    event.preventDefault();
    //promise 반환하여 async-await문 사용
    //tweets 컬렉션 생성하는 dbService
    //.add를 사용하여 해당 컬렉션에 문서 생성
    await dbService.collection("tweets").add({
        text: tweet,
        createdAT:Date.now(),
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
    <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?"
        maxLength={120} />
        <input type={"submit"} value = "Tweet"/>
    </form>
)
};

export default Home;