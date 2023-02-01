import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
    const navigate = useNavigate();
    const [usersArr, setUsersArr] = useState([]);

    useEffect(() => {
        let url = "http://localhost:8000/user-form";
        const getData = async () => {
            const response = await axios.get(url);
            // console.log(response.data);
            setUsersArr(response.data);
        };
        getData();
    }, []);

    return (
        <div className="userDetails">
            <div className="navbar">
                <button
                    onClick={() => {
                        navigate("/userForm");
                    }}
                >
                    Add User Details
                </button>
            </div>
            <div className="users">
                {!usersArr.length
                    ?
                    <div>"NO USERS ADDED YET"</div>
                    : usersArr.map((user) => {
                        return (
                            <div key={user._id}>
                                <p>Name: {user.name}</p>
                                <p>Date of Birth: {user.dateOfBirth}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone Number: {user.phoneNumber}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default UserDetails