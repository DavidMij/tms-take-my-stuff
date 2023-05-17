import React, { useState } from "react";
import "./Signup.scss";
import http from "../axios/index.js";
import { useNavigate } from "react-router-dom";
import Body from "../layout/Body.jsx";

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <Body title="Great! We Will Need Some Information">
      <div className="sign_up">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const user = await http.post("/v1/user", {
              firstName,
              lastName,
              email,
              phone,
              pass,
            });
            if (user.data.id) {
              props.setUser(user.data);
              navigate("/");
            }
            console.log(user.data.id);
          }}
        >
          <div className="sign_up__item">
            <span>First Name: </span>
            <input
              type="text"
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>

          <div className="sign_up__item">
            <span>Last Name: </span>
            <input
              type="text"
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>

          <div className="sign_up__item">
            <span>Email:</span>
            <input
              type="email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="sign_up__item">
            <span>Phone:</span>
            <input
              type="tel"
              required
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <div className="sign_up__item">
            <span>Password:</span>
            <input
              type="password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="sign_up__submit">Sign Me Up!</button>
        </form>

        <img
          src="https://media.istockphoto.com/id/157696118/tr/foto%C4%9Fraf/american-flag-with-uncle-sam-pointing-at-you.jpg?s=612x612&w=is&k=20&c=EkdV1C70aDHQMmApFuFBXKKqaYNuu9sRyfhEhaf7Fgw="
          alt=""
        />
      </div>
    </Body>
  );
};

export default SignUp;
