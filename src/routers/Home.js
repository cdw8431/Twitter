import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
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
        return () => {};
      });
  }, []);

  return (
    <div>
      <TweetFactory userObj={userObj} />
      {tweets.map((dbTweet) => (
        <Tweet
          key={dbTweet.id}
          tweetObj={dbTweet}
          isOwner={dbTweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default Home;
