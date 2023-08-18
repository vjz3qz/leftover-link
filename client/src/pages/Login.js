import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const { setUserInfo } = useContext(UserContext);

  const navigate = useNavigate(); // call the useNavigate hook here

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch("/api/restaurants/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        alert("Login successful!");
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        response.json().then((errorData) => {
          setError(errorData.originalError || "wrong credentials");
        });
      }

    } catch (error) {
      console.error("Error during fetch:", error);
      setError("An error occurred while trying to connect to the server.");
    }
  }

  const goToHome = () => {
    navigate("/");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      id="login"
      className="p-8 dark:bg-gray-800 flex items-center justify-center min-h-screen"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center dark:text-white">
          Login
        </h1>
        <form className="space-y-4" onSubmit={login}>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 w-28"
                style={{ fontSize: "20px" }}
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter Username..."
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                required
                className="border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 p-2 my-3 dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 w-28"
                style={{ fontSize: "20px" }}
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password..."
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
                className="border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 p-2 my-3 dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
              />
            </div>
          </div>
          {error && (
            <div className="error text-center text-red-500 dark:text-red-400 mt-2">
              {error}
            </div>
          )}
          <div className="flex space-x-4 justify-center mt-4">
            <button
              type="submit"
              className={`
              rounded-2xl border-1 border-black 
              bg-sunset_orange px-6 py-3 mx-2
              font-semibold uppercase text-white
              hover:rounded-md hover:bg-another_sunset
              focus:ring-4 focus:outline-none focus:bg-another_sunset 
              dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 
              transition-all duration-300
            `}
            >
              Login
            </button>
            <button
              type="button"
              onClick={goToRegister}
              className={`
              rounded-2xl border-1 border-black 
  bg-sunset_orange px-6 py-3 mx-2
  font-semibold uppercase text-white
  hover:rounded-md hover:bg-another_sunset
  focus:ring-4 focus:outline-none focus:bg-another_sunset 
  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 
  transition-all duration-300
            `}
            >
              Register
            </button>
            <button
              type="button"
              onClick={goToHome}
              className={`
              rounded-2xl border-1 border-black 
  bg-sunset_orange px-6 py-3 mx-2
  font-semibold uppercase text-white
  hover:rounded-md hover:bg-another_sunset
  focus:ring-4 focus:outline-none focus:bg-another_sunset 
  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 
  transition-all duration-300
            `}
            >
              Home
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
