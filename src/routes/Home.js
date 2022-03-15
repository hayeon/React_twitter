import Tweet from "components/Tweet";
import { dbService,storageService } from "fbase";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => {
 const [tweet, setTweet] = useState("");
//트윗 게시물을 목록으로 만들기
const [tweets, setTweets] = useState([]);
//콘텐츠 url 상태관리
const [contentURL, setcontentURL] = useState("");
//실시간 트윗 읽어오기
//useEffect => 컴포넌트가 랜더링된 이후, 실행될 함수
//useEffct(function, deps(배열 OR 빈 배열));
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
    let showURL = "";
    if(contentURL !=="") {
    //사진을 스토리지에 만드는 로직: 스토리지, 레퍼런스를 순서대로 호출한 다음, child 함수에 사용자 아이디를 폴더이름으로, 파일 이름을 uuidv4로 처리 파일 확장자의 경우 업로드 과정에서 자동 설정
       const contentURLRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
       const response = await contentURLRef.putString(contentURL, "data_url");
       //스토리지에서 트윗결과 화면에 출력하기  response.ref.getDownloadURL() 참고로 스냅샷 레퍼런스임 
      showURL = await response.ref.getDownloadURL(); 
    }; //만약 사진이 없다면, showURL = "";

    //트윗&사진 업로드 로직 사진 업로드 로직 다음에 위치
    //promise 반환하여 async-await문 사용/ tweets 컬렉션 생성하는 dbService/ .add를 사용하여 해당 컬렉션에 문서 생성
    await dbService.collection("tweets").add({
        text: tweet,
        createdAT:Date.now(),
        creatorID: userObj.uid,
        showURL, //위 로직에서 만든 showURL을 스토어 컬렉션에도 넣어줌
    }); 
    //db로 전송 후, setTweet으로 tweet을 빈 문자열로 초기화
    setTweet("");
   setcontentURL("");
};
//트윗 작성로직
const onChange = (event) => {
    event.preventDefault();
    const {
        target: {value},
    } = event;
    setTweet(value);
    };
    
    //onChange 속성함수, 선택 파일을 그대로 읽어옴
    const onFileChange = (event) => {
        const {
            target: {files} } = event;
        const fileInfo = files[0]; 
        //이미지 출력 기능 구현
        //브라우저 API FileReader : new 키워드와 함께 사용해야함
        const filereader = new FileReader();
        filereader.onloadend = (fileloadEvent) => {
          
           const {
               currentTarget : {result},
           } = fileloadEvent;
           
            setcontentURL(result);
            console.log(contentURL);
         };
        //readAsDataURL 파일정보를 URL로 반환 * img ="www.dsf.dsfsdc" 요거
        filereader.readAsDataURL(fileInfo);
    };
    //파일선택 취소 로직
    const onClearContent = () => setcontentURL ("");
            
return (
    <>
    <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="트윗을 작성하세요."
        maxLength={240} />
    <input  type="file" onChange={onFileChange} accept="image/*"></input>
    <input type={"submit"} value = "Tweet"/>
    {/*이미지 선택 /선택취소*/}
    { contentURL && (
    <div>
     <img src={contentURL} width="60px" height="60px"></img>     
     <button onClick={onClearContent}>선택 이미지 삭제</button>
     </div>
    )}
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