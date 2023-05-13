import React from "react";
import "./Signup.css";

const SignUp = () => {
  return (
    <section className="container mx-auto">
      <h3 className="text-center text-[1.5rem] mb-16">
        Great! We Will Need Some Information:
      </h3>
      <div className="grid grid-cols-2 gap-20">
        <div className="flex items-center">
          <form className="w-[300px] flex flex-col gap-5">
            <div className="flex justify-between">
              <label>Full Name:</label>
              <input
                className="inputFiled"
                type="text"
                name="fullName"
                required
              />
            </div>
            <div className="flex justify-between">
              <label>Id Number:</label>
              <input
                className="inputFiled"
                type="number"
                name="idNumber"
                required
              />
            </div>
            <div className="flex justify-between">
              <label>Email:</label>
              <input
                className="inputFiled"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="flex justify-between">
              <label>Phone:</label>
              <input className="inputFiled" type="tel" name="phone" required />
            </div>
            <div className="flex justify-between">
              <label>Password:</label>
              <input
                className="inputFiled"
                type="password"
                name="password"
                required
              />
            </div>
            <div className="text-white text-end mr-10">
              <button className="border-2 px-2">Sign Me Up!</button>
            </div>
          </form>
        </div>
        <div className="image-reflection h-[350px]">
          <img
            className="rounded-[20px] h-full"
            src="https://media.istockphoto.com/id/157696118/tr/foto%C4%9Fraf/american-flag-with-uncle-sam-pointing-at-you.jpg?s=612x612&w=is&k=20&c=EkdV1C70aDHQMmApFuFBXKKqaYNuu9sRyfhEhaf7Fgw="
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
