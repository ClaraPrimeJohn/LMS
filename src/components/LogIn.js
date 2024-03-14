import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // dito yung hayup na maghhandle ng roles pag naginput ka ng username at password (sakit sa ulo)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "user" && password === "1234") {
      handleLogin("user");
      navigate("/home-user");
    } else if (username === "admin" && password === "1234") {
      handleLogin("admin");
      navigate("/home-admin");
    } else if (username === "superadmin" && password === "1234") {
      handleLogin("super-admin");
      navigate("/home-super-admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-start min-h-screen bg-peach">
      <div className="flex items-center justify-center w-1/2 min-h-screen text-center bg-maroon text-white p-8 rounded-br-md rounded-tr-md shadow-lg">
        <h1 className="text-80xl font-bold">
          St. Clare College
          <p className="text-80xl"> of Caloocan</p>
          <p className="text-80xl text-peach"> Library Management System</p>
        </h1>
      </div>


      <div className="bg-peach flex items-center justify-center w-1/2">
        <div
          className="bg-white p-8 rounded-md shadow-lg w-80"
          style={{ height: "90vh", width: "75vh" }}
        >
          <div className="bg-white p-2 rounded-md">
            <h2 className="text-4xl font-bold mb-4 text-center mt-10">
              Sign in to your account
            </h2>

            <h2 className="text-base font-semibold mb-4 text-center text-blue">
              Welcome Back! Please enter your details.
            </h2>
          </div>

          <form className="space-y-10 p-6" onSubmit={handleSubmit}>
            {/* Username input */}
            <div className="relative">
              <label
                htmlFor="username"
                className="block text-base font-medium text-black mb-2 mt-10 ring-black"
              >
                Username:
              </label>

              <div className="flex items-center">
                <FaUser className="h-5 w-5 text-black absolute left-2" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 pl-8 p-4 w-full rounded-xl bg-gray shadow-sm ring-black"
                  placeholder="Student No./Email"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="relative mt-4">
              <label
                htmlFor="password"
                className="block text-base font-medium text-black mb-2 mt-10"
              >
                Password:
              </label>

              <div className="flex items-center">
                <FaLock className="h-5 w-5 text-black absolute left-2" />

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 pl-8 p-4 w-full rounded-xl bg-gray shadow-sm"
                  placeholder="Enter Password"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red text-sm text-center">{error}</div>
            )}

            {/* Login Button */}
            <div className="bg-maroon p-2 rounded-md mt-16">
              <button
                type="submit"
                className="w-full p-2 text-xl font-bold text-white rounded-md "
              >
                Log In
              </button>
            </div>

            {/* Don't have an account */}
            <div className="text-base text-black text-center mt-16">
              Don't have an account?
              <p className="text-base text-red hover:text-blue mt-2 cursor-default">
                Go to library
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;