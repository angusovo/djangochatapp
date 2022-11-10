import "./loginCard.css";
import { useState } from "react";
import { login } from "../ApiHelper";
import { Navigate } from "react-router-dom";
import { connect, client } from "../Socket";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function LoginCard() {
  const [loginName, setloginName] = useState("");
  const [password, setPassword] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  let onSumbit = async (e) => {
    if (loginName !== "") {
      e.preventDefault();
      const body = {
        uname: loginName,
        password: password,
      };
      let resp = await login(body);
      if (resp.status == 200) {
        setIsAuth(true);
      }
    }
  };
  let handleNameChange = (e) => {
    setloginName(e.target.value);
  };
  let handlePwChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen bg-[#242424]">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-[300px] w-auto"
            src="https://i.chzbgr.com/full/9195088128/hBCF70164/programmer-meme-white-debugging-t-monkeyusercom"
            alt="logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSumbit}>
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label className="sr-only">Email address</label>
              <input
                onChange={handleNameChange}
                name="email"
                type="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={handlePwChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        <div className="text-end text-white text-xl underline">
          <a href="/signup">New user? Signup</a>
        </div>
      </div>
      {isAuth && <Navigate to="/dashboard" replace={true} />}
    </div>
  );
}

export default LoginCard;
