import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="error">{error}</div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          className="email"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          className="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          className="submit"
          value={newAccount ? "트위터 가입" : "로그인"}
          required
        />
        <div className="toggle_login">
          <button onClick={toggleAccount}>
            {newAccount
              ? "계정을 이미 보유하고 있나요? · 로그인"
              : "계정이 아직 없나요? · 트위터 가입"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
