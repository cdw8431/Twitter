import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshop) => {
        const tweetArray = snapshop.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's happening?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="Tweet" />
        <div>
          {tweets.map((dbTweet) => (
            <div key={dbTweet.id}>
              <h4>{dbTweet.text}</h4>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Home;
