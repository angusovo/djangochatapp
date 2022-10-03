import "./loginCard.css";
import { useState } from "react";
function LoginCard() {
  let onSumbit = (e) => {
    if (loginName != "") {
      e.preventDefault();
      localStorage.setItem("uname", loginName);
      window.location.reload();
    } else {
      setInValid(true);
    }
  };
  let handleChange = (e) => {
    setloginName(e.target.value);
  };

  const [loginName, setloginName] = useState("");
  const [inValid, setInValid] = useState(false);
  return (
    <div className="loginCard">
      <div className="loginCardContainer">
        <h1>Welcome to this chat room</h1>
        <div>
          <p>enter your name</p>

          <input onChange={handleChange}></input>
          <div className="submitBtn" onClick={onSumbit}>
            <div className="button"> Enter</div>
          </div>
          {inValid && (
            <div style={{ color: "red" }}>Please enter valid name</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
