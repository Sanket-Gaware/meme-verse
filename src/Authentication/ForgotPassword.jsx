// import { useTheme, InputAdornment } from "@mui/material";
// import * as yup from "yup";
// import {
//   MuiBox,
//   MuiButton,
//   MuiCard,
//   MuiDivider,
//   MuiIconButton,
//   MuiTextField,
//   MuiTypography,
// } from "../../MUIComponents/Mui";
// import "../Css/DashboardAll.css";
// import { useFormik } from "formik";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const validationSchema = yup.object({
//   email: yup
//     .string("Enter your email")
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string("Enter your password")
//     .min(8, "Password should be of minimum 8 characters length")
//     .required("Password is required"),
//   confirmPassword: yup
//     .string()
//     .required("Confirm password is required")
//     .oneOf([yup.ref("password"), null], "Passwords must match"),
// });

// const ForgotPassword = () => {
//   const theme = useTheme();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: () => {},
//   });
//   return (
//     <div className="d-flex justify-content-center align-items-center">
//       <MuiCard
//         sx={{
//           py: 2,
//           my: 1,
//           borderRadius: "10px",
//           boxShadow: "none",
//           border: "1px solid white",
//         }}
//       >
//         <MuiBox
//           sx={{
//             [theme.breakpoints.down("sm")]: {
//               padding: "20px",
//               [theme.breakpoints.down("xs")]: {
//                 padding: "10px",
//               },
//             },
//           }}
//         >
//           <MuiTypography
//             className="d-flex justify-content-center align-items-center"
//             variant="h5"
//             sx={{ fontWeight: "bold", letterSpacing: "1px", mb: 0 }}
//           >
//             <img
//               style={{
//                 borderRadius: "50%",
//                 width: "7%",
//                 // "@media (max-width:400px)": { width: "50%" },
//               }}
//               src="/DashboardImages/Berry.png"
//             />
//             <span className="mx-1" />
//             VIEW Point
//           </MuiTypography>
//           <br />
//           <MuiTypography
//             className="d-flex justify-content-center align-items-center"
//             variant="h5"
//             sx={{
//               fontWeight: "bolder",
//               color: "#673Ab7",
//               fontFamily: "sans-serif",
//               letterSpacing: "-1px",
//             }}
//           >
//             Forgot Password?
//           </MuiTypography>
//           <br />
//           <MuiTypography
//             className="d-flex justify-content-center align-items-center"
//             sx={{
//               mb: 1,
//               color: "#677586",
//               fontFamily: "sans-serif",
//               mx: 5,
//               fontSize: "smaller",
//             }}
//           >
//             Enter your email address below and we'll send you
//             <br /> password reset OTP.
//           </MuiTypography>
//           <div className="d-flex justify-content-center align-items-center">
//             <MuiTextField
//               type="email"
//               label="Email Address / Username"
//               variant="filled"
//               id="email"
//               name="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.email && Boolean(formik.errors.email)}
//               helperText={formik.touched.email && formik.errors.email}
//               InputLabelProps={{
//                 sx: {
//                   fontSize: "0.75rem",
//                   "&.MuiInputLabel-shrink": {
//                     marginTop: "1rem", // Adjust margin when label is shrunk (focused or filled)
//                     paddingLeft: "0.25rem", // Adjust padding when label is shrunk
//                     fontSize: "0.95rem", // Ensure the font size remains small when shrunk
//                     transform: "translate(14px, -6px) scale(0.75)", // Adjust the transform to move the label correctly
//                   },
//                 },
//               }}
//               InputProps={{
//                 disableUnderline: true, // Disable underline to make it look like outlined variant
//                 sx: {
//                   fontWeight: "550",
//                   fontFamily: "inherit",
//                   backgroundColor: "white", // Input background color
//                   borderRadius: "10px", // Border radius
//                   border: "1px solid rgba(0, 0, 0, 0.23)", // Default border color
//                   paddingLeft: "0.3rem", // Padding inside the input
//                   "&:hover": {
//                     border: "1px solid rgba(0, 0, 0, 0.87)", // Border color on hover
//                   },
//                   "&.Mui-focused": {
//                     border: "2px solid rgb(33, 150, 243)", // Border color on focus
//                   },
//                 },
//               }}
//               sx={{
//                 mb: 2,
//                 width: "100%", // Make the text field take the full width of the container
//                 maxWidth: "400px", // Limit the maximum width
//                 "& .MuiFilledInput-root": {
//                   backgroundColor: "rgb(244 245 247)", // Set background color for the filled input
//                   borderRadius: "10px",
//                   "&:hover": {
//                     backgroundColor: "rgb(244 245 247)",
//                   },
//                 },
//                 "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
//                   {
//                     display: "none", // Hide the underline for both before and after states
//                   },
//               }}
//             />
//           </div>
//           <div className="d-flex justify-content-center align-items-center">
//             <MuiButton
//               className="signupButton"
//               variant="filled"
//               sx={{
//                 backgroundColor: "#673Ac7",
//                 width: "65%",
//                 color: "white",
//                 fontWeight: "bold",
//                 p: 1,
//                 mb: 2,
//                 "@media (max-width:500px)": { width: "100%" },
//               }}
//             >
//               Send Email
//             </MuiButton>
//           </div>
//           <MuiDivider
//             sx={{
//               mb: 2,
//               borderBottom: "1px solid",
//               width: "70%",
//               mx: "auto",
//             }}
//           />
//           <div className="d-flex justify-content-center align-items-center">
//             <MuiTextField
//               type={showPassword ? "text" : "password"}
//               label="Password"
//               variant="filled"
//               id="password"
//               name="password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.password && Boolean(formik.errors.password)}
//               helperText={formik.touched.password && formik.errors.password}
//               InputLabelProps={{
//                 sx: {
//                   fontSize: "0.95rem",
//                   "&.MuiInputLabel-shrink": {
//                     marginTop: "1rem", // Adjust margin when label is shrunk (focused or filled)
//                     paddingLeft: "0.25rem", // Adjust padding when label is shrunk
//                     fontSize: "0.95rem", // Ensure the font size remains small when shrunk
//                     transform: "translate(14px, -6px) scale(0.75)", // Adjust the transform to move the label correctly
//                   },
//                 },
//               }}
//               InputProps={{
//                 disableUnderline: true, // Disable underline to make it look like outlined variant
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <MuiIconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </MuiIconButton>
//                   </InputAdornment>
//                 ),
//                 sx: {
//                   fontWeight: "550",
//                   fontFamily: "inherit",
//                   backgroundColor: "white", // Input background color
//                   borderRadius: "10px", // Border radius
//                   border: "1px solid rgba(0, 0, 0, 0.23)", // Default border color
//                   paddingLeft: "0.3rem", // Padding inside the input
//                   "&:hover": {
//                     border: "1px solid rgba(0, 0, 0, 0.87)", // Border color on hover
//                   },
//                   "&.Mui-focused": {
//                     border: "2px solid rgb(33, 150, 243)", // Border color on focus
//                   },
//                 },
//               }}
//               sx={{
//                 width: "100%", // Make the text field take the full width of the container
//                 maxWidth: "400px", // Limit the maximum width
//                 "& .MuiFilledInput-root": {
//                   backgroundColor: "rgb(232, 240, 254)", // Set background color for the filled input
//                   borderRadius: "10px",
//                   mb: 2,
//                   "&:hover": {
//                     backgroundColor: "rgb(232, 240, 254)",
//                   },
//                 },
//                 "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
//                   {
//                     display: "none", // Hide the underline for both before and after states
//                   },
//               }}
//             />
//           </div>
//           <div className="d-flex justify-content-center align-items-center">
//             <MuiTextField
//               type={showPassword ? "text" : "password"}
//               label="Confirm Password"
//               variant="filled"
//               id="password1"
//               name="confirmPassword"
//               value={formik.values.confirmPassword}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 formik.touched.confirmPassword &&
//                 Boolean(formik.errors.confirmPassword)
//               }
//               helperText={
//                 formik.touched.confirmPassword && formik.errors.confirmPassword
//               }
//               InputLabelProps={{
//                 sx: {
//                   fontSize: "0.95rem",
//                   "&.MuiInputLabel-shrink": {
//                     marginTop: "1rem", // Adjust margin when label is shrunk (focused or filled)
//                     paddingLeft: "0.25rem", // Adjust padding when label is shrunk
//                     fontSize: "0.95rem", // Ensure the font size remains small when shrunk
//                     transform: "translate(14px, -6px) scale(0.75)", // Adjust the transform to move the label correctly
//                   },
//                 },
//               }}
//               InputProps={{
//                 disableUnderline: true, // Disable underline to make it look like outlined variant
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <MuiIconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </MuiIconButton>
//                   </InputAdornment>
//                 ),
//                 sx: {
//                   fontWeight: "550",
//                   fontFamily: "inherit",
//                   backgroundColor: "white", // Input background color
//                   borderRadius: "10px", // Border radius
//                   border: "1px solid rgba(0, 0, 0, 0.23)", // Default border color
//                   paddingLeft: "0.3rem", // Padding inside the input
//                   "&:hover": {
//                     border: "1px solid rgba(0, 0, 0, 0.87)", // Border color on hover
//                   },
//                   "&.Mui-focused": {
//                     border: "2px solid rgb(33, 150, 243)", // Border color on focus
//                   },
//                 },
//               }}
//               sx={{
//                 width: "100%", // Make the text field take the full width of the container
//                 maxWidth: "400px", // Limit the maximum width
//                 "& .MuiFilledInput-root": {
//                   backgroundColor: "rgb(232, 240, 254)", // Set background color for the filled input
//                   borderRadius: "10px",
//                   mb: 2,
//                   "&:hover": {
//                     backgroundColor: "rgb(232, 240, 254)",
//                   },
//                 },
//                 "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
//                   {
//                     display: "none", // Hide the underline for both before and after states
//                   },
//               }}
//             />
//           </div>
//           <div className="d-flex justify-content-center align-items-center">
//             <MuiButton
//               className="signupButton"
//               variant="filled"
//               sx={{
//                 backgroundColor: "#673Ac7",
//                 width: "65%",
//                 color: "white",
//                 fontWeight: "bold",
//                 p: 1,
//                 mb: 2,
//                 "@media (max-width:500px)": { width: "100%" },
//               }}
//             >
//               set password
//             </MuiButton>
//           </div>
//           <MuiDivider
//             sx={{
//               mb: 2,
//               borderBottom: "1px solid",
//               width: "70%",
//               mx: "auto",
//             }}
//           />
//           <MuiTypography
//             className="d-flex justify-content-center align-items-center text-decoration-none fw-bold"
//             sx={{
//               color: "#121226",
//               fontWeight: "normal",
//               "@media (max-width:430px)": { fontSize: "smaller" },
//             }}
//             as={Link}
//             to="/"
//           >
//             goto login page
//           </MuiTypography>
//         </MuiBox>
//       </MuiCard>
//     </div>
//   );
// };
// export default ForgotPassword;
