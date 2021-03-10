import React from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import "styles/Auth.scss";
import logo from "styles/images/twitter_logo.png";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <div className="Auth-container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="title">
          <h1>트위터 로그인</h1>
        </div>
        <AuthForm />
        <div className="anotherLoginWay">
          <button name="google" onClick={onSocialClick}>
            Continue with Google
          </button>
          <button name="github" onClick={onSocialClick}>
            Continue with Github
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth;
