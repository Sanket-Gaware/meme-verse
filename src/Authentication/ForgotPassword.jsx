import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-center">
          <img
            src="/DashboardImages/Berry.png"
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
          <h2 className="text-xl font-bold ml-2">VIEW Point</h2>
        </div>

        <h3 className="text-center text-lg font-bold text-purple-600 mt-4">
          Forgot Password?
        </h3>
        <p className="text-center text-gray-600 text-sm mt-2">
          Enter your email address below and we'll send you a password reset
          OTP.
        </p>

        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Send Email
          </button>
        </form>

        <div className="border-t my-4"></div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-600"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition mt-4"
        >
          Set Password
        </button>

        <div className="text-center mt-4">
          <Link to="/" className="text-purple-600 font-bold hover:underline">
            Go to Login Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
