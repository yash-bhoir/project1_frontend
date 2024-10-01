import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignIn: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
  
    try {
      const response = await fetch("http://localhost:5173/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const { user, accessToken, refreshToken } = data.data;
  
        console.log("User ID:", user.id);
        console.log("Username:", user.username);
        console.log("Email:", user.email);
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        console.log("Message:", data.message);
        console.log("Success:", data.success);
  
        setIsAuthenticated(true);
        Cookies.set("IsAuthenticated", "true", {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
          Cookies.set("authToken", accessToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
      } else {
        handleErrorResponse(response);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };
  
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/api/v1/auth/google";
  };
  
  const handleErrorResponse = async (response: Response) => {
    if (response.status === 401) {
      setError("Incorrect username or password. Please try again.");
    } else if (response.status >= 400 && response.status < 500) {
      const errorData = await response.json();
      setError(errorData.message || "Invalid request. Please check your input.");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign In
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              Email address or Username
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              autoComplete="identifier"
              required
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or Username"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign In with Google
            </button>
          </div>
          <div className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
