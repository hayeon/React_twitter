import Tweet from "components/Tweet";
import { dbService } from "fbase";
import { useEffect, useState } from "react";

const Home = ({userObj}) => {
 const [tweet, setTweet] = useState("");
//트윗 게시물을 목록으로 만들기
const [tweets, setTweets] = useState([]);

//실시간 트윗 읽어오기
//useEffect => 컴포넌트가 마운트된 이후, 문서를 처리해주는 함수
//useEffct(function, deps(배열));
useEffect(() => { //map 함수는 순회하며 만든 배열을 return 하여 1번만 setTweets 함수에 전달하여 효율적
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
//트윗 작성
const onChange = (event) => {
    event.preventDefault();
    const {
        target: {value},
    } = event;
    setTweet(value);
    };
    
    
    
    //onChange 속성, 함수
    const onFileChange = (event) => {
        const {
            target: {files} } = addEventListener;
    };
            
    //     event.preventDefault();
    //     const  { target : {files},}  = event;
    //     const fileInfo = files[0];
       
    //     //미리 보기 기능 구현
    //     //브라우저 API FileReader : new 키워드와 함께 사용해야함
    //     const reader = new FileReader();   
    //     reader.onloadend = (finishedEvent) => {
    //         console.log(finishedEvent);
    //     } ;
    //     //readAsDataURL: 파일 정보를 인자로 받아 파일 위치를 url로 반환
    //     //★이 함수는 리액트 생명주기 함수처럼 파일 선택 후, "웹 브라우저가 파일을 인식하는 시점/ 인식이 끝난 시점을 포함하여 관리해야함"   
    //     reader.readAsDataURL(fileInfo);
    // }; 

return (
    <>
    <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="트윗을 작성하세요."
        maxLength={240} />
    <input  type="file" onChange={onFileChange} accept="image/png, image/gif, image/jpeg, video/mp4, video/avi"></input>
    <input type={"submit"} value = "Tweet"/>
    </form>
    {/* 트윗보여줌 */}
    <div>
        {/* map(): 배열을 순회하는 함수  
        tweets.map(tweet)는 tweets에 있는 tweet에 Function을 실행하고, Function에서 나온 값을 저장해서 배열을 return
        tweets에 tweet을 추가함*/}
        {tweets.map((tweet) => (
            //Tweet 컴포넌트 추가 
            //key는 React가 어떤 항목을 변경할지 식별하는 것을 돕는다. key는 element에 안정적 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정
        
        <Tweet key={tweet.id} tweetObj= {tweet} 
        //작성자 ID===로그인 아이디
        isWriter = {tweet.creatorID === userObj.uid} />
        ))}
    </div>
    </>
);
};

export default Home;