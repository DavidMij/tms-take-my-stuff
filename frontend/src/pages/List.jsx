import React from "react";

const List = () => {
  return (
    <section className="container mx-auto">
      <h3 className="text-center text-[1.5rem] mb-16">
        Please Tell Us About Your Storage Place:
      </h3>
      <form className="grid grid-cols-2 gap-20">
        <div className="flex items-center">
          <div className="w-[350px] flex flex-col gap-5">
            <div className="flex justify-between">
              <label>Storage Name:</label>
              <input
                className="inputFiled"
                type="text"
                name="fullName"
                required
              />
            </div>
            <div className="flex justify-between">
              <label>Available Space:</label>
              <input
                className="inputFiled"
                type="number"
                name="idNumber"
                required
              />
            </div>
            <div className="flex justify-between">
              <label>Address:</label>
              <input
                className="inputFiled"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="flex justify-between">
              <label>Price:</label>
              <input className="inputFiled" type="tel" name="phone" required />
            </div>
            <div className="flex justify-between">
              <label>Category:</label>
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
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-10">
            <label>Description:</label>
            <textarea className="inputFiled w-1/2" />
          </div>
          <div className="flex items-center gap-5">
            <p>Dates: </p>
            <div className="flex gap-3 items-center">
              <label>From:</label>
              <input
                className="inputFiled"
                type="password"
                name="password"
                required
              />
            </div>
            <div className="flex gap-3 items-center">
              <label>To:</label>
              <input
                className="inputFiled"
                type="password"
                name="password"
                required
              />
            </div>
          </div>
          <div className="flex gap-10">
            <label>Add Photo:</label>
            <span
              style={{ lineHeight: "16px" }}
              className="cursor-pointer rounded-[5px] bg-[#2e2e2e] border text-[20px] text-white  px-2"
            >
              +
            </span>
          </div>
          <div className="text-white text-center">
            <button className="border-2 px-8">List it!</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default List;
