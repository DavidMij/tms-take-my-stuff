import React, {useState} from "react";
import http from "../axios/index.js";
import {useNavigate} from "react-router-dom";
import Body from "../layout/Body.jsx";
import "./Signin.scss";

const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    return (
        <Body title="Good To Have You Back!">
            <form
                className="sign_in"
                onSubmit={async (e) => {
                    e.preventDefault();

                    try {
                        const user = await http.post("/v1/user/login", {
                            email,
                            pass
                        })
                        console.log(user)
                        props.setUser(user.data)
                        navigate("/")

                    } catch (e) {
                        alert(`Could Not Connect: ${e}`)
                    }

                }}
            >
                <div className="sign_in__item">
                    <span>Email:</span>
                    <input
                        type="email"
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="sign_in__item">
                    <span>Password:</span>
                    <input
                        type="password"
                        required
                        onChange={(event) => setPass(event.target.value)}
                    />
                </div>
                <button className="sign_in__submit">Sign Me In!</button>
            </form>
        </Body>
    );
};

export default SignIn;
