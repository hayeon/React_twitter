//트윗출력
//Home.js 컴포넌트의 map 함수가 반환하는 TweetObj 배열을 props로 받는 점만 다름
const Tweet = ({ TweetObj}) => { //tweetObj는 tweet
    return (
        <div>
            <h4>
                {TweetObj.text}
            </h4>
            <button>트윗 삭제하기</button>
            <button>트윗 편집하기</button>
        </div>
    );
};

export default Tweet;