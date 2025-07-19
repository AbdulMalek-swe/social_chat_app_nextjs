"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSignInMutation } from "../features/authApi";

const LoginPage = () => {
    let [signIn ,{ data, isError, error }] = useSignInMutation();
    console.log(error,isError);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // console.log("Login Data", values);
     signIn(values)
    setSubmitting(false);
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-gray-600">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back 👋
        </h2> 
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-semibold mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition cursor-pointer"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-blue-500 hover:underline">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
