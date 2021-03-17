import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  useEffect(() => {
    const getMyTweets = async () => {
      const tweets = await dbService
        .collection("tweets")
        .orderBy("createdAt", "desc")
        .where("creatorId", "==", userObj.uid)
        .get();
      console.log(tweets.docs.map((doc) => doc.data()));
    };
    getMyTweets();
  }, [userObj.uid]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (newDisplayName !== userObj.displayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="프로필 설정하기" />
      </form>
      <button onClick={onLogOutClick}>
        {userObj.displayName}님 계정에서 로그아웃
      </button>
    </>
  );
};

export default Profile;
