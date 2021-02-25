import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  return (
    <>
      <div>{tweetObj.text}</div>
      {isOwner && (
        <>
          <button>Delete Tweet</button>
          <button>Edit Tweet</button>
        </>
      )}
    </>
  );
};

export default Tweet;
