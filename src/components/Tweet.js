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