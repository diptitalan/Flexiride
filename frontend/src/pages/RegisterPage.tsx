import React, { FormEvent, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AuthLayout from "../components/auth-component/authLayout-component/AuthLayout";
import Heading from "../components/Heading-component/Heading";
import InputField from "../components/auth-component/inputfield-component/InputField";
import AuthButton from "../components/auth-component/authButton-component/AuthButton";
import { validateAuthForm } from "../utils/validateAuthForm";
import axios from "axios";
import Loader from "../components/auth-component/Loader";
import SuccessToast from "../components/toast-components/SuccessToast";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [serverError, setServerError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("Congratulations!");
  const [toastSubMessage, setToastSubMessage] = useState<string>(
    "You have successfully created your account!"
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name === "name" ? "firstName" : name === "surname" ? "lastName" : name]:
        value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    const { isValid, errors } = validateAuthForm({
      name: userData.firstName,
      surname: userData.lastName,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    });

    setErrors(errors);
    if (!isValid) return;

    setLoading(true);

    const lowerCasedEmail = userData.email.toLowerCase();

    try {
      await axios.post(
        "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/auth/sign-up",
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: lowerCasedEmail,
          password: userData.password,
        }
      );

      setTimeout(() => {
        navigate("/login", {
          state: {
            showToast: true,
            toastMessage: "Account created successfully!",
            toastSubMessage: "You can now log in.",
          },
        });
      }, 1000);
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.response) {
        setServerError(error.response.data.message || "Something went wrong.");
      } else if (error.request) {
        setServerError("No response from server. Check network or CORS.");
      } else {
        setServerError("Request error: " + error.message);
      }
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

      <div className="mb-2">
        <Heading title="Create an account" level="h1" className="text-xl" />
      </div>
      <p className="text-sm text-[#555] mb-6">
        Enter your details below to get started
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div>
            <InputField
              label="Name"
              name="name"
              type="text"
              value={userData.firstName}
              onChange={handleChange}
              placeholder="Write your name"
              error={errors.name}
              className="text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
          <div>
            <InputField
              label="Surname"
              name="surname"
              type="text"
              value={userData.lastName}
              onChange={handleChange}
              placeholder="Write your surname"
              error={errors.surname}
              className="text-sm"
            />
            {errors.surname && (
              <p className="text-red-500 text-xs">{errors.surname}</p>
            )}
          </div>
        </div>

        <InputField
          label="Email"
          name="email"
          type="text"
          value={userData.email}
          onChange={handleChange}
          placeholder="Write your email"
          error={errors.email}
          className="text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <InputField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Create password"
          error={errors.password}
          className="text-sm"
        />
        {errors.password ? (
          <p className="text-red-500 text-xs">{errors.password}</p>
        ) : (
          <small className="text-[10px] text-[#777] block">
            Minimum 8 characters with at least one capital letter and one digit
          </small>
        )}

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={userData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          error={errors.confirmPassword}
          className="text-sm"
        />
        {errors.confirmPassword ? (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        ) : (
          serverError && <p className="text-red-500 text-xs">{serverError}</p>
        )}

        {loading && (
          <div className="flex justify-center mb-2">
            <Loader />
          </div>
        )}

        <div className="flex gap-5 mt-6">
          <button
            type="button"
            className="w-[216px] h-[46px] py-1.5 border border-black text-black rounded-full text-[14px] font-semibold hover:cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Cancel
          </button>
          <AuthButton label="Register" type="submit" loading={loading} />
        </div>
      </form>

      <p className="text-center text-sm text-[#000] mt-4">
        Already here?{" "}
        <span className="text-black font-semibold cursor-pointer">
          <Link to="/login">Log in</Link>
        </span>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
