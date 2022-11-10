import React, { useContext } from "react";
import { useState } from "react";
import { createUser } from "../ApiHelper";
import { Navigate } from "react-router-dom";

import { UserContext } from "../context/Context";
const SignupCard = () => {
  const [loginName, setloginName] = useState("");
  const [password, setPassword] = useState(null);
  const [dname, setDname] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const { globalUser, setGlobalUser } = useContext(UserContext);
  let handleNameChange = (e) => {
    setloginName(e.target.value);
  };
  let handleDisplayNameChange = (e) => {
    setDname(e.target.value);
  };
  let handlePwChange = (e) => {
    setPassword(e.target.value);
  };
  let fileChange = (e) => {
    setFile(e.target.files[0]);
  };
  let handleSubmit = async (e) => {
    console.log("submit");
    const formData = new FormData();

    formData.append("file", file);
    formData.append("usernmae", loginName);
    formData.append("dname", dname);
    formData.append("password", password);
    e.preventDefault();
    let resp = await createUser(formData);
    if (resp) {
      setUser(resp);
    }
  };

  return (
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen bg-[#242424]">
      <div class="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label className=" text-white">Email address</label>
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
              <label className=" text-white">Display Name</label>
              <input
                onChange={handleDisplayNameChange}
                name="dname"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Display Name"
              />
            </div>
            <div>
              <label className="text-white">Password</label>
              <input
                id="password"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={handlePwChange}
              />
            </div>
            <div>
              <div className="text-white">Personal Image</div>
              <div>
                {file == null ? null : (
                  <h2 className="text-white">{file.name}</h2>
                )}
              </div>
              <input type="file" className="relative" onChange={fileChange} />
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
              Sign Up
            </button>
            {user && <Navigate to="/dashboard" replace={true} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupCard;
