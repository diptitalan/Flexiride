import React, { useState, useEffect } from "react";
import InputField from "../auth-component/inputfield-component/InputField";
// import ProfilePic from "../../assets/images/profile-pic.png";
import Loader from "../auth-component/Loader";
import SaveProfileInfoBtn from "./SaveProfileInfoBtn";
import axios from "axios";

const PersonalInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const id = userInfo?.userId;

  const s3ProfileImageUrl = `https://s3.ap-northeast-3.amazonaws.com/run8.2-team10-assests-bucket/users/${id}/${id}_profile.png`;

  const [formDataState, setFormData] = useState({
    // firstName: "Anastasiya",
    // lastName: "Dobrota",
    // phone: "+380 11 111 11 11",
    // country: "Ukraine",
    // city: "Kyiv",
    // postalCode: "04210",
    // street: "Velyka Vasylkivska",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    street: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  // const [userImageUrl, setUserImageUrl] = useState(""); //fetch profile pic of user

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const url = `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/users/${id}/personal-info`;
        const response = await axios.get(url);
        const data = response.data.data; //fixed
        console.log("Fetched data:", response.data); //debug

        setEmail(data.email || ""); // fetch & display email
        // setUserImageUrl(data.userImageUrl || "");

        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phoneNumber || "",
          country: data.country || "",
          city: data.city || "",
          postalCode: data.postalCode || "",
          street: data.street || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrors({ ...errors, server: "Failed to load user data." });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const url = `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/users/${id}/personal-info`;

      const formData = new FormData();
      formData.append("firstName", formDataState.firstName);
      formData.append("lastName", formDataState.lastName);
      formData.append("country", formDataState.country);
      formData.append("phoneNumber", formDataState.phone);
      formData.append("postalCode", formDataState.postalCode);
      formData.append("street", formDataState.street);
      formData.append("city", formDataState.city);
      // Optional: append avatar if you're handling image uploads
      // formData.append("avatar", selectedFile);

      // const response = await axios.put(url, formData, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const response = await axios.put(url, formData);
      const response = await axios.put(url, {
        firstName: formDataState.firstName,
        lastName: formDataState.lastName,
        country: formDataState.country,
        phoneNumber: formDataState.phone,
        postalCode: formDataState.postalCode,
        street: formDataState.street,
        city: formDataState.city,
      });

      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ ...errors, server: "Failed to update profile." });
    } finally {
      setIsLoading(false);
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="w-full overflow-visible">
        {/* Personal info section heading */}
        <h1 className="text-3xl font-semibold mb-6">Personal Info</h1>

        {/* Profile pic change container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-4 border-black mb-6">
          <div className="flex items-center md:items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                // src={ProfilePic}
                // src={userImageUrl?`https://s3.ap-northeast-3.amazonaws.com/run8.2-team10-assests-bucket/users/680e1e3bda99c8a3ee8098dd/680e1e3bda99c8a3ee8098dd_profile.png`:{ProfilePic}}
                src={s3ProfileImageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-3">
              <p className="text-lg">
                {formDataState.firstName} {formDataState.lastName}
              </p>
              <p className="text-xs text-[#666666]">{email}</p>{" "}
              {/*add email fetching */}
              <div className="block md:hidden mt-1">
                <a className="hover:underline text-sm" href="">
                  Change
                </a>
              </div>
            </div>
          </div>

          <div className="hidden md:block self-start">
            <a className="hover:underline text-sm" href="">
              Change
            </a>
          </div>
        </div>

        {/* Edit personal info container */}
        <h2 className="text-xl font-medium my-2">Personal Info</h2>
        <div className="border rounded-lg p-4 border-black mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <InputField
                label="Name"
                name="firstName"
                type="text"
                value={formDataState.firstName}
                onChange={handleChange}
                placeholder="Enter your name"
                error={errors.firstName}
                labelClassName="text-xs"
              />
            </div>
            <div className="w-full md:w-1/2">
              <InputField
                label="Surname"
                name="lastName"
                type="text"
                value={formDataState.lastName}
                onChange={handleChange}
                placeholder="Enter your surname"
                error={errors.lastName}
                labelClassName="text-xs"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formDataState.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              error={errors.phone}
              labelClassName="text-xs"
            />
          </div>
        </div>

        {/* Edit address container */}
        <h2 className="text-xl font-medium my-2">Address</h2>
        <div className="border rounded-lg p-4 border-black mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <InputField
                label="Country"
                name="country"
                type="text"
                value={formDataState.country}
                onChange={handleChange}
                placeholder="Enter your country"
                error={errors.country}
                labelClassName="text-xs"
              />
            </div>
            <div className="w-full md:w-1/2">
              <InputField
                label="City"
                name="city"
                type="text"
                value={formDataState.city}
                onChange={handleChange}
                placeholder="Enter your city"
                error={errors.city}
                labelClassName="text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <InputField
                label="Postal Code"
                name="postalCode"
                type="text"
                value={formDataState.postalCode}
                onChange={handleChange}
                placeholder="Enter your postal code"
                error={errors.postalCode}
                labelClassName="text-xs"
              />
            </div>
            <div className="w-full md:w-1/2">
              <InputField
                label="Street"
                name="street"
                type="text"
                value={formDataState.street}
                onChange={handleChange}
                placeholder="Enter your street"
                error={errors.street}
                labelClassName="text-xs"
              />
            </div>
          </div>
        </div>

        {/*Save changes button */}
        {/* <div className="flex justify-center md:justify-end pt-4 space-y-4"> */}
        {/* {isLoading && <Loader />} */}
        {/* <SaveProfileInfoBtn */}
        {/* label="Save Changes" */}
        {/* // label={isLoading ? "Saving..." : "Save Changes"} */}
        {/* onClick={handleSaveChanges} */}
        {/* /> */}
        {/* {isLoading && <Loader />} */}
        {/* </div> */}

        {/*Save changes button */}
        <div className="flex justify-center md:justify-end pt-4 space-y-4">
          {isLoading && (
            <div className="mb-2 mx-4">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#CC1D1D] border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}
          <SaveProfileInfoBtn
            label={isLoading ? "Loading..." : "Save Changes"}
            onClick={handleSaveChanges}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
