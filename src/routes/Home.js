import { dbService } from "fbase";
import { useState } from "react";

const Home = () => {
const [tweet, setTweet] = useState("");

const onSubmit = async (event) => {
    event.preventDefault();
    ///await dbService.collection("nweets").add({ text: tweet createdAt : Date.now(),});
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