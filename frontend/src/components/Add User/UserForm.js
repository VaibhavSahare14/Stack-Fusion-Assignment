import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserForm.css"
import axios from "axios";
import validator from 'validator';

const UserForm = () => {

    const navigate = useNavigate();

    const initialFormValues = {
        name: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
    }

    const [formData, setFormData] = useState(initialFormValues);
    const [age, setAge] = useState(0);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        // SHOWING ERRORS
        if (showError) {
            setTimeout(() => {
                setShowError(false);
            }, 2000);
        }

        // AGE CALCULATION
        const birthYear = new Date(formData.dateOfBirth).getFullYear();
        const currentYear = new Date().getFullYear();
        setAge(currentYear - birthYear);
    }, [age, formData, showError]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // VALIDATING FORM DATA
    const checkError = (userData) => {
        if (!userData.name) {
            return "Please enter your Name";
        } else if (userData.name.length < 3) {
            return "Name should be at least 3 characters";
        } else if (!validator.isDate(userData.dateOfBirth)) {
            return "Please enter or Select Date of Birth";
        } else if (age < 18) {
            return "Age cannot be less than 18 Years"
        } else if (!validator.isEmail(userData.email)) {
            return "Please enter your valid Email";
        } else {
            return null;
        }
    };

    // POSTING USER DETAILS
    const addUser = async (userData) => {
        let url = "https://stack-fusion-backend.onrender.com/user-form";
        try {
            const userDetails = await axios.post(`${url}`, userData);
            console.log(userDetails);
            navigate("/userDetails");
        } catch (error) {
            // console.log(error.response.data.message);
            if (error.response.data.message === "Email is already exists") {
                setError("Email is already exists");
            } else if (error.response.data.message === "Invalid phone number format") {
                setError("Invalid phone number format");
            } else if (error.response.data.message === "Phone Number is already exists") {
                setError("Phone Number is already exists");
            }
            setShowError(true);
        }
    };

    // SUBMIT BUTTON
    const handleSubmit = (e) => {
        e.preventDefault();
        const err = checkError(formData);
        if (err) {
            // console.log(err);
            setError(err);
            setShowError(true);
        } else {
            // console.log(formData);
            addUser(formData);
        }
    };

    // RESET BUTTON FUNCTION
    const handleReset = () => {
        setFormData({
            name: "",
            dateOfBirth: "",
            email: "",
            phoneNumber: "",
        });
    };

    return (
        <div className="formContainer">
            <form className="form">
                <input
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    type="text"
                />
                <input
                    value={formData.dateOfBirth}
                    name="dateOfBirth"
                    onChange={handleChange}
                    type="date"
                />
                <input
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    type="Email"
                />
                <input
                    value={formData.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number"
                    type="phone"
                />
            </form>
            <div className="buttons">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleReset}>Reset</button>
            </div>

            {showError && error !== null ?
                (<div class="error">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    {" "} {error}
                </div>
                ) : ""}
        </div>
    );
}

export default UserForm