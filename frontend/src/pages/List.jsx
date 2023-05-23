import React, {useRef, useState} from "react";
import Body from "../layout/Body.jsx";
import "./List.scss";
import http from "../axios/index.js";
import {useNavigate} from "react-router-dom";

const List = (props) => {
    const [storageName, setStorageName] = useState("");
    const [availableSpace, setAvailableSpace] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const inputFile = useRef(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    return (
        <Body title="Please Tell Us About Your Storage Place">
            <form
                className="list"
                onSubmit={async (e) => {
                    e.preventDefault();

                    try {

                        const formData = new FormData()
                        formData.append("name", storageName)
                        formData.append("description", description)
                        formData.append("category", category)
                        formData.append("address", address)
                        formData.append("availableSpace", availableSpace)
                        formData.append("price", price)
                        formData.append("startDate", fromDate)
                        formData.append("endDate", toDate)
                        formData.append("image", file)
                        formData.append("userId", props.user.id)
                        const place = await http.post("/v1/storeplace",formData,
                            // {
                            //     "name": storageName,
                            //     "description": description,
                            //     "category": category,
                            //     "address": address,
                            //     "availableSpace": availableSpace,
                            //     "price": price,
                            //     "startDate": fromDate,
                            //     "endDate": toDate,
                            //     "image": readFileSync(file)
                            // },
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                        alert("Thank you for submitting Store place")
                        navigate("/")

                    } catch (e) {
                        alert(`Could Not Connect: ${e}`)
                    }


                }}
            >
                <div className="list__section">
                    <div className="list__item">
                        <span>Storage Name:</span>
                        <input
                            type="text"
                            onChange={(e) => setStorageName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="list__item">
                        <span>Available Space:</span>
                        <input
                            type="number"
                            onChange={(e) => setAvailableSpace(e.target.value)}
                            required
                        />
                    </div>

                    <div className="list__item">
                        <span>Address:</span>
                        <input
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="list__item">
                        <span>Price:</span>
                        <input
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="list__item">
                        <span>Category:</span>
                        <input
                            type="text"
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="list__section">
                    <div className="list__item">
                        <span>Description:</span>
                        <textarea onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    <div className="list__item">
                        <span>From Date:</span>
                        <input
                            type="date"
                            onChange={(e) => setFromDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="list__item">
                        <span>To Date:</span>
                        <input
                            type="date"
                            onChange={(e) => setToDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="list__item">
                        <span>Add Photo:</span>
                        <input
                            type="file"
                            ref={inputFile}
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{display: "none"}}
                        />
                        <span style={{color: "white"}}>{file?.name}</span>
                        <span
                            className="list__item__plus"
                            onClick={() => inputFile.current.click()}
                        >
              +
            </span>
                    </div>

                    <button className="list__submit">List it!</button>
                </div>
            </form>
        </Body>
    );
};

export default List;
