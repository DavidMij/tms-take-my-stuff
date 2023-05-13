import React from "react";

const Search = () => {
  return (
    <section className="container mx-auto">
      <h3 className="text-center text-[1.5rem] mb-16">
        How Can we Focus Your Search?
      </h3>

      <div className="container">
        <form className=" grid grid-cols-3 gap-x-24 gap-y-5">
          <div className="flex justify-between">
            <label>By Location:</label>
            <input
              className="inputFiled"
              type="text"
              name="location"
              required
            />
          </div>
          <div className="flex justify-between">
            <label>By Category:</label>
            <input
              className="inputFiled"
              type="text"
              name="category"
              required
            />
          </div>
          <div className="flex justify-between">
            <label>By Dates: From:</label>
            <input
              className="inputFiled"
              type="text"
              name="fromDate"
              required
            />
          </div>
          <div className="flex justify-between">
            <label>By Price:</label>
            <input className="inputFiled" type="text" name="price" required />
          </div>
          <div className="flex justify-between">
            <label>By Space:</label>
            <input className="inputFiled" type="text" name="space" required />
          </div>
          <div className="flex justify-between">
            <label>To:</label>
            <input className="inputFiled" type="text" name="dateTo" required />
          </div>
          <div className="text-white text-center col-start-2">
            <button className="border-2 px-2">Lets Go Searching!</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;
