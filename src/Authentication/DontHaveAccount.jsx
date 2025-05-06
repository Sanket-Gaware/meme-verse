import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postMeme, signup } from "../Store/memeSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { File } from "lucide-react";

const Signup = () => {
  const [profilePreview, setProfilePreview] = useState(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      profile: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      gender: Yup.string().required("Gender is required"),
      profile: Yup.mixed().required("Profile picture is required"),
    }),
    onSubmit: (values) => {
      Register(values);
    },
  });

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];

    if (file) setProfilePreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await dispatch(postMeme(formData)).unwrap(); //by using unwrap we can handle errors properly

      const imageUrl = res.data.data.url;
      // console.log(imageUrl);
      formik.setFieldValue("profile", imageUrl);
    } catch (error) {
      toast.error("Failed to upload profile." + error);
    }
  };
  const Register = async (values) => {
    const data = {
      profile: values.profile,
      fullname: values.firstName + " " + values.lastName,
      username: values.email,
      gender: values.gender,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    try {
      const response = await dispatch(signup(data)).unwrap();
      // console.log(response);
      if (response.status == 201) {
        toast.success("Account Created Successfully !");
      }
    } catch (res) {
      // console.log(error);
      toast.error("Account creation failed or user arleady exsist " + res);
    }
  };
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Banner Section */}
      <div
        className="hidden md:block bg-cover bg-center overflow-y-hidden"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/joyful-man-playing-with-frame_1149-24.jpg?t=st=1741766242~exp=1741769842~hmac=680578da713434dac23ea3a55654788bfed8445d9ebfd4cc3fa6b5f288bbe30e&w=1380')",
        }}
      ></div>

      {/* Signup Form */}
      <div className="flex flex-col px-6 py-12 md:px-12 lg:px-20 overflow-y-scroll">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-[#E1306C]">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/"
                className="font-medium text-purple-600 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Sanket"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-xs text-red-600">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Gaware"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-xs text-red-600">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-600">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-600">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-xs text-red-600">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-xs text-red-600">{formik.errors.gender}</p>
              )}
            </div>

            {/* Profile Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Profile Picture
              </label>
              <input
                type="file"
                name="profile"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E1306C] file:text-white hover:file:bg-purple-700"
              />
              {formik.touched.profile && formik.errors.profile && (
                <p className="text-xs text-red-600">{formik.errors.profile}</p>
              )}
              {profilePreview && (
                <img
                  src={profilePreview}
                  alt="Preview"
                  className="w-16 h-16 rounded-full mt-2"
                />
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-[#E1306C] px-4 py-2 text-white text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500">
            By signing up, you agree to our{" "}
            <a href="#" className="underline text-blue-600">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-blue-600">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
