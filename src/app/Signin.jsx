/* --------------------------------Imports--------------------------------*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../services/index.js";

/* --------------------------------Variables--------------------------------*/

const initial = {
    username: "",
    password: "",
}

/* --------------------------------Component--------------------------------*/

const SignIn = ({ onSubmit, setActiveModal }) => {

    const  navigate = useNavigate();
    const [formData, setFormData] = useState(initial);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await signIn(formData)
        onSubmit(userData);
        navigate("/dashboard/guest")
        window.location.reload()
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">

                <h2 className="text-2xl font-bold text-textColor text-center mb-4">Log In</h2>

                <div className="flex flex-col">
                    <label htmlFor="username" className="text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                        required
                    />
                </div>

                <button type="submit" className="flex justify-center form-button">
                    Log In
                </button>

            </form>
            <p>
                Don't have an account?{" "}
                <button onClick={() => setActiveModal("register")} className="text-buttonColor hover:underline">
                    Register
                </button>
            </p>
        </>
    );
};

/* --------------------------------Exports--------------------------------*/

export default SignIn
