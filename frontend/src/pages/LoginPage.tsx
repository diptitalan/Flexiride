import React, { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../components/auth-component/authLayout-component/AuthLayout";
import Heading from "../components/Heading-component/Heading";
import InputField from "../components/auth-component/inputfield-component/InputField";
import AuthButton from "../components/auth-component/authButton-component/AuthButton";
import SuccessToast from "../components/toast-components/SuccessToast";
import Loader from "../components/auth-component/Loader";
import { validateAuthForm } from "../utils/validateAuthForm";
import { setUserInfo } from "../store/slices/userSlice";

const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const [showToast, setShowToast] = useState<boolean>(!!location.state?.showToast);
  const [toastMessage, setToastMessage] = useState<string>(
    location.state?.toastMessage || "Login successful!"
  );
  const [toastSubMessage, setToastSubMessage] = useState<string>(
    location.state?.toastSubMessage || "Welcome back!"
  );

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    const formData = new FormData(e.currentTarget);

    const email = (formData.get("email") as string).toLowerCase();
    const data = {
      email,
      password: formData.get("password") as string,
    };

    const { isValid, errors } = validateAuthForm(data);
    if (!isValid) {
      setErrors(errors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await axios.post(
        "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/auth/sign-in",
        data
      );

      const userData = response.data.data;
      userData.email = email;
      console.log("User Data:", userData); // Optional: helpful for debugging

      dispatch(setUserInfo(userData));

      // Admin redirection logic (based on email)
      const isAdmin = userData.role === "Admin";
      const redirectPath = isAdmin ? "/admin" : "/";

      setShowToast(true);
      setToastMessage("Login successful!");
      setToastSubMessage("Welcome back!");

      setTimeout(() => {
        navigate(redirectPath);
      }, 2000);
    } catch (error: any) {
      setServerError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {showToast && (
        <SuccessToast
          message={toastMessage}
          subMessage={toastSubMessage}
          isOpen={showToast}
          onClose={() => setShowToast(false)}
          autoClose={true}
          autoCloseTime={2000}
        />
      )}

      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="flex flex-col items-center justify-center min-h-screen px-4 space-y-6"
      >
        <div className="mb-4 text-center">
          <Heading title="Log in" level="h1" />
        </div>
        <p className="text-lg text-[#666] mb-8 text-center">Glad to see you again</p>

        <div className="w-[448px] max-w-[500px] text-left mb-4">
          <InputField
            label="Email"
            name="email"
            type="text"
            placeholder="Write your email"
            error={errors.email}
            className="w-full"
            autoComplete="off"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <div className="mb-2">
            <label className="block text-sm text-[#444] mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Write your password"
                className={`w-[448px] h-[42px] px-3 text-sm border rounded-md bg-transparent focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300 focus:border-[#d32f2f]"
                } pr-10`}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
            {errors.password ? (
              <p className="text-red-500 text-sm">{errors.password}</p>
            ) : (
              <small className="text-[12px] text-[#777] block">
                Minimum 8 characters with at least one capital letter and one digit
              </small>
            )}
          </div>

          {serverError && <p className="text-red-500 text-[12px]">{serverError}</p>}
        </div>

        {loading && <Loader />}

        <div className="mt-2 w-full max-w-[500px]">
          <AuthButton label="Login" type="submit" className="w-full" />
        </div>

        <p className="mt-6 text-lg text-[#999] text-center">
          New here?{" "}
          <span className="text-black font-semibold cursor-pointer">
            <Link to="/register">Create an account</Link>
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
