import "./loginCard.css";
import { useState } from "react";
function LoginCard() {
  let onSumbit = (e) => {
    e.preventDefault();
    console.log("123");
  };
  let handleChange = (e) => {
    setloginName(e.target.value);
    console.log(loginName);
  };

  const [loginName, setloginName] = useState("");
  return (
    <div className="loginCard">
      <div className="loginCardContainer">
        <h1>Welcome to this chat room</h1>
        <div>
          <p>enter your name</p>
          <form onSubmit={onSumbit}>
            <input onChange={handleChange}></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
