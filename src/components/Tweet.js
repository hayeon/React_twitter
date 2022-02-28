//트윗출력
//Home.js 컴포넌트의 map 함수가 반환하는 TweetObj 배열을 props로 받는 점만 다름
const Tweet = ({ TweetObj}) => {
    return (
        <div>
            <h4>
                {TweetObj.text}
            </h4>
        </div>
    );
};

export default Tweet;