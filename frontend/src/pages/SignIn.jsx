import React from "react";

const SignIn = () => {
  return (
    <section className="container mx-auto">
      <h3 className="text-center text-[1.5rem] mb-16">
        Good To Have You Back!
      </h3>
      <div className="flex justify-center">
        <form className="w-[300px] flex flex-col gap-5">
          <div className="flex justify-between">
            <label>Email:</label>
            <input className="inputFiled" type="email" name="email" required />
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
          <div className="text-white text-center">
            <button className="border-2 px-2">Sign Me In!</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
