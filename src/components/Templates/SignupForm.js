import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const SignupForm = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (inputs.password !== inputs.repeatPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          email: inputs.email,
          password: inputs.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Store tokens
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      // Reset form
      setInputs({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      });

      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="Property">
      <Header />
      <div className="w-full mx-auto p-10 text-center">
        <h2 className="font-semibold">Sign Up For The Best Experience</h2>
      </div>
      <div className="py-20 px-10 text-center bg-zinc-800 my-10">
        <form onSubmit={handleSubmit}>
          <div className="flex text-left h-[400px] mb-10 justify-center align-middle text-xl">
            <div className="w-[400px]">
              <h2 className="font-thin pb-4 text-5xl">Sign up</h2>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div>
                <label>Username</label>
                <input
                  className="formInput"
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  value={inputs.username}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label>Email Address</label>
                <input
                  className="formInput"
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={inputs.email}
                  placeholder="email@email.com"
                  required
                />
              </div>

              <div>
                <label>Password</label>
                <input
                  className="formInput"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  value={inputs.password}
                  required
                />
              </div>

              <div>
                <label>Confirm Password</label>
                <input
                  className="formInput"
                  type="password"
                  name="repeatPassword"
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  value={inputs.repeatPassword}
                  required
                />
              </div>

              <div className="mx-auto text-center text-xl">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;
