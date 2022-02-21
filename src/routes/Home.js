import { useState } from "react";

const Home = () => {
const [tweet, setTweet] = useState("");

const onSubmit = (event) => {
    event.preventDefault();
};

const onChange = (event) => {
    event.preventDefault();
    const {
        target: {value},
    } = event;
    setTweet(value);
    };
};



export default Home;