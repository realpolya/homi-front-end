/* --------------------------------Imports--------------------------------*/

import { useState } from 'react';

import { signUp } from "../services/index.js";

/* --------------------------------Variables--------------------------------*/

const initial = {
    username: '',
    email: '',
    password: '',
}

/* --------------------------------Component--------------------------------*/

const SignUp = ({ onSubmit }) => {

    const [formData, setFormData] = useState(initial);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await signUp(formData)
        onSubmit(userData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-textColor">Welcome To Homi.</h2>
                <h2>Register Here!</h2>
            </div>
            <div>
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                >
                    Username
                </label>
                <input
                    type="text"
                    id="username-1"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="mt-1 p-2 w-full border rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="mt-1 p-2 w-full border rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password-1"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="mt-1 p-2 w-full border rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                />
            </div>

            <button type="submit" className="form-button">
                Register
            </button>
        </form>
    );
};

/* --------------------------------Exports--------------------------------*/

export default SignUp
