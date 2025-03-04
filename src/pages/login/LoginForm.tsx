import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import images from "../../assets/images";
import { useMutation } from "@tanstack/react-query";
import { loginUser, loginDataResponse } from "../../../util/mutations/authMutations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const userCookie = Cookies.get('user');
  if (userCookie) {
    navigate("/dashboard");
  }
  const { login } = useContext(AuthContext);

  const { mutate: loginMutation, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data?.data) {
        toast.error("Login failed. No data received.");
        return;
      }
      const { user, token } = data.data;
      login({
        user,
        token,
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(
        error?.response?.data?.message || error.message || "Login failed."
      );
    },
  });

  const formik = useFormik<LoginData>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
    }),
    onSubmit: (values) => {
      loginMutation(values);
    },
  });

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-12 bg-white min-h-screen rounded-lg shadow-lg overflow-hidden w-full">
        <div
          className="hidden md:block bg-cover bg-center md:col-span-8"
          style={{ backgroundImage: `url('${images.loginBg}')` }}
        ></div>
        <div className="w-full flex flex-col md:col-span-4">
          <div className="border-b border-gray-400 p-4 flex justify-end">
            <img src={images.logobg} alt="tipster" className="w-32" />
          </div>
          <div className="p-8 flex-[1] flex items-center justify-center flex-col">
            <div className="w-[100%] flex items-center justify-center flex-col shadow-md shadow-gray-400 px-8 py-4 rounded-md">
              <h2 className="text-2xl font-bold text-center">Admin Login</h2>
              <form onSubmit={formik.handleSubmit} className="mt-6 w-[90%] space-y-4">
                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
                  disabled={isPending}
                >
                  {isPending ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
