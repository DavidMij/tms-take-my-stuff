import React from "react";
import "./Signup.css";
import http from "../axios/index.js";
import {useNavigate} from "react-router-dom";

const SignUp = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [pass, setPassword] = useState("")
    const navigate = useNavigate()

    return (
        <section className="container mx-auto">
            <h3 className="text-center text-[1.5rem] mb-16">
                Great! We Will Need Some Information:
            </h3>
            <div className="grid grid-cols-2 gap-20">
                <div className="flex items-center">
                    <form className="w-[300px] flex flex-col gap-5" onSubmit={async (e) => {
                        e.preventDefault()
                        const user = await http.post("/v1/user", {
                            firstName,
                            lastName,
                            email,
                            phone,
                            pass
                        })
                        if (user.data.id) {
                            props.setUser(user.data)
                            navigate("/")
                        }
                        console.log(user.data.id)
                    }}>
                        <div className="flex justify-between">
                            <label>First Name: </label>
                            <input
                                className="inputFiled"
                                type="text"
                                name="firstName"
                                required
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className="flex justify-between">
                            <label>Last Name: </label>
                            <input
                                className="inputFiled"
                                type="text"
                                name="lastName"
                                required
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
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
                            <label>Phone:</label>
                            <input
                                className="inputFiled"
                                type="tel"
                                name="phone"
                                required
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="flex justify-between">
                            <label>Password:</label>
                            <input
                                className="inputFiled"
                                type="password"
                                name="pass"
                                required
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="text-white text-end mr-10">
                            <button className="border-2 px-2">Sign Me Up!
                            </button>
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
