import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      navigate("/main/home");
    }
  }, []);

  const login = (values) => {
    setErrorMessage("");
    axios
      .post("https://node-js-view-point.onrender.com/api/auth/login", {
        username: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login successful!");
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("RefreshToken", response.data.refresh);
          localStorage.setItem("username", values.email);
          localStorage.setItem("Email", values.Username);
          navigate("/main/home");
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message || "Login failed!");
          toast.error(error.response.data.message);
        } else {
          setErrorMessage("Login failed!");
          toast.error("Login failed!");
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "sanket01@gmail.com",
      password: "Sanket@12345",
    },
    validationSchema: validationSchema,
    onSubmit: login,
  });

  return (
    <div
      style={{
        background: `linear-gradient(
      301deg,
      hsl(251, 100%, 79%) 0%,
      hsl(266, 87%, 78%) 15%,
      hsl(281, 74%, 76%) 22%,
      hsl(296, 63%, 75%) 28%,
      hsl(311, 71%, 76%) 33%,
      hsl(321, 86%, 79%) 37%,
      hsl(330, 100%, 81%) 42%,
      hsl(336, 100%, 82%) 46%,
      hsl(343, 100%, 83%) 50%,
      hsl(349, 100%, 85%) 54%,
      hsl(357, 100%, 86%) 58%,
      hsl(4, 100%, 86%) 63%,
      hsl(10, 100%, 86%) 67%,
      hsl(15, 100%, 87%) 72%,
      hsl(19, 100%, 87%) 78%,
      hsl(23, 100%, 88%) 85%,
      hsl(26, 100%, 89%) 100%
    )`,
      }}
      className="flex justify-center items-center min-h-screen p-4 bg-li"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center items-center mb-4">
          <img
            src="/logo.png"
            alt="logo"
            className="w-12 h-12 rounded-full mr-2"
          />
          <h2 className="text-xl font-bold text-[#E1306C] tracking-wide">
            Meme Verse
          </h2>
        </div>

        <h3 className="text-center text-purple-700 text-xl font-semibold">
          Welcome
        </h3>
        <p className="text-center text-gray-500 mb-4">
          Enter your credentials to continue
        </p>

        {errorMessage && (
          <p className="text-center text-red-600 font-medium mb-4">
            {errorMessage}
          </p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address / Username
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 rounded-md bg-gray-100 border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-2 rounded-md bg-blue-50 border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-600"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Keep me logged in</span>
            </label>
            <Link
              to="/forgotpassword"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#e1307a] text-white font-semibold py-2 rounded-md hover:bg-purple-800 transition"
          >
            Login
          </button>

          <div className="border-t border-gray-200 my-4"></div>

          <p className="text-center text-sm text-gray-700">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-purple-700 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
