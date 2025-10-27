import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { assets } from "../assets/assets";
import axiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";
import { validateEmail } from "../util/Validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter valid email");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter password");
      setIsLoading(false);
      return;
    }

    setError("");

    //Login Api call
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error("Somthing went wrong", error);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to login.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder={"email@example.com"}
              type={"text"}
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder={"*********"}
              type={"password"}
            />
            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              className={`w-full py-3 text-lg font-semibold rounded-lg 
             bg-indigo-700 hover:bg-blue-800 text-white 
             shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
               isLoading ? "opacity-60 cursor-not-allowed" : ""
             }`}
              type="submit"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Logging in...
                </>
              ) : (
                "LOGIN"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
