import React from "react";
import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const buttons = [
    {
      name: "Find Storage",
      link: "/search",
    },
  ];
  if (!props.user) {
    buttons.push(
      {
        name: "Sign In",
        link: "/signin",
      },
      {
        name: "Sign Up",
        link: "/signup",
      }
    );
  } else {
    buttons.push(
      {
        name: "List Storage",
        link: "/list",
      },
      {
        name: "Sign Out",
        onClick: () => props.setUser(null),
      },
      {
        name: `Hello, ${props.user.firstName} ${props.user.lastName}`,
      }
    );
  }
  return (
    <div className="header">
      <div className="header__logo" onClick={() => navigate("/")}>
        <div data-text="TMS" className="header__logo__main">
          TMS
        </div>
        <p className="header__logo__footer">Take My Stuff</p>
      </div>
      <div className="header__menu">
        {buttons.map((button) => {
          const isBtn = button.link || button.onClick;
          const isActive = isBtn && button.link === location.pathname;
          return (
            <div
              key={button.name}
              className="header__menu__option"
              onClick={() => {
                button.onClick && button.onClick();
                button.link && navigate(button.link);
              }}
              style={{
                color: isActive ? "#4364ad" : "white",
                cursor: isBtn ? "pointer" : "default",
                border: isBtn ? ".3vmin solid" : "0",
              }}
            >
              {button.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
