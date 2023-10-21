"use client";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    specialization: "",
    certificateNum: "",
    mode: "ONLINE",
    password: "",
    cnfrmpass: "",
  });
  const [completedSignup, setCompletedSignup] = useState(false);
  const [otp, setOTP] = useState("");
  const [apiotp, setapiOTP] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const checkPasswordMatch = () => {
    if (input.password !== input.cnfrmpass) {
      alert("Password and Confirm Password do not match.");
    }
  };

  const requestotp = () => {
    axios
      .get(
        "http://localhost:8080/patient/reqOTP",
        { params: { to: input.email } },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setapiOTP(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOTPChange = (e) => {
    const inputOTP = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOTP(inputOTP);
  };

  const verifyotp = () => {
    if (otp == apiotp) {
      setVerificationStatus(true);
      axios
        .post("http://localhost:8080/docotor/register", input)
        .then((response) => {
          console.log("Data send to Server");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setVerificationStatus(false);
    }
  };
  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    setInput({ ...input, mode: selectedMode });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (input.password !== input.cnfrmpass) {
      alert("Password and Confirm Password do not match.");
    } else {
      if (
        input.name &&
        input.email &&
        input.phoneNo &&
        input.address &&
        input.city &&
        input.specialization &&
        input.certificateNum &&
        input.password &&
        input.mode &&
        input.cnfrmpass
      ) {
        requestotp();
        setCompletedSignup(true); // Mark the signup as completed
      } else {
        alert("Please fill in all the required fields before proceeding.");
      }
    }
  };
  return (
    <div>
      <h1 className="text-center text-xl font-bold my-5">Dcotor Signup FORM</h1>
      <center>
        {completedSignup ? (
          <div className="flex items-center justify-center h-auto w-1/4 lg:w-1/4 sm:w-1/4">
            <form action="">
              <input
                type="tel"
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                onChange={handleOTPChange}
                className="my-5 py-3 px-5 rounded-md border-2 border-black"
                required
              />
              <br />
              <button
                type="submit"
                className="border-2 border-white rounded-xl px-4 py-2 bg-blue-400 text-white font-mono font-bold text-lg hover-bg-blue-600"
                onClick={verifyotp}
              >
                Verify OTP
              </button>
            </form>
            {verificationError ? (
              <h4 className="text-red-500 ">{verificationError}</h4>
            ) : verificationStatus === true ? (
              <h4 className="text-green-500 ">
                OTP verified. You can proceed.
              </h4>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center justify-center h-auto w-1/4 border-2 border-black px-20 rounded-xl lg:w-1/4 sm:w-1/4">
            <form
              action=""
              onSubmit={handleSubmit}
              className="text-center flex-column items-center gap-5 mt-5"
            >
              <input
                type="text"
                placeholder="UserName"
                name="name"
                value={input.name}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="number"
                placeholder="Phone Number"
                name="phoneNo"
                value={input.phoneNo}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={input.address}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={input.city}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="text"
                placeholder="Specialization"
                name="specialization"
                value={input.specialization}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="number"
                placeholder="CertificateNum"
                name="certificateNum"
                value={input.certificateNum}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <div className="flex gap-1 font-bold">
                Mode of Appoitment
                <br />
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="online"
                    checked={input.mode === "online"}
                    onChange={handleModeChange}
                  />{" "}
                  Online
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="offline"
                    checked={input.mode === "offline"}
                    onChange={handleModeChange}
                  />{" "}
                  Offline
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value="both"
                    checked={input.mode === "both"}
                    onChange={handleModeChange}
                  />{" "}
                  Both
                </label>
              </div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={input.password}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="cnfrmpass"
                value={input.cnfrmpass}
                onBlur={checkPasswordMatch}
                onChange={onInputChange}
                className="my-5 p-2 rounded-md border-2 border-black mb-8"
                required
              />
              <button
                className="mb-8 font-semibold text-lg border-2 border-zinc-300 rounded-lg px-10 p-2 hover:bg-green-300 hover:text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </form>
          </div>
        )}
      </center>
    </div>
  );
};

export default Signup;