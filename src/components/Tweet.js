import { dbService } from "fbase";
import React, { useState } from "react";

// //Home.js 컴포넌트의 map 함수가 반환하는 TweetObj 배열을 props로 받는 점만 다름
const Tweet = ({tweetObj, isWriter}) => {
    const [edit, setEdit] = useState(false); //수정클릭 시, 수정입력란과 버튼이 노출
    const [newTweet ,setNewTweet] = useState(tweetObj.text); // 입력란에 기존 트윗이 보이도록 초깃값 관리


    //트윗삭제버튼 이벤트
const onDeleteClick = async () => { 
    const ok = window.confirm("트윗을 삭제하시겠습니까?");//window.confirm은 확인 => true, 취소 => false 반환
    console.log(ok);
    if (ok) {  //확인 누른 게 true => 삭제
        console.log(tweetObj); 
       //템플릿 리터럴 `${}` tweets + tweetObj.id * `${ }` 의 결과는 문자열로 자동 변환됨.
         await dbService.doc(`tweets/${tweetObj.id}`).delete();  //doc(where) 괄호 안에는 firebase의 경로를 넣음
    }
};
//수정 취소이전상태관리: setEdit에 넘겨준 함수의 1번째 인자를 받은 후, 이전 상태를 뒤집어 적용 => 
const EditCancel = () => setEdit((prev) => !prev);
//트윗수정
const onChange = (event) => {
       const { target : {value} } = event;
       setNewTweet(value);
    };
    //트윗수정 db 연동
const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({text : newTweet});
    //토글 변경
    setEdit(false);
}

 return (
    <div>
        {edit ? (
            <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={newTweet} required></input>
                <button onSubmit={onSubmit} type="submit">수정하기</button>
                </form>
                <button onClick={EditCancel}>취소</button>
                </>

        ) : (
            <>

    <h4>{tweetObj.text}</h4> {/*트윗출력*/}
    {isWriter && ( //작성자일 경우에만 버튼 플래그먼트 노출
    <>
    <button onClick={onDeleteClick}>삭제하기</button>
    <button onClick={EditCancel}>수정하기</button>
    </>
)}
</>
        )}
    </div>
);
    };



export default Tweet;