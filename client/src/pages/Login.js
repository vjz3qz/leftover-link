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
    const response = await fetch("/api/restaurants/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      setError("wrong credentials");
    }
  }

  const goToHome = () => {
    navigate("/");
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit">Login</button>
      <button
        type="button"
        onClick={goToHome}
        className={`
            rounded-2xl border-1 border-black
            bg-sunset_orange
            px-6 py-3
            font-semibold uppercase text-white
            hover:rounded-md
            hover:bg-another_sunset
            transition-all durtation-300
          `}
      >
        Back to Home
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
