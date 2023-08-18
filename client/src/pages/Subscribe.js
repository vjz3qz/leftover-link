import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  

  async function subscribe(ev) {
    ev.preventDefault();
    try {
        // add endpoint to register shelter
      const response = await fetch("/api/shelters/subscribe", {
        method: "POST",
        body: JSON.stringify({ name, address, email }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Subscription successful!");
        setRedirect(true);
      } else {
        response.json().then((errorData) => {
          setError(errorData.originalError || "subscription failed");
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

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      id="subscribe"
      className="p-8 dark:bg-gray-800 flex items-center justify-center min-h-screen"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center dark:text-white">
            Subscribe
        </h1>
        <p className="text-md lg:text-lg lg:w-full leading-relaxed text-center mb-8 dark:text-gray-300"
        >
            Get food alerts near you!
        </p>
        <form className="space-y-4" onSubmit={subscribe}>
          <div className="flex flex-col items-center space-y-4">
            {[
              [name, "Name", setName],
              [address, "Address", setAddress],
              [email, "Email", setEmail],
            ].map(([value, uppercase, setFunction]) => {
              return (
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor={value}
                    className="text-sm font-medium text-gray-700 w-28"
                    style={{ fontSize: "20px" }}
                  >
                    {uppercase}:
                  </label>
                  <input
                    type={uppercase === "Password" ? "password" : "text"}
                    id={value}
                    placeholder={"Enter " + uppercase + "..."}
                    value={value}
                    onChange={(ev) => {
                      setFunction(ev.target.value);
                    }}
                    required
                    className="border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 p-2 my-3 dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  />
                </div>
              );
            })}
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
              Subscribe
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
