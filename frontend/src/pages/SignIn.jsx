import React, {useState} from "react";
import http from "../axios/index.js";
import {useNavigate} from "react-router-dom";

const SignIn = (props) => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()

    return (
        <section className="container mx-auto">
            <h3 className="text-center text-[1.5rem] mb-16">
                Good To Have You Back!
            </h3>
            <div className="flex justify-center">
                <form className="w-[300px] flex flex-col gap-5" onSubmit={async (e) => {
                    e.preventDefault()
                    console.log({"email": email, "pass": pass})
                    const user = await http.post("/v1/user/login", {
                        email,
                        pass
                    })
                    console.log(user)
                    if (user.data.id) {
                        props.setUser(user.data)
                        navigate("/")
                    }
                    console.log(user.data)
                }}>
                    <div className="flex justify-between">
                        <label>Email:</label>
                        <input
                            className="inputFiled"
                            type="email"
                            name="email"
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <label>Password:</label>
                        <input
                            className="inputFiled"
                            type="password"
                            name="pass"
                            required
                            onChange={(event) => setPass(event.target.value)}
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
