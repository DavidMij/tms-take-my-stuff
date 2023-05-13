import React from "react";
import "./Header.css";
import {Link, NavLink} from "react-router-dom";

const buttons = [
  {
    name: "Find Storage",
    link: "/search",
  },
  {
    name: "Sign In",
    link: "/signin",
  },
  {
    name: "List Storage",
    link: "/list",
  },
  {
    name: "Sign Up",
    link: "/signup",
  },
];

const Header = () => {
  const activeClassName = "border-2 border-[#4364ad] text-[#4364ad]";
  return (
    <section className="flex justify-around my-16">
      <Link to="/">
        <div className="flex flex-col items-center">
          <div data-text="TMS" className="logo">
            TMS
          </div>
          <p className="logo-footer m-0 p-0">Take My Stuff</p>
        </div>
      </Link>
      <div className="text-white grid grid-cols-2 gap-4">
        {buttons.map((button, idx) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? activeClassName
                : "border-2 hover:border-[#4364ad] hover:text-[#4364ad]"
            }
            to={`${button?.link}`}
          >
            <div key={idx} className="text-center p-4">
              <button>{button.name}</button>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Header;
